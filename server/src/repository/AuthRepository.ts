import * as crypto from 'node:crypto';
import { eq } from 'drizzle-orm';
import { Temporal } from '@js-temporal/polyfill';
import { db } from '../db/index.js';
import { sessions } from '../db/schema.js';
import { UserId } from '../schema/types/User.js';
import { RefreshToken, Session, SessionId, TokenPair } from '../schema/types/JWT.js';
import { RefreshTokensResult } from '../schema/results/auth.js';
import Instant = Temporal.Instant;

export class AuthRepository {
  async createSession(params: {
    sessionId: SessionId;
    userId: UserId;
    currentRefreshToken: RefreshToken;
    createdAt: Instant;
  }): Promise<Session> {
    const currentRefreshTokenSHA256 = crypto.hash('sha256', params.currentRefreshToken, 'hex');

    const [dbSession] = await db
      .insert(sessions)
      .values({
        id: params.sessionId,
        userId: params.userId,
        currentRefreshToken: currentRefreshTokenSHA256,
        createdAt: new Date(params.createdAt.epochMilliseconds),
      })
      .returning();

    return {
      id: dbSession.id,
      userId: dbSession.userId,
      createdAt: Instant.fromEpochMilliseconds(dbSession.createdAt.getTime()),
    };
  }

  async isRefreshTokenValidForSession(
    sessionId: SessionId,
    refreshToken: RefreshToken
  ): Promise<boolean> {
    const refreshTokenSHA256 = crypto.hash('sha256', refreshToken, 'hex');

    const [session] = await db.select().from(sessions).where(eq(sessions.id, sessionId));

    if (!session) return false;
    return session.currentRefreshToken === refreshTokenSHA256;
  }

  async refreshTokens(
    sessionId: SessionId,
    oldRefreshToken: RefreshToken,
    newTokenPair: TokenPair
  ): Promise<RefreshTokensResult> {
    const oldRefreshTokenSHA256 = crypto.hash('sha256', oldRefreshToken, 'hex');
    const newRefreshTokenSHA256 = crypto.hash('sha256', newTokenPair.refreshToken, 'hex');

    const [session] = await db.select().from(sessions).where(eq(sessions.id, sessionId));

    if (!session) {
      return { status: 'Failed', reason: 'Expired' };
    }

    // Проверка на компрометацию токена
    if (session.currentRefreshToken !== oldRefreshTokenSHA256) {
      return { status: 'CompromisedSession' };
    }

    await db
      .update(sessions)
      .set({ currentRefreshToken: newRefreshTokenSHA256 })
      .where(eq(sessions.id, sessionId));

    return { status: 'Success', newTokenPair };
  }

  async revokeSession(sessionId: SessionId): Promise<void> {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
  }

  async revokeAllSessionsForUser(userId: UserId): Promise<void> {
    await db.delete(sessions).where(eq(sessions.userId, userId));
  }
}