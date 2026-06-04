
// UUID либо bigint - Я не знаю что мы будем использовать в базе данных.
export type UserId = string

export interface User {
    id: UserId
    firstName: string
    lastName: string | null
    passwordHash: string | null // Допустим, что у пользователя может не быть пароля
    email: string | null
    phoneNumber: string | null
}
