import { Temporal } from "@js-temporal/polyfill";

type Duration = Temporal.Duration;

const port = Number(process.env.PORT ?? 4000);
const clientOrigin = process.env.CLIENT_ORIGIN;
const databaseUrl = process.env.DATABASE_URL;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenLifetimeRaw = process.env.ACCESS_TOKEN_LIFETIME;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenLifetimeRaw = process.env.REFRESH_TOKEN_LIFETIME;
const refreshTokenCookieLifetimeRaw = process.env.REFRESH_TOKEN_COOKIE_LIFETIME ?? refreshTokenLifetimeRaw;
const cookieSecret = process.env.COOKIE_SECRET;
const secureCookieRaw = process.env.SECURE_COOKIE;

if (Number.isNaN(port)) {
    throw new Error("PORT environment variable must be a valid number");
}

if (!clientOrigin) {
    throw new Error('CLIENT_ORIGIN environment variable is required. You can use * to allow any origin. Use "http://localhost:5173" for development. Must be your domain in production');
}

if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is required");
}

if (!accessTokenSecret) {
    throw new Error("ACCESS_TOKEN_SECRET environment variable is required. Must be a strong secret in production");
}

if (!accessTokenLifetimeRaw) {
    throw new Error("ACCESS_TOKEN_LIFETIME environment variable is required. Default value is 'PT5m'. See ISO 8601 Duration format");
}

if (!refreshTokenSecret) {
    throw new Error("REFRESH_TOKEN_SECRET environment variable is required. Must be a strong secret in production");
}

if (!refreshTokenLifetimeRaw) {
    throw new Error("REFRESH_TOKEN_LIFETIME environment variable is required. Default value is 'P28d'. See ISO 8601 Duration format");
}

if (!refreshTokenCookieLifetimeRaw) {
    throw new Error("REFRESH_TOKEN_COOKIE_LIFETIME environment variable is required. Default value is equal to REFRESH_TOKEN_LIFETIME. See ISO 8601 Duration format");
}

if (!cookieSecret) {
    throw new Error("COOKIE_SECRET environment variable is required. Must be a strong secret in production");
}

if (!secureCookieRaw) {
    throw new Error("SECURE_COOKIE environment variable is required. Must be TRUE in production");
}

let secureCookie: boolean;
if (secureCookieRaw.toLocaleLowerCase() === 'true') {
    secureCookie = true;
} else if (secureCookieRaw.toLocaleLowerCase() === 'false') {
    secureCookie = false;
} else {
    throw new Error("invalid SECURE_COOKIE environment variable. Must be TRUE or FALSE. Must be TRUE in production");
}

let accessTokenLifetime = Temporal.Duration.from(accessTokenLifetimeRaw);
if (accessTokenLifetime.total('seconds') < 1 || accessTokenLifetime.total('days') > 5000) {
    throw new Error("invalid ACCESS_TOKEN_LIFETIME environment variable. Default value is 'PT5m'. See ISO 8601 Duration format");
}

let refreshTokenLifetime = Temporal.Duration.from(refreshTokenLifetimeRaw);
if (refreshTokenLifetime.total('seconds') < 1 || refreshTokenLifetime.total('days') > 5000) {
    throw new Error("invalid REFRESH_TOKEN_LIFETIME environment variable. Default value is 'P28d'. See ISO 8601 Duration format");
}

let refreshTokenCookieLifetime = Temporal.Duration.from(refreshTokenCookieLifetimeRaw);
if (refreshTokenCookieLifetime.total('seconds') < 1 || refreshTokenCookieLifetime.total('days') > 5000) {
    throw new Error("invalid REFRESH_TOKEN_COOKIE_LIFETIME environment variable. Default value is equal to REFRESH_TOKEN_LIFETIME. See ISO 8601 Duration format");
}

export const env = {
    port, // 4000
    clientOrigin, // https://example.com
    databaseUrl, // postgresql://postgres:postgres@localhost:5432/database?schema=public
    accessTokenSecret, // qwertyuiop
    accessTokenLifetime, // 5m
    refreshTokenSecret, // asdfghjkl
    refreshTokenLifetime, // 28d
    refreshTokenCookieLifetime, // 28d
    cookieSecret, // zxcvbnm
    secureCookie, // true
};