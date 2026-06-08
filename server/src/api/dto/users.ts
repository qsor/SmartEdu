
export interface UserDto {
    id: string
    firstName: string
    lastName: string | null

    /**
     * Сколько XP у этого пользователя
     */
    xp: number
}

export interface MyselfDto extends UserDto {
    id: string
    firstName: string
    lastName: string | null
    xp: number
    email: string | null
    phoneNumber: string | null
}
