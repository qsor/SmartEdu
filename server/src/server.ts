import "dotenv/config";
import express, {Router} from "express";
import cors from "cors";
import {env} from "./config/env.js";
import cookieParser from "cookie-parser";
import {apiRoutes} from "./api/index.js";
import {bootstrap} from "./bootstrap.js";
import {createAuthMiddleware} from "./api/middleware/authMiddleware.js";

const {
    authRepository,
    moderationRepository,
    userRepository,
    accessJwtService,
    refreshJwtService,
    authService,
    userService,
} = await bootstrap()


// ------ Express ------


const expressApp = express()

expressApp.use(
    cors({
        origin: env.clientOrigin,
        credentials: true,
    }),
)

expressApp.use(cookieParser(env.cookieSecret))

expressApp.use(express.json())

expressApp.use(express.urlencoded({extended: true}))

expressApp.get("/", (_req, res) => {
    res.json({
        message: "Hello from express!",
    })
})

expressApp.use(createAuthMiddleware(authService))

const apiRouter = Router()
apiRoutes(apiRouter, authService, userService, {
    secureCookie: env.secureCookie,
    refreshTokenCookieLifetime: env.refreshTokenCookieLifetime,
})
expressApp.use("/api", apiRouter)

expressApp.listen(env.port, () => {
    console.log(`Server listening at http://127.0.0.1:${env.port}`)
})
