import { eq, sql } from 'drizzle-orm';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { InternalUser, toMyselfUser, UserId } from '../schema/types/User.js';
import { CreateUserResult } from '../schema/results/auth.js';
import { EditUserResponse } from '../schema/responses/user.js';

export class UserRepository {
  async createUser(params: {
    firstName: string;
    lastName: string | null;
    passwordHash: string;
    email: string | null;
    phoneNumber: string | null;
  }): Promise<CreateUserResult> {
    try {
      const [dbUser] = await db
        .insert(users)
        .values({
          id: crypto.randomUUID(),
          firstName: params.firstName,
          lastName: params.lastName,
          passwordHash: params.passwordHash,
          email: params.email,
          phoneNumber: params.phoneNumber,
        })
        .returning();

      const user: InternalUser = {
        id: dbUser.id,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        passwordHash: dbUser.passwordHash,
        email: dbUser.email,
        phoneNumber: dbUser.phoneNumber,
      };

      return { status: 'Success', user };
    } catch (error: any) {
      // Обработка ошибки уникальности (PostgreSQL error code 23505)
      if (error.code === '23505') {
        if (error.constraint?.includes('email')) {
          return { status: 'Conflict', conflictOn: 'Email' };
        }
        if (error.constraint?.includes('phone_number')) {
          return { status: 'Conflict', conflictOn: 'PhoneNumber' };
        }
      }
      throw error;
    }
  }

  async exists(id: UserId): Promise<boolean> {
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(eq(users.id, id));
    return Number(result.count) > 0;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(eq(users.email, email));
    return Number(result.count) > 0;
  }

  async existsByPhoneNumber(phoneNumber: string): Promise<boolean> {
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(eq(users.phoneNumber, phoneNumber));
    return Number(result.count) > 0;
  }

  async getUser(id: UserId): Promise<InternalUser | null> {
    const [dbUser] = await db.select().from(users).where(eq(users.id, id));
    if (!dbUser) return null;

    return {
      id: dbUser.id,
      firstName: dbUser.firstName,
      lastName: dbUser.lastName,
      passwordHash: dbUser.passwordHash,
      email: dbUser.email,
      phoneNumber: dbUser.phoneNumber,
    };
  }

  async getUserByEmail(email: string): Promise<InternalUser | null> {
    const [dbUser] = await db.select().from(users).where(eq(users.email, email));
    if (!dbUser) return null;

    return {
      id: dbUser.id,
      firstName: dbUser.firstName,
      lastName: dbUser.lastName,
      passwordHash: dbUser.passwordHash,
      email: dbUser.email,
      phoneNumber: dbUser.phoneNumber,
    };
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<InternalUser | null> {
    const [dbUser] = await db.select().from(users).where(eq(users.phoneNumber, phoneNumber));
    if (!dbUser) return null;

    return {
      id: dbUser.id,
      firstName: dbUser.firstName,
      lastName: dbUser.lastName,
      passwordHash: dbUser.passwordHash,
      email: dbUser.email,
      phoneNumber: dbUser.phoneNumber,
    };
  }

  async editUser(
    id: UserId,
    fields: {
      firstName?: string;
      lastName?: string | null;
      email?: string | null;
    }
  ): Promise<EditUserResponse> {
    if (fields.email) {
      if (await this.existsByEmail(fields.email)) {
        return { status: 'EmailAlreadyTaken' };
      }
    }

    try {
      const [dbUser] = await db
        .update(users)
        .set({ ...fields, updatedAt: new Date() })
        .where(eq(users.id, id))
        .returning();

      if (!dbUser) {
        throw new Error('User not found');
      }

      const user: InternalUser = {
        id: dbUser.id,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        passwordHash: dbUser.passwordHash,
        email: dbUser.email,
        phoneNumber: dbUser.phoneNumber,
      };

      return { status: 'Success', myself: toMyselfUser(user) };
    } catch (error: any) {
      throw error;
    }
  }

  async deleteUser(id: UserId): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }
}