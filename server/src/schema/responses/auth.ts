import {MyselfUser} from "../types/User.js";

// ------ Регистрация и авторизация ------

export type RegisterResponse =
    | { type: 'Success', myself: MyselfUser }
    // * Не удалось зарегистрироваться: Email уже занят *
    | { type: 'Conflict', conflictOn: 'Email' | 'PhoneNumber' }
    // * Некорректный email адрес *
    | { type: 'InvalidEmail' }

export type LoginResponse =
    | { type: 'Success', myself: MyselfUser }
    // * Этот email не зарегистрирован *
    | { type: 'EmailNotRegistered' }
    // * Неправильный пароль *
    | { type: 'InvalidPassword' }

// ------ JWT Tokens ------

export type RefreshTokensResponse =
    | { type: 'Success' }
    | { type: 'Failed', reason: 'Expired' | 'VerificationFailed', message?: string }
    | { type: 'CompromisedSession' }
