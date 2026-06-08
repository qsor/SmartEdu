import {InternalUser, toMyselfUser, UserId} from "../schema/types/User.js";
import {DeleteUserResult, EditUserResult} from "../schema/results/users.js";
import {RegisterResult} from "../schema/results/auth.js";

export class UserRepository {
    private users: InternalUser[] = []

    async createUser(params: {
        firstName: string
        lastName: string | null
        passwordHash: string
        email: string | null
        phoneNumber: string | null
    }): Promise<RegisterResult> {
        if (params.email !== null && await this.existsByEmail(params.email))
            return { type: 'Conflict', conflictOn: 'Email' }
        if (params.phoneNumber !== null && await this.existsByPhoneNumber(params.phoneNumber))
            return { type: 'Conflict', conflictOn: 'PhoneNumber' }

        const user: InternalUser = {
            id: crypto.randomUUID(),
            firstName: params.firstName,
            lastName: params.lastName,
            passwordHash: params.passwordHash,
            email: params.email,
            phoneNumber: params.phoneNumber,
        }

        this.users.push(user)

        return { type: 'Success', myself: toMyselfUser(user) }

        // INSERT INTO users (first_name, last_name, password_hash, email) values (?, ?, ?, ?) RETURNING *
        // throw new Error('Not yet implemented')
    }

    async exists(id: UserId): Promise<boolean> {
        return this.users.some(it => it.id === id)

        // SELECT 1 FROM users WHERE id = ?
        // throw new Error('Not yet implemented')
    }

    async existsByEmail(email: string): Promise<boolean> {
        return this.users.some(it => it.email === email)

        // SELECT 1 FROM users WHERE email = ?
        // throw new Error('Not yet implemented')
    }

    async existsByPhoneNumber(phoneNumber: string): Promise<boolean> {
        return this.users.some(it => it.phoneNumber === phoneNumber)

        // SELECT 1 FROM users WHERE phone_number = ?
        // throw new Error('Not yet implemented')
    }

    async getUser(id: UserId): Promise<InternalUser | null> {
        return this.users.find(it => it.id === id) ?? null

        // SELECT FROM users WHERE id = ?
        // throw new Error('Not yet implemented')
    }

    async getUserByEmail(email: string): Promise<InternalUser | null> {
        return this.users.find(it => it.email === email) ?? null

        // SELECT FROM users WHERE email = ?
        // throw new Error('Not yet implemented')
    }

    async getUserByPhoneNumber(phoneNumber: string): Promise<InternalUser | null> {
        return this.users.find(it => it.phoneNumber === phoneNumber) ?? null

        // SELECT FROM users WHERE phone_number = ?
        // throw new Error('Not yet implemented')
    }

    async editUser(id: UserId, fields: {
        firstName?: string
        lastName?: string | null
        email?: string | null
    }): Promise<EditUserResult> {
        // UPDATE users SET ... = ... WHERE id = ?
        throw new Error('Not yet implemented')
    }

    async deleteUser(id: UserId): Promise<DeleteUserResult> {
        // DELETE FROM users WHERE id = ?
        throw new Error('Not yet implemented')
    }
}
