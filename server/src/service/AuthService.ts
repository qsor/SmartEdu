import {JwtService} from "../jwt/index.js";
import {JWTPayload} from "jose";
import {assertNever} from "../shared/index.js";
import * as crypto from "node:crypto";
import {Temporal} from "@js-temporal/polyfill";
import * as argon2 from "argon2";
import {AuthRepository, UserRepository} from "../repository/index.js";
import {UserId} from "../types/User.js";
import {
    AccessToken,
    AccessTokenPayload,
    RefreshToken,
    RefreshTokenPayload,
    SessionId,
    TokenPair
} from "../types/JWT.js";
import {
    CheckAccessTokenResult,
    CheckRefreshTokenResult,
    LoginResult,
    RefreshTokensResult,
    RegisterResult
} from "../results/auth.js";
import DurationLike = Temporal.DurationLike;
import Duration = Temporal.Duration;
import Now = Temporal.Now;

const emailRegex = RegExp(/(?:[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+(?:\.[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\x2d]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)

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
            return {type: 'InvalidEmail'}

        // Создание пользователя

        const createUserResult = await this.userRepository.createUser({
            firstName: firstName,
            lastName: lastName,
            passwordHash: await argon2.hash(password),
            email: email,
            phoneNumber: null,
        })

        if (createUserResult.type === 'Success') {
            const newUser = createUserResult.newUser
            const sessionId = crypto.randomUUID()
            const tokenPair = await this.createTokenPair({ sessionId, userId: newUser.id})

            const createSessionResult = await this.authRepository.createSession({
                sessionId: sessionId,
                userId: newUser.id,
                currentRefreshToken: tokenPair.refreshToken,
                createdAt: Now.instant(),
            })

            if (createSessionResult.type === 'Success') {
                return {
                    type: 'Success',
                    newUser: newUser,
                    tokenPair: tokenPair,
                }
            }

            if (createSessionResult.type === 'InvalidUserId') {
                // По идее такого никогда не должно произойти: Мы только что создали пользователя с таким id, но authRepository говорит, что такого пользователя нет.
                // Единственная ситуация когда такое может произойти: Этот пользователь был удалён, пока эта функция выполнялась
                return {type: 'InvalidEmail'}
            }

            assertNever(createSessionResult)
        }

        if (createUserResult.type === 'Conflict') {
            return {type: 'Conflict', conflictOn: 'Email'}
        }

        assertNever(createUserResult)
    }

    async loginUsingEmail(email: string, password: string): Promise<LoginResult> {
        const user = await this.userRepository.getUserByEmail(email)
        if (user === null) {
            return {type: 'EmailNotRegistered'}
        }

        const isPasswordValid = await argon2.verify(user.passwordHash, password)

        if (!isPasswordValid) {
            return {type: 'InvalidPassword'}
        }

        const sessionId = crypto.randomUUID()
        const tokenPair = await this.createTokenPair({sessionId: sessionId, userId: user.id})
        const createSessionResult = await this.authRepository.createSession({
            sessionId: sessionId,
            userId: user.id,
            currentRefreshToken: tokenPair.refreshToken,
            createdAt: Now.instant(),
        })

        if (createSessionResult.type === 'Success') {
            return {type: 'Success', user: user, tokenPair: tokenPair}
        }

        if (createSessionResult.type === 'InvalidUserId') {
            // По идее такого никогда не должно произойти: Мы только что смогли найти пользователя с таким id, но authRepository говорит, что такого пользователя нет.
            // Единственная ситуация когда такое может произойти: Этот пользователь был удалён, пока эта функция выполнялась
            return {type: 'EmailNotRegistered'}
        }

        assertNever(createSessionResult)
    }

    async checkAccessToken(accessToken: AccessToken): Promise<CheckAccessTokenResult> {
        const verifyResult = await this.accessJwtService.verify(accessToken)

        if (verifyResult.type === 'Success') {
            const payload = this.decodeAccessTokenPayload(verifyResult.payload)
            if (payload === null) {
                // Подпись верная, значит токен подписал именно сервер.
                // Скорее всего код сервера обновился, и он больше не принимает такой payload, а клиент использовал старый токен.
                // Поэтому считаем такой токен истёкшим.
                return {type: 'Failed', reason: 'Expired'}
            }

            return {type: 'Success', payload: payload}
        }

        if (verifyResult.type === 'Failed') {
            return verifyResult
        }

        assertNever(verifyResult)
    }

    async checkRefreshToken(refreshToken: RefreshToken): Promise<CheckRefreshTokenResult> {
        const verifyResult = await this.refreshJwtService.verify(refreshToken)

        if (verifyResult.type === 'Success') {
            const payload = this.decodeRefreshTokenPayload(verifyResult.payload)
            if (payload === null) {
                // Подпись верная, значит токен подписал именно сервер.
                // Скорее всего код сервера обновился, и он больше не принимает такой payload, а клиент использовал старый токен.
                // Поэтому считаем такой токен истёкшим.
                return {type: 'Failed', reason: 'Expired'}
            }

            return {type: 'Success', payload: payload}
        }

        if (verifyResult.type === 'Failed') {
            return verifyResult
        }

        assertNever(verifyResult)
    }

    async refreshTokens(refreshToken: RefreshToken): Promise<RefreshTokensResult> {
        const checkResult = await this.checkRefreshToken(refreshToken)
        if (checkResult.type !== 'Success')
            return checkResult
        const refreshTokenPayload = checkResult.payload
        const {userId, sessionId} = refreshTokenPayload

        const newTokenPair = await this.createTokenPair({userId, sessionId})

        const refreshTokensResult = await this.authRepository.refreshTokens(sessionId, refreshToken, newTokenPair.refreshToken)

        if (refreshTokensResult.type === 'Success') {
            return {type: 'Success', tokenPair: newTokenPair}
        }

        if (refreshTokensResult.type === 'InvalidSessionId') {
            return {type: 'Failed', reason: 'Expired'}
        }

        if (refreshTokensResult.type === 'CompromisedRefreshToken') {
            // Если наша сессия (в частности refresh token) была скомпроментирована, то
            //   нам нужно её сбросить
            await this.authRepository.revokeSession(sessionId)
            return {type: 'CompromisedSession'}
        }

        assertNever(refreshTokensResult)
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
