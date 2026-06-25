import { TextEncoder } from "node:util";
import { env } from "./config/env.js";
import { AuthRepository } from "./repository/AuthRepository.js";
import { UserRepository } from "./repository/UserRepository.js";
import { EnrollmentRepository } from "./repository/EnrollmentRepository.js";
import { JwtService } from "./service/JwtService.js";
import { AuthService } from "./service/AuthService.js";
import { UserService } from "./service/UserService.js";
import { EnrollmentService } from "./service/EnrollmentService.js";
import { CourseRepository } from "./repository/CourseRepository.js";
import { CourseService } from "./service/CourseService.js";
import { runMigrations } from "./db/runMigrations.js";
import { db } from "./db/index.js";
import {LessonRepository} from "./repository/LessonRepository.js";
import {LessonService} from "./service/LessonService.js";

export async function bootstrap() {
    // Запуск миграций (либо автоматического создания) схемы базы данных
    await runMigrations()

    const authRepository = new AuthRepository(db)
    const userRepository = new UserRepository(db)
    const courseRepository = new CourseRepository(db)
    const enrollmentRepository = new EnrollmentRepository()
    const lessonRepository = new LessonRepository(db)

    const accessJwtService = new JwtService(new TextEncoder().encode(env.accessTokenSecret))
    const refreshJwtService = new JwtService(new TextEncoder().encode(env.refreshTokenSecret))

    const authService = new AuthService(authRepository, userRepository, {
        accessJwtService,
        refreshJwtService,
        accessTokenLifetime: env.accessTokenLifetime,
        refreshTokenLifetime: env.refreshTokenLifetime,
    })
    const userService = new UserService(userRepository)
    const courseService = new CourseService(courseRepository);
    const lessonService = new LessonService(lessonRepository);
    const enrollmentService = new EnrollmentService(
        enrollmentRepository,
        courseRepository,
    )

    return {
        authRepository,
        userRepository,
        courseRepository,
        lessonRepository,
        enrollmentRepository,
        accessJwtService,
        refreshJwtService,
        authService,
        userService,
        courseService,
        lessonService,
        enrollmentService,
    }
}
