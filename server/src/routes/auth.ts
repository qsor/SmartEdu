import {Response, Router} from "express";
import {CookieOptions} from "express-serve-static-core";
import {assertNever} from "../shared/index.js";
import {Temporal} from "@js-temporal/polyfill";
import {LoginResult, RefreshTokensResult, RegisterResult} from "../schema/results/auth.js";
import {LoginRequestBody, RegisterRequestBody} from "../schema/http/auth.js";
import {AuthService} from "../service/AuthService.js";
import {UserService} from "../service/UserService.js";
import Duration = Temporal.Duration;
import Now = Temporal.Now;

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
                .cookie(...refreshTokenCookie(config, result.newTokenPair.refreshToken))
                .header(NEW_ACCESS_TOKEN_HEADER, result.newTokenPair.accessToken)
                .send({
                    status: 'Success',
                    myself: toMyselfUser(result.user),
                })
        }

        if (result.type === 'EmailNotRegistered') {
            return res
                .status(404)
                .send(result)
        }

        if (result.type === 'InvalidPassword') {
            return res
                .status(404)
                .send(result)
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
                .cookie(...refreshTokenCookie(config, result.newTokenPair.refreshToken))
                .header(NEW_ACCESS_TOKEN_HEADER, result.newTokenPair.accessToken)
                .send({
                    status: 'Success',
                    myself: toMyselfUser(result.user),
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

    router.post('/auth/refresh', async (req, res: Response<RefreshTokensResult>) => {
        const unknownRefreshToken = req.cookies[REFRESH_TOKEN_COOKIE]
        if (typeof unknownRefreshToken !== 'string') {
            return res.status(400).send({
                type: 'Failed',
                reason: 'Expired',
                message: `Cookie ${REFRESH_TOKEN_COOKIE} not found. Please sign in again.`,
            })
        }

        const [refreshTokenType, refreshToken] = unknownRefreshToken.split(' ')
        if (refreshTokenType !== 'Bearer' || typeof refreshToken !== 'string') {
            return res.status(400).send({
                type: 'Failed',
                reason: 'VerificationFailed',
                message: `Cookie ${REFRESH_TOKEN_COOKIE} has an invalid token type. Bearer is required.`,
            })
        }

        const result = await authService.refreshTokens(refreshToken)

        if (result.type === 'Success') {
            return res
                .status(200)
                .cookie(...refreshTokenCookie(config, result.newTokenPair.refreshToken))
                .header(NEW_ACCESS_TOKEN_HEADER, result.newTokenPair.accessToken)
                .send(result)
        }

        return res
            .status(400)
            .send(result)
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
