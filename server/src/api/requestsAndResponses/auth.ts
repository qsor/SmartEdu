import {MyselfDto} from "../types/users.js";

// ------ Вход в аккаунт ------

export interface LoginRequestBody {
    email: string
    password: string
}

export type LoginResponse =
    | { type: 'Success', myself: MyselfDto, accessToken: string }
    | { type: 'EmailNotRegistered' }
    | { type: 'InvalidPassword' }

// ------ Регистрация ------

export interface RegisterRequestBody {
    firstName: string
    lastName: string | null
    email: string
    password: string
}

export type RegisterResponse =
    | { type: 'Success', myself: MyselfDto, accessToken: string }
    // * Этот email уже зарегистрирован *
    | { type: 'Conflict', conflictOn: 'Email' }
    // * Это некорректный email адрес *
    | { type: 'InvalidEmail' }

// ------ Работа с JWT токенами ------

export type RefreshTokensResponse =
    | { type: 'Success', newAccessToken: string }
    // Для клиента это означает, что он теперь разлогинен.
    // - CompromisedSession - Сессия была скомпроментирована, пользователь был принудительно разлогинен.
    // - InvalidSession - Эта сессия невалидна. Например, JWT Refresh token некорректно подписан подписью сервера
    // - ExpiredSession - Пользователь слишком долго не заходил на сайт, сессия истекла
    // - Other - Другая причина
    | { type: 'AuthorizationError', reason: 'CompromisedSession' | 'InvalidSession' | 'ExpiredSession' | 'Other', message: string }

