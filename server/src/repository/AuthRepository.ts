import * as crypto from "node:crypto";
import {Temporal} from "@js-temporal/polyfill";
import {eq} from "drizzle-orm";
import type {NodePgDatabase} from "drizzle-orm/node-postgres";
import {sessions} from "../db/schema.js";
import type * as schema from "../db/schema.js";
import {UserId} from "../schema/types/User.js";
import {RefreshToken, Session, SessionId, TokenPair} from "../schema/types/JWT.js";
import {RefreshTokensResult} from "../schema/results/auth.js";
import Instant = Temporal.Instant;

export class AuthRepository {
    constructor(
        private readonly db: NodePgDatabase,
    ) {}

    async createSession(params: {
        sessionId: SessionId
        userId: UserId
        currentRefreshToken: RefreshToken
        createdAt: Instant
    }): Promise<Session> {
        const session: Session = {
            id: params.sessionId,
            userId: params.userId,
            createdAt: params.createdAt,
        }

        const [existingSession] = await this.db
            .select({id: sessions.id})
            .from(sessions)
            .where(eq(sessions.id, params.sessionId))
            .limit(1)

        if (existingSession)
            throw new Error(`Duplicate session id ${params.sessionId}`)

        const currentRefreshTokenSHA256 = crypto.hash('sha256', params.currentRefreshToken, 'hex')
        await this.db.insert(sessions).values({
            id: params.sessionId,
            user_id: params.userId,
            current_refresh_token: currentRefreshTokenSHA256,
            created_at: new Date(params.createdAt.epochMilliseconds),
        })

        return session
    }

    async isRefreshTokenValidForSession(sessionId: SessionId, refreshToken: RefreshToken): Promise<boolean> {
        const refreshTokenSHA256 = crypto.hash('sha256', refreshToken, 'hex')

        const [session] = await this.db
            .select({currentRefreshToken: sessions.current_refresh_token})
            .from(sessions)
            .where(eq(sessions.id, sessionId))
            .limit(1)

        if (!session)
            return false

        return session.currentRefreshToken === refreshTokenSHA256
    }

    async refreshTokens(sessionId: SessionId, oldRefreshToken: RefreshToken, newTokenPair: TokenPair): Promise<RefreshTokensResult> {
        const oldRefreshTokenSHA256 = crypto.hash('sha256', oldRefreshToken, 'hex')
        const newRefreshTokenSHA256 = crypto.hash('sha256', newTokenPair.refreshToken, 'hex')

        const [session] = await this.db
            .select({id: sessions.id})
            .from(sessions)
            .where(eq(sessions.id, sessionId))
            .limit(1)

        if (!session)
            return {status: 'Failed', reason: 'Expired'}

        // todo реализовать в sql
        // const hasOld = session.currentRefreshToken === oldRefreshTokenSHA256
        // if (!hasOld)
        //     return {status: 'CompromisedRefreshToken'}

        await this.db
            .update(sessions)
            .set({current_refresh_token: newRefreshTokenSHA256})
            .where(eq(sessions.id, sessionId))

        return {status: 'Success', newTokenPair}
    }

    async revokeSession(sessionId: SessionId): Promise<void> {
        await this.db.delete(sessions).where(eq(sessions.id, sessionId))
    }

    async revokeAllSessionsForUser(userId: UserId): Promise<void> {
        await this.db.delete(sessions).where(eq(sessions.user_id, userId))
    }
}
