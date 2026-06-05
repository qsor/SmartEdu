
export interface UserDto {
    id: string
    firstName: string
    lastName: string | null
}

export interface MyselfDto extends UserDto {
    id: string
    firstName: string
    lastName: string | null
    email: string | null
    phoneNumber: string | null
}
