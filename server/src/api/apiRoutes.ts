import {Router} from "express";
import {AuthService, UserService} from "../service/index.js";
import {healthRoutes} from "./routes/health.js";
import {authRoutes} from "./routes/auth.js";
import {userRoutes} from "./routes/user.js";
import {Temporal} from "@js-temporal/polyfill";
import Duration = Temporal.Duration;

export function apiRoutes(
    router: Router,
    authService: AuthService,
    userService: UserService,
    config: {
        secureCookie: boolean
        refreshTokenCookieLifetime: Duration
    }
) {
    healthRoutes(router)
    authRoutes(router, authService, userService, config)
    userRoutes(router, authService, userService)
}
