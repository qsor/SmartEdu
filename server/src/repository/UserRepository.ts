import * as crypto from "node:crypto";
import {eq} from "drizzle-orm";
import type {NodePgDatabase} from "drizzle-orm/node-postgres";
import {UserRow, users} from "../db/schema.js";
import type * as schema from "../db/schema.js";
import {InternalUser, toMyselfUser, UserId} from "../schema/types/User.js";
import {CreateUserResult} from "../schema/results/auth.js";
import {EditUserResponse} from "../schema/responses/user.js";

export class UserRepository {
    constructor(
        private readonly db: NodePgDatabase,
    ) {}

    async createUser(params: {
        firstName: string
        lastName: string | null
        passwordHash: string
        email: string | null
        phoneNumber: string | null
    }): Promise<CreateUserResult> {
        if (params.email !== null && await this.existsByEmail(params.email))
            return {status: 'Conflict', conflictOn: 'Email'}
        if (params.phoneNumber !== null && await this.existsByPhoneNumber(params.phoneNumber))
            return {status: 'Conflict', conflictOn: 'PhoneNumber'}

        const user: InternalUser = {
            id: crypto.randomUUID(),
            firstName: params.firstName,
            lastName: params.lastName,
            passwordHash: params.passwordHash,
            email: params.email?.toLowerCase() ?? null,
            phoneNumber: params.phoneNumber,
        }

        await this.db.insert(users).values({
            id: user.id,
            first_name: user.firstName,
            last_name: user.lastName,
            password_hash: user.passwordHash,
            email: user.email,
            phone_number: user.phoneNumber,
        })

        return {status: 'Success', user: user}
    }

    async exists(id: UserId): Promise<boolean> {
        const [user] = await this.db
            .select()
            .from(users)
            .where(eq(users.id, id))
            .limit(1)

        return user !== undefined
    }

    async existsByEmail(email: string): Promise<boolean> {
        email = email.toLowerCase()
        const [user] = await this.db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1)

        return user !== undefined
    }

    async existsByPhoneNumber(phoneNumber: string): Promise<boolean> {
        const [user] = await this.db
            .select()
            .from(users)
            .where(eq(users.phone_number, phoneNumber))
            .limit(1)

        return user !== undefined
    }

    async getUser(id: UserId): Promise<InternalUser | null> {
        const [user] = await this.db
            .select()
            .from(users)
            .where(eq(users.id, id))
            .limit(1)

        return user ? toInternalUser(user) : null
    }

    async getUserByEmail(email: string): Promise<InternalUser | null> {
        email = email.toLowerCase()
        const [user] = await this.db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1)

        return user ? toInternalUser(user) : null
    }

    async getUserByPhoneNumber(phoneNumber: string): Promise<InternalUser | null> {
        const [user] = await this.db
            .select()
            .from(users)
            .where(eq(users.phone_number, phoneNumber))
            .limit(1)

        return user ? toInternalUser(user) : null
    }

    async editUser(id: UserId, fields: {
        firstName?: string
        lastName?: string | null
        email?: string | null
    }): Promise<EditUserResponse> {
        if (fields.email) {
            fields.email = fields.email.toLowerCase()
            if (await this.existsByEmail(fields.email)) {
                return {status: 'EmailAlreadyTaken'}
            }
        }

        const updateFields: {
            first_name?: string
            last_name?: string | null
            email?: string | null
            updated_at: Date
        } = {
            updated_at: new Date(),
        }

        if (fields.firstName !== undefined)
            updateFields.first_name = fields.firstName
        if (fields.lastName !== undefined)
            updateFields.last_name = fields.lastName
        if (fields.email !== undefined)
            updateFields.email = fields.email

        const [newUser] = await this.db
            .update(users)
            .set(updateFields)
            .where(eq(users.id, id))
            .returning()

        if (!newUser)
            throw new Error('User not found')

        return {status: 'Success', myself: toMyselfUser(toInternalUser(newUser))}
    }

    async deleteUser(id: UserId): Promise<void> {
        await this.db.delete(users).where(eq(users.id, id))
    }
}

function toInternalUser(row: UserRow): InternalUser {
    return {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        passwordHash: row.password_hash,
        email: row.email,
        phoneNumber: row.phone_number,
    }
}
