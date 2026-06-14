import * as crypto from "node:crypto";
import { Temporal } from "@js-temporal/polyfill";
import { PrismaClient } from "@prisma/client";
import { UserId } from "../schema/types/User.js";
import { RefreshToken, Session, SessionId, TokenPair } from "../schema/types/JWT.js";
import { RefreshTokensResult } from "../schema/results/auth.js";

const prisma = new PrismaClient();

const hashToken = (token: string) => crypto.createHash('sha256').update(token).digest('hex');

export class AuthRepository {
  async createSession(params: {
    sessionId: SessionId; userId: UserId;
    currentRefreshToken: RefreshToken; createdAt: Temporal.Instant;
  }): Promise<Session> {
    const session = await prisma.session.create({
      data: {
        id: params.sessionId,
        userId: params.userId,
        currentRefreshToken: hashToken(params.currentRefreshToken),
        createdAt: new Date(params.createdAt.epochMilliseconds),
      },
    });

    return {
      id: session.id,
      userId: session.userId,
      createdAt: Temporal.Instant.fromEpochMilliseconds(session.createdAt.getTime()),
    };
  }

  async isRefreshTokenValidForSession(sessionId: SessionId, refreshToken: RefreshToken): Promise<boolean> {
    const session = await prisma.session.findUnique({ where: { id: sessionId } });
    return session ? session.currentRefreshToken === hashToken(refreshToken) : false;
  }

  async refreshTokens(sessionId: SessionId, oldRefreshToken: RefreshToken, newTokenPair: TokenPair): Promise<RefreshTokensResult> {
    const session = await prisma.session.findUnique({ where: { id: sessionId } });

    if (!session) return { status: 'Failed', reason: 'Expired' };
    if (session.currentRefreshToken !== hashToken(oldRefreshToken)) {
      return { status: 'CompromisedSession' };
    }

    await prisma.session.update({
      where: { id: sessionId },
      data: { currentRefreshToken: hashToken(newTokenPair.refreshToken) },
    });

    return { status: 'Success', newTokenPair };
  }

  async revokeSession(sessionId: SessionId): Promise<void> {
    await prisma.session.delete({ where: { id: sessionId } });
  }

  async revokeAllSessionsForUser(userId: UserId): Promise<void> {
    await prisma.session.deleteMany({ where: { userId } });
  }
}