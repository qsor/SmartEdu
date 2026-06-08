import {InternalUser} from "../../types/User.js";
import {AccessTokenPayload, RefreshTokenPayload, TokenPair} from "../../types/JWT.js";

// ------ Регистрация и авторизация ------

export type RegisterResult =
    | { type: 'Success', newUser: InternalUser, tokenPair: TokenPair }
    // Например: * Не удалось зарегистрироваться: Email уже занят *
    | { type: 'Conflict', conflictOn: 'Email' | 'PhoneNumber' }
    // Пример, что на уровне домена могут быть дополнительные ошибки при регистрации, отличные от CreateUserUser внутри репозитория.
    // Например UserService может модерировать firstName/lastName на использование нецензурных слов и возвращать ошибку регистрации (это бизнес-логика).
    // В то время как репозиторий/база данных такое делать не должна: она проверяет только целостность данных.
    | {
        type: 'Moderation'
        message: string
        shouldUseDifferentFirstName: boolean
        shouldUseDifferentLastName: boolean
    }

export type LoginResult =
    | { type: 'Success', user: InternalUser, tokenPair: TokenPair }

export type RegisterUsingEmailResult =
    | RegisterResult
    | { type: 'InvalidEmail' }

export type LoginUsingEmailResult =
    | LoginResult
    | { type: 'EmailNotRegistered' }
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
