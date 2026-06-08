import {MyselfUser} from "../types/User.js";

// ------ Регистрация и авторизация ------

export type RegisterResponse =
    | { status: 'Success', myself: MyselfUser }
    // * Не удалось зарегистрироваться: Email уже занят *
    | { status: 'Conflict', conflictOn: 'Email' | 'PhoneNumber' }
    // * Некорректный email адрес *
    | { status: 'InvalidEmail' }

export type LoginResponse =
    | { status: 'Success', myself: MyselfUser }
    // * Этот email не зарегистрирован *
    | { status: 'EmailNotRegistered' }
    // * Неправильный пароль *
    | { status: 'InvalidPassword' }

// ------ JWT Tokens ------

export type RefreshTokensResponse =
    | { status: 'Success' }
    | { status: 'Failed', reason: 'Expired' | 'VerificationFailed', message?: string }
    | { status: 'CompromisedSession' }
