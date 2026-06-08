import {InternalUser} from "../types/User.js";
import {AccessTokenPayload, RefreshTokenPayload, TokenPair} from "../types/JWT.js";

// ------ Регистрация и авторизация ------

export type RegisterResult =
    | { type: 'Success', newUser: InternalUser, tokenPair: TokenPair }
    // * Не удалось зарегистрироваться: Email уже занят *
    | { type: 'Conflict', conflictOn: 'Email' | 'PhoneNumber' }
    // * Некорректный email адрес *
    | { type: 'InvalidEmail' }

export type LoginResult =
    | { type: 'Success', user: InternalUser, tokenPair: TokenPair }
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
    | { type: 'Success', tokenPair: TokenPair }
    | { type: 'Failed', reason: 'Expired' | 'VerificationFailed' }
    | { type: 'CompromisedSession' }
