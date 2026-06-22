import {JWTPayload} from "jose";
import {assertNever} from "../shared/index.js";
import * as crypto from "node:crypto";
import {Temporal} from "@js-temporal/polyfill";
import * as argon2 from "argon2";
import {UserId} from "../schema/types/User.js";
import {
    AccessToken,
    AccessTokenPayload,
    RefreshToken,
    RefreshTokenPayload,
    SessionId,
    TokenPair
} from "../schema/types/JWT.js";
import {
    CheckAccessTokenResult,
    CheckRefreshTokenResult,
    LoginResult,
    RefreshTokensResult,
    RegisterResult
} from "../schema/results/auth.js";
import {JwtService} from "./JwtService.js";
import {AuthRepository} from "../repository/AuthRepository.js";
import {UserRepository} from "../repository/UserRepository.js";
import DurationLike = Temporal.DurationLike;
import Duration = Temporal.Duration;
import Now = Temporal.Now;
import {emailRegex} from "../shared/index.js";

export class AuthService {
    private readonly accessJwtService: JwtService
    private readonly refreshJwtService: JwtService
    private readonly accessTokenLifetime: Duration
    private readonly refreshTokenLifetime: Duration

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly userRepository: UserRepository,
        config: {
            accessJwtService: JwtService,
            refreshJwtService: JwtService,
            accessTokenLifetime: DurationLike, // например: {minutes: 5}
            refreshTokenLifetime: DurationLike, // например: {days: 28}
        }
    ) {
        this.accessJwtService = config.accessJwtService
        this.refreshJwtService = config.refreshJwtService
        this.accessTokenLifetime = Duration.from(config.accessTokenLifetime)
        this.refreshTokenLifetime = Duration.from(config.refreshTokenLifetime)
    }

    async registerUsingEmail({firstName, lastName, email, password}: {
        firstName: string
        lastName: string | null
        email: string
        password: string
    }): Promise<RegisterResult> {
        // Проверка валидности Email

        if (!emailRegex.test(email))
            return {status: 'InvalidEmail'}

        // Создание пользователя

        const createUserResult = await this.userRepository.createUser({
            firstName: firstName,
            lastName: lastName,
            passwordHash: await argon2.hash(password),
            email: email,
            phoneNumber: null,
        })

        if (createUserResult.status === 'Success') {
            const user = createUserResult.user
            const sessionId = crypto.randomUUID()
            const tokenPair = await this.createTokenPair({ sessionId, userId: user.id})

            await this.authRepository.createSession({
                sessionId: sessionId,
                userId: user.id,
                currentRefreshToken: tokenPair.refreshToken,
                createdAt: Now.instant(),
            })

            return {status: 'Success', user: user, newTokenPair: tokenPair}
        }

        if (createUserResult.status === 'Conflict') {
            return {status: 'Conflict', conflictOn: 'Email'}
        }

        assertNever(createUserResult)
    }

    async loginUsingEmail(email: string, password: string): Promise<LoginResult> {
        const user = await this.userRepository.getUserByEmail(email)
        if (user === null) {
            return {status: 'EmailNotRegistered'}
        }

        const isPasswordValid = await argon2.verify(user.passwordHash, password)

        if (!isPasswordValid) {
            return {status: 'InvalidPassword'}
        }

        const sessionId = crypto.randomUUID()
        const tokenPair = await this.createTokenPair({sessionId: sessionId, userId: user.id})
        await this.authRepository.createSession({
            sessionId: sessionId,
            userId: user.id,
            currentRefreshToken: tokenPair.refreshToken,
            createdAt: Now.instant(),
        })

        return {status: 'Success', user: user, newTokenPair: tokenPair}
    }

    async checkAccessToken(accessToken: AccessToken): Promise<CheckAccessTokenResult> {
        const verifyResult = await this.accessJwtService.verify(accessToken)

        if (verifyResult.status === 'Success') {
            const payload = this.decodeAccessTokenPayload(verifyResult.payload)
            if (payload === null) {
                // Подпись верная, значит токен подписал именно сервер.
                // Скорее всего код сервера обновился, и он больше не принимает такой payload, а клиент использовал старый токен.
                // Поэтому считаем такой токен истёкшим.
                return {status: 'Failed', reason: 'Expired'}
            }

            return {status: 'Success', payload: payload}
        }

        if (verifyResult.status === 'Failed') {
            return verifyResult
        }

        assertNever(verifyResult)
    }

    async checkRefreshToken(refreshToken: RefreshToken): Promise<CheckRefreshTokenResult> {
        const verifyResult = await this.refreshJwtService.verify(refreshToken)

        if (verifyResult.status === 'Success') {
            const payload = this.decodeRefreshTokenPayload(verifyResult.payload)
            if (payload === null) {
                // Подпись верная, значит токен подписал именно сервер.
                // Скорее всего код сервера обновился, и он больше не принимает такой payload, а клиент использовал старый токен.
                // Поэтому считаем такой токен истёкшим.
                return {status: 'Failed', reason: 'Expired'}
            }

            return {status: 'Success', payload: payload}
        }

        if (verifyResult.status === 'Failed') {
            return verifyResult
        }

        assertNever(verifyResult)
    }

    async refreshTokens(refreshToken: RefreshToken): Promise<RefreshTokensResult> {
        const checkResult = await this.checkRefreshToken(refreshToken)
        if (checkResult.status !== 'Success')
            return checkResult
        const refreshTokenPayload = checkResult.payload
        const {userId, sessionId} = refreshTokenPayload

        const newTokenPair = await this.createTokenPair({userId, sessionId})

        const result = await this.authRepository.refreshTokens(sessionId, refreshToken, newTokenPair)

        if (result.status === 'CompromisedSession') {
            // Если наша сессия (в частности refresh token) была скомпроментирована, то
            //   нам нужно её сбросить
            await this.authRepository.revokeSession(sessionId)
        }

        return result
    }

    async revokeSession(sessionId: SessionId): Promise<void> {
        await this.authRepository.revokeSession(sessionId)
    }

    private async createTokenPair({sessionId, userId}: {
        sessionId: SessionId,
        userId: UserId,
    }): Promise<TokenPair> {
        const refreshTokenId = crypto.randomUUID()

        const refreshTokenPayload: RefreshTokenPayload = {id: refreshTokenId, sessionId, userId}
        const refreshTokenExpiresAt = Now.instant().add({milliseconds: this.refreshTokenLifetime.total('milliseconds')})
        const refreshToken = this.refreshJwtService.sign(
            this.encodeRefreshTokenPayload(refreshTokenPayload),
            {expiresAt: refreshTokenExpiresAt}
        )

        const accessTokenPayload: AccessTokenPayload = {sessionId, userId}
        const accessTokenExpiresAt = Now.instant().add({milliseconds: this.accessTokenLifetime.total('milliseconds')})
        const accessToken = this.accessJwtService.sign(
            this.encodeAccessTokenPayload(accessTokenPayload),
            {expiresAt: accessTokenExpiresAt}
        )

        return {refreshToken: await refreshToken, accessToken: await accessToken}
    }

    private encodeAccessTokenPayload(payload: AccessTokenPayload): JWTPayload {
        return {sessionId: payload.sessionId, userId: payload.userId} satisfies AccessTokenPayload
    }

    private decodeAccessTokenPayload(payload: JWTPayload): AccessTokenPayload | null {
        if (typeof payload.sessionId !== 'string')
            return null
        if (typeof payload.userId !== 'string')
            return null
        return {sessionId: payload.sessionId, userId: payload.userId}
    }

    private encodeRefreshTokenPayload(payload: RefreshTokenPayload): JWTPayload {
        return {id: payload.id, sessionId: payload.sessionId, userId: payload.userId} satisfies RefreshTokenPayload
    }

    private decodeRefreshTokenPayload(payload: JWTPayload): RefreshTokenPayload | null {
        if (typeof payload.id !== 'string')
            return null
        if (typeof payload.sessionId !== 'string')
            return null
        if (typeof payload.userId !== 'string')
            return null
        return {id: payload.id, sessionId: payload.sessionId, userId: payload.userId}
    }
}
