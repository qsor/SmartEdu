
// UUID либо bigint - Я не знаю что мы будем использовать в базе данных.
export type UserId = string

export type User = OtherUser | MyselfUser

export interface OtherUser {
    id: UserId
    isMyself: false
    firstName: string
    lastName: string | null
}

export interface MyselfUser {
    id: UserId
    isMyself: true
    firstName: string
    lastName: string | null
    email: string | null
    phoneNumber: string | null
}

export interface InternalUser {
    id: UserId
    firstName: string
    lastName: string | null
    passwordHash: string
    email: string | null
    phoneNumber: string | null
}

export function toOtherUser(internalUser: InternalUser): OtherUser {
    return {
        id: internalUser.id,
        isMyself: false,
        firstName: internalUser.firstName,
        lastName: internalUser.lastName,
    }
}

export function toMyselfUser(internalUser: InternalUser): MyselfUser {
    return {
        id: internalUser.id,
        isMyself: true,
        firstName: internalUser.firstName,
        lastName: internalUser.lastName,
        email: internalUser.email,
        phoneNumber: internalUser.phoneNumber,
    }
}
