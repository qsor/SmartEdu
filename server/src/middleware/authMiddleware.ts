import {NextFunction, Request, RequestHandler, Response} from "express";
import {assertNever, Mutable} from "../shared/index.js";
import {Actor} from "../schema/types/JWT.js";
import {AuthService} from "../service/AuthService.js";

declare global {
    namespace Express {
        interface Request {
            readonly actor: Actor
        }
    }
}

export function createAuthMiddleware(authService: AuthService): RequestHandler {
    return (req, res, next) => {
        return authMiddleware(authService, req, res, next)
    }
}

async function authMiddleware(
    authService: AuthService,
    req: Mutable<Request>,
    res: Response,
    next: NextFunction,
) {
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader === undefined) {
        req.actor = {isGuest: true, isAuthenticated: false, userId: undefined, sessionId: undefined}
        return next()
    }

    const [type, token] = authorizationHeader.split(' ')
    if (type !== 'Bearer' || token === undefined) {
        res.status(400).send({
            status: 'Unauthenticated',
            message: 'Invalid Authorization header. Bearer authorization header is required.'
        })
        return
    }

    const result = await authService.checkAccessToken(token)

    if (result.status === 'Success') {
        req.actor = {isGuest: false, isAuthenticated: true, sessionId: result.payload.sessionId, userId: result.payload.userId}
        return next()
    }

    if (result.status === 'Failed') {
        if (result.reason === 'Expired') {
            res.status(401).send({status: 'ExpiredAccessToken'})
            return
        }

        if (result.reason === 'VerificationFailed') {
            res.status(401).send({status: 'InvalidAccessToken'})
            return
        }

        assertNever(result.reason)
    }

    assertNever(result)
}
