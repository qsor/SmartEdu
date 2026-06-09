import {InternalUser, MyselfUser} from "../types/User.js";
import {AccessTokenPayload, RefreshTokenPayload, TokenPair} from "../types/JWT.js";

// ------ Регистрация и авторизация ------

// Это результат СОЗДАНИЯ пользователя в базе данных
export type CreateUserResult =
    | { status: 'Success', user: InternalUser }
    // * Не удалось зарегистрироваться: Email уже занят *
    | { status: 'Conflict', conflictOn: 'Email' | 'PhoneNumber' }

// Это результат РЕГИСТРАЦИИ пользователя в сервисе
export type RegisterResult =
    | { status: 'Success', user: InternalUser, newTokenPair: TokenPair }
    // * Не удалось зарегистрироваться: Email уже занят *
    | { status: 'Conflict', conflictOn: 'Email' | 'PhoneNumber' }
    // * Некорректный email адрес *
    | { status: 'InvalidEmail' }

export type LoginResult =
    | { status: 'Success', user: InternalUser, newTokenPair: TokenPair }
    // * Этот email не зарегистрирован *
    | { status: 'EmailNotRegistered' }
    // * Неправильный пароль *
    | { status: 'InvalidPassword' }

// ------ JWT Tokens ------

export type CheckAccessTokenResult =
    | { status: 'Success', payload: AccessTokenPayload }
    | { status: 'Failed', reason: 'Expired' | 'VerificationFailed' }

export type CheckRefreshTokenResult =
    | { status: 'Success', payload: RefreshTokenPayload }
    | { status: 'Failed', reason: 'Expired' | 'VerificationFailed' }

export type RefreshTokensResult =
    | { status: 'Success', newTokenPair: TokenPair }
    | { status: 'Failed', reason: 'Expired' | 'VerificationFailed', message?: string }
    | { status: 'CompromisedSession' }
