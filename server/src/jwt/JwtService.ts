import {JWTPayload, jwtVerify, SignJWT} from "jose";
import {Temporal} from "@js-temporal/polyfill";
import {JOSEError, JWSSignatureVerificationFailed, JWTExpired} from "jose/errors";
import Instant = Temporal.Instant;

export class JwtService {
    constructor(
        private readonly secret: Uint8Array,
    ) {}

    async sign(
        payload: JWTPayload,
        options: { expiresAt: Instant },
    ): Promise<string> {
        const jwt = new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(Math.trunc(options.expiresAt.epochMilliseconds / 1000))

        return await jwt.sign(this.secret)
    }

    async verify(token: string): Promise<VerifyJwtTokenResult> {
        try {
            const result = await jwtVerify(token, this.secret, { algorithms: ['HS256'] })
            return { type: 'Success', payload: result.payload }
        } catch (e) {
            if (!(e instanceof JOSEError)) {
                throw e
            }

            if (e instanceof JWTExpired) {
                return { type: 'Failed', reason: 'Expired' }
            } else if (e instanceof JWSSignatureVerificationFailed) {
                return { type: 'Failed', reason: 'VerificationFailed' }
            } else {
                return { type: 'Failed', reason: 'VerificationFailed' }
            }
        }
    }
}

export type VerifyJwtTokenResult =
    | { type: 'Success', payload: JWTPayload }
    | { type: 'Failed', reason: 'Expired' | 'VerificationFailed' }
