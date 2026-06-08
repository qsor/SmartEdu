import {UserId} from "./User.js";
import {Temporal} from "@js-temporal/polyfill";
import Instant = Temporal.Instant;

// ------ Actor ------

export type Actor = UserActor | GuestActor

export interface UserActor {
    isGuest: false
    isAuthenticated: true
    sessionId: SessionId
    userId: UserId
}

export interface GuestActor {
    isGuest: true
    isAuthenticated: false
    sessionId?: undefined
    userId?: undefined
}

// ------ Sessions ------

// UUID в нашем случае
export type SessionId = string

export interface Session {
    id: SessionId
    userId: UserId
    createdAt: Instant
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
