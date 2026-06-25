import { Router } from "express";
import { Temporal } from "@js-temporal/polyfill";
import { healthRoutes } from "./health.js";
import { authRoutes } from "./auth.js";
import { userRoutes } from "./user.js";
import { courseRoutes } from "./course.js";
import { UserService } from "../service/UserService.js";
import { AuthService } from "../service/AuthService.js";
import { CourseService } from "../service/CourseService.js";
import { EnrollmentService } from "../service/EnrollmentService.js";
import Duration = Temporal.Duration;

export function allRoutes(
    router: Router,
    authService: AuthService,
    userService: UserService,
    courseService: CourseService,
    enrollmentService: EnrollmentService,
    config: {
        secureCookie: boolean
        refreshTokenCookieLifetime: Duration
    }
) {
    healthRoutes(router)
    authRoutes(router, authService, userService, config)
    userRoutes(router, authService, userService, enrollmentService)

    courseRoutes(router, courseService, enrollmentService)
}
