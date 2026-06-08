import {InternalUser, MyselfUser} from "../types/User.js";
import {AccessTokenPayload, RefreshTokenPayload, TokenPair} from "../types/JWT.js";

// ------ Регистрация и авторизация ------

export type RegisterResult =
    | { type: 'Success', myself: MyselfUser }
    // * Не удалось зарегистрироваться: Email уже занят *
    | { type: 'Conflict', conflictOn: 'Email' | 'PhoneNumber' }
    // * Некорректный email адрес *
    | { type: 'InvalidEmail' }

export type LoginResult =
    | { type: 'Success', myself: MyselfUser }
    // * Этот email не зарегистрирован *
    | { type: 'EmailNotRegistered' }
    // * Неправильный пароль *
    | { type: 'InvalidPassword' }

// ------ JWT Tokens ------

export type CheckAccessTokenResult =
    | { type: 'Success', payload: AccessTokenPayload }
    | { type: 'Failed', reason: 'Expired' | 'VerificationFailed' }

export type CheckRefreshTokenResult =
    | { type: 'Success', payload: RefreshTokenPayload }
    | { type: 'Failed', reason: 'Expired' | 'VerificationFailed' }

export type RefreshTokensResult =
    | { type: 'Success' }
    | { type: 'Failed', reason: 'Expired' | 'VerificationFailed', message?: string }
    | { type: 'CompromisedSession' }
