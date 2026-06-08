import * as crypto from "node:crypto";
import {Temporal} from "@js-temporal/polyfill";
import Instant = Temporal.Instant;
import {UserId} from "../types/User.js";
import {RefreshToken, Session, SessionId} from "../types/JWT.js";

export class AuthRepository {
    private sessions: (Session & {
        refreshTokensSHA256: Set<string>,
    })[] = []

    async createSession(params: {
        sessionId: SessionId
        userId: UserId
        currentRefreshToken: RefreshToken
        createdAt: Instant
    }): Promise<CreateSessionResult> {
        const session: Session = {
            id: params.sessionId,
            userId: params.userId,
            createdAt: params.createdAt,
        }

        if (this.sessions.some(it => it.id === params.sessionId))
            throw new Error(`Duplicate session id ${params.sessionId}`)

        const currentRefreshTokenSHA256 = crypto.hash('sha256', params.currentRefreshToken, 'hex')
        this.sessions.push({...session, refreshTokensSHA256: new Set([currentRefreshTokenSHA256])})

        return {type: 'Success', session}

        // insert ...
        // throw new Error('Not yet implemented')
    }

    async isRefreshTokenValidForSession(sessionId: SessionId, refreshToken: RefreshToken): Promise<boolean> {
        const refreshTokenSHA256 = crypto.hash('sha256', refreshToken, 'hex')

        const session = this.sessions.find(it => it.id === sessionId)
        if (!session)
            return false

        return session.refreshTokensSHA256.has(refreshTokenSHA256)

        // (select ...) === refreshTokenSHA256
        // throw new Error('Not yet implemented')
    }

    async refreshTokens(sessionId: SessionId, oldRefreshToken: RefreshToken, newRefreshToken: RefreshToken): Promise<RefreshTokensResult> {
        const oldRefreshTokenSHA256 = crypto.hash('sha256', oldRefreshToken, 'hex')
        const newRefreshTokenSHA256 = crypto.hash('sha256', newRefreshToken, 'hex')

        const session = this.sessions.find(it => it.id === sessionId)
        if (!session)
            return {type: 'InvalidSessionId'}

        // todo реализовать в sql
        // const hasOld = session.refreshTokensSHA256.has(oldRefreshTokenSHA256)
        // if (!hasOld)
        //     return {type: 'CompromisedRefreshToken'}

        session.refreshTokensSHA256.delete(oldRefreshTokenSHA256)
        session.refreshTokensSHA256.add(newRefreshTokenSHA256)
        return {type: 'Success'}

        // update set current_refresh_token = currentRefreshTokenSHA256 where ...
        // throw new Error('Not yet implemented')
    }

    async revokeSession(sessionId: SessionId): Promise<RevokeSessionResult> {
        const index = this.sessions.findIndex(it => it.id === sessionId)
        if (index === -1)
            return {type: 'InvalidSessionId'}
        this.sessions.splice(index, 1)
        return {type: 'Success'}

        // delete ... where id = ...
        // throw new Error('Not yet implemented')
    }

    async revokeAllSessionsForUser(userId: UserId) {
        // delete ... where user_id = ...
        throw new Error('Not yet implemented')
    }
}

export type CreateSessionResult =
    | { type: 'Success', session: Session }
    | { type: 'InvalidUserId' }

export type RefreshTokensResult =
    | { type: 'Success' }
    | { type: 'InvalidSessionId' }
    | { type: 'CompromisedRefreshToken' }

export type RevokeSessionResult =
    | { type: 'Success' }
    | { type: 'InvalidSessionId' }
