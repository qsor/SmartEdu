import {MyselfUser} from "../types/User.js";

// ------ Регистрация и авторизация ------

// Frontend получит в body:
// Либо {"status": "Success", myself: {...}}
// Либо {"status": "Conflict", conflictOn: "Email"}
// Либо {"status": "Conflict", conflictOn: "PhoneNumber"}
// Либо {"status": "InvalidEmail"}
export type RegisterResponse =
    | { status: 'Success', myself: MyselfUser }
    // * Не удалось зарегистрироваться: Email уже занят *
    | { status: 'Conflict', conflictOn: 'Email' | 'PhoneNumber' }
    // * Некорректный email адрес *
    | { status: 'InvalidEmail' }

// Frontend получит в body:
// Либо {"status": "Success", myself: {...}}
// Либо {"status": "EmailNotRegistered"}
// Либо {"status": "InvalidPassword"}
export type LoginResponse =
    | { status: 'Success', myself: MyselfUser }
    // * Этот email не зарегистрирован *
    | { status: 'EmailNotRegistered' }
    // * Неправильный пароль *
    | { status: 'InvalidPassword' }

// ------ JWT Tokens ------

// Frontend получит в body:
// Либо {"status": "Success"}
// Либо {"status": "Failed", reason: "Expired", message: "Опциональное сообщение, этого поля может не быть"}
// Либо {"status": "Failed", reason: "VerificationFailed", message: "Опциональное сообщение, этого поля может не быть"}
// Либо {"status": "CompromisedSession"}
export type RefreshTokensResponse =
    | { status: 'Success' }
    | { status: 'Failed', reason: 'Expired' | 'VerificationFailed', message?: string }
    | { status: 'CompromisedSession' }
