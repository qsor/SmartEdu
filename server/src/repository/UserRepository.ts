import * as crypto from "node:crypto";
import { PrismaClient } from "@prisma/client";
import { InternalUser, toMyselfUser, UserId } from "../schema/types/User.js";
import { CreateUserResult } from "../schema/results/auth.js";
import { EditUserResponse } from "../schema/responses/user.js";

const prisma = new PrismaClient();

export class UserRepository {
  async createUser(params: {
    firstName: string
    lastName: string | null
    passwordHash: string
    email: string | null
    phoneNumber: string | null
  }): Promise<CreateUserResult> {
    try {
      const user = await prisma.user.create({
        data: {
          id: crypto.randomUUID(),
          firstName: params.firstName,
          lastName: params.lastName,
          passwordHash: params.passwordHash,
          email: params.email,
          phoneNumber: params.phoneNumber,
        },
      });
      return { status: 'Success', user: user as InternalUser };
    } catch (error: any) {
      if (error.code === 'P2002') {
        if (error.meta?.target?.includes('email')) {
          return { status: 'Conflict', conflictOn: 'Email' };
        }
        if (error.meta?.target?.includes('phoneNumber')) {
          return { status: 'Conflict', conflictOn: 'PhoneNumber' };
        }
      }
      throw error;
    }
  }

  async exists(id: UserId): Promise<boolean> {
    return (await prisma.user.count({ where: { id } })) > 0;
  }

  async existsByEmail(email: string): Promise<boolean> {
    return (await prisma.user.count({ where: { email } })) > 0;
  }

  async existsByPhoneNumber(phoneNumber: string): Promise<boolean> {
    return (await prisma.user.count({ where: { phoneNumber } })) > 0;
  }

  async getUser(id: UserId): Promise<InternalUser | null> {
    return (await prisma.user.findUnique({ where: { id } })) as InternalUser | null;
  }

  async getUserByEmail(email: string): Promise<InternalUser | null> {
    return (await prisma.user.findUnique({ where: { email } })) as InternalUser | null;
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<InternalUser | null> {
    return (await prisma.user.findUnique({ where: { phoneNumber } })) as InternalUser | null;
  }

  async editUser(id: UserId, fields: {
    firstName?: string; lastName?: string | null; email?: string | null
  }): Promise<EditUserResponse> {
    if (fields.email) {
      const existingUser = await prisma.user.findFirst({
        where: { email: fields.email, id: { not: id } },
      });
      if (existingUser) return { status: 'EmailAlreadyTaken' };
    }

    try {
      const user = await prisma.user.update({ where: { id }, data: fields });
      return { status: 'Success', myself: toMyselfUser(user as InternalUser) };
    } catch (error) {
      throw new Error('User not found');
    }
  }

  async deleteUser(id: UserId): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}