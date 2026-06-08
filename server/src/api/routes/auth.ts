import {Response, Router} from "express";
import {AuthService, UserService} from "../../service/index.js";
import {CookieOptions} from "express-serve-static-core";
import {
    LoginRequestBody,
    LoginResponse,
    RegisterRequestBody,
    RegisterResponse,
    RefreshTokensResponse
} from "../requestsAndResponses/auth.js";
import {assertNever} from "../../shared/index.js";
import {Temporal} from "@js-temporal/polyfill";
import Duration = Temporal.Duration;
import Now = Temporal.Now;
import {toMyselfUser} from "../../types/User.js";

const REFRESH_TOKEN_COOKIE = 'refreshToken' as const
// Если клиент получает хедер X-New-Access-Token, то он должен обновить его значение (в localStorage)
const NEW_ACCESS_TOKEN_HEADER = 'X-New-Access-Token' as const
// Если клиент получает хедер X-Delete-Access-Token с любым не-пустым значением, то он должен удалить свой accessToken (в localStorage)
const DELETE_ACCESS_TOKEN_HEADER = 'X-Delete-Access-Token' as const
const DELETE_ACCESS_TOKEN_HEADER_VALUE = 'Delete' as const

export function authRoutes(
    router: Router,
    authService: AuthService,
    userService: UserService,
    config: {
        secureCookie: boolean
        refreshTokenCookieLifetime: Duration
    }
) {
    router.post('/auth/login', async (req, res: Response<LoginResponse>) => {
        const body = req.body as LoginRequestBody // todo add zod validation

        const result = await authService.loginUsingEmail(body.email, body.password)

        if (result.type === 'Success') {
            return res
                .status(200)
                .cookie(...refreshTokenCookie(config, result.tokenPair.refreshToken))
                .header(NEW_ACCESS_TOKEN_HEADER, result.tokenPair.accessToken)
                .send({
                    type: 'Success',
                    myself: toMyselfUser(result.user),
                })
        }

        if (result.type === 'EmailNotRegistered') {
            return res
                .status(404)
                .send({
                    type: 'EmailNotRegistered',
                })
        }

        if (result.type === 'InvalidPassword') {
            return res
                .status(404)
                .send({
                    type: 'InvalidPassword',
                })
        }

        assertNever(result)
    })

    router.post('/auth/register', async (req, res: Response<RegisterResponse>) => {
        const body = req.body as RegisterRequestBody // todo add zod validation

        const result = await authService.registerUsingEmail({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
        })

        if (result.type === 'Success') {
            return res
                .status(200)
                .cookie(...refreshTokenCookie(config, result.tokenPair.refreshToken))
                .header(NEW_ACCESS_TOKEN_HEADER, result.tokenPair.accessToken)
                .send({
                    type: 'Success',
                    myself: toMyselfUser(result.newUser),
                })
        }

        if (result.type === 'Conflict') {
            return res
                .status(409)
                .send({
                    type: 'Conflict',
                    conflictOn: 'Email',
                })
        }

        if (result.type === 'InvalidEmail') {
            return res
                .status(400)
                .send({type: 'InvalidEmail'})
        }

        assertNever(result)
    })

    router.post('/auth/refresh', async (req, res: Response<RefreshTokensResponse>) => {
        const unknownRefreshToken = req.cookies[REFRESH_TOKEN_COOKIE]
        if (typeof unknownRefreshToken !== 'string') {
            return res.status(400).send({
                type: 'AuthorizationError',
                reason: 'InvalidSession',
                message: `Cookie ${REFRESH_TOKEN_COOKIE} not found. Please sign in again.`,
            })
        }

        const [refreshTokenType, refreshToken] = unknownRefreshToken.split(' ')
        if (refreshTokenType !== 'Bearer' || typeof refreshToken !== 'string') {
            return res.status(400).send({
                type: 'AuthorizationError',
                reason: 'InvalidSession',
                message: `Cookie ${REFRESH_TOKEN_COOKIE} has an invalid token type. Bearer is required.`,
            })
        }

        const result = await authService.refreshTokens(refreshToken)

        if (result.type === 'Success') {
            return res
                .status(200)
                .cookie(...refreshTokenCookie(config, result.tokenPair.refreshToken))
                .header(NEW_ACCESS_TOKEN_HEADER, result.tokenPair.accessToken)
                .send({type: 'Success'})
        }

        if (result.type === 'Failed') {
            if (result.reason === 'Expired') {
                return res.status(400).send({
                    type: 'AuthorizationError',
                    reason: 'ExpiredSession',
                    message: `Your session has expired. Please sign in again.`,
                })
            }

            if (result.reason === 'VerificationFailed') {
                return res.status(400).send({
                    type: 'AuthorizationError',
                    reason: 'InvalidSession',
                    message: `Your ${REFRESH_TOKEN_COOKIE} cookie is malformed. Please sign in again.`,
                })
            }

            assertNever(result.reason)
        }

        if (result.type === 'CompromisedSession') {
            return res.status(400).send({
                type: 'AuthorizationError',
                reason: 'CompromisedSession',
                message: `Your session was compromised. Sorry. Please sign in again.`,
            })
        }

        assertNever(result)
    })
}

function refreshTokenCookie(
    config: {
        secureCookie: boolean
        refreshTokenCookieLifetime: Duration
    },
    refreshToken: string,
): [typeof REFRESH_TOKEN_COOKIE, string, CookieOptions] {
    const expiresAt = Now.instant()
        .add({ milliseconds: config.refreshTokenCookieLifetime.total('milliseconds') })

    return [
        REFRESH_TOKEN_COOKIE,
        `Bearer ${refreshToken}`,
        {
            httpOnly: true,
            sameSite: 'strict',
            secure: config.secureCookie,
            path: '/api/auth/refresh',
            expires: new Date(expiresAt.epochMilliseconds),
        }
    ]
}
