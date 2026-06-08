import {AuthRepository, UserRepository} from "./repository/index.js";
import {AuthService, UserService} from "./service/index.js";
import {JwtService} from "./jwt/index.js";
import {TextEncoder} from "node:util";
import {env} from "./config/env.js";

export async function bootstrap() {
    const authRepository = new AuthRepository()
    const userRepository = new UserRepository()

    const accessJwtService = new JwtService(new TextEncoder().encode(env.accessTokenSecret))
    const refreshJwtService = new JwtService(new TextEncoder().encode(env.refreshTokenSecret))

    const authService = new AuthService(authRepository, userRepository, {
        accessJwtService,
        refreshJwtService,
        accessTokenLifetime: env.accessTokenLifetime,
        refreshTokenLifetime: env.refreshTokenLifetime,
    })
    const userService = new UserService(userRepository)

    return {
        authRepository,
        userRepository,
        accessJwtService,
        refreshJwtService,
        authService,
        userService,
    }
}
