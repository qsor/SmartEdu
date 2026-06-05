import {UserId} from "./users.js";
import {Temporal} from "@js-temporal/polyfill";
import Instant = Temporal.Instant;

export type Actor = UserActor | GuestActor | SystemActor

export interface UserActor {
    type: 'User'
    sessionId: SessionId
    userId: UserId
}

export interface GuestActor {
    type: 'Guest'
    sessionId: undefined
    userId: undefined
}

export interface SystemActor {
    type: 'System'
    name: string
    sessionId: undefined
    userId: undefined
}

// ------ Sessions ------

// UUID в нашем случае
export type SessionId = string

export interface Session {
    id: SessionId
    userId: UserId
    createdAt: Instant
    // Информация о сессии
    // Например: iPhone Safari
    // clientInfo: string
    // Когда эта сессия сделала последний refresh JWT-токена (Эту дату можно отражать как дату последней активности)
    // updatedAt: Instant
}

// ------ JWT Tokens ------

export type RefreshToken = string
export type AccessToken = string
// UUID в нашем случае
export type RefreshTokenId = string

export interface TokenPair {
    accessToken: AccessToken
    refreshToken: RefreshToken
}

export interface AccessTokenPayload {
    sessionId: SessionId
    userId: UserId
}

export interface RefreshTokenPayload {
    id: RefreshTokenId
    sessionId: SessionId
    userId: UserId
}
