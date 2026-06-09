import {Router} from "express";
import {Temporal} from "@js-temporal/polyfill";
import {healthRoutes} from "./health.js";
import {authRoutes} from "./auth.js";
import {userRoutes} from "./user.js";
import {UserService} from "../service/UserService.js";
import {AuthService} from "../service/AuthService.js";
import Duration = Temporal.Duration;

export function allRoutes(
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
