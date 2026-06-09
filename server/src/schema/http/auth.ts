export interface LoginRequestBody {
    email: string
    password: string
}

export interface RegisterRequestBody {
    firstName: string
    lastName: string | null
    email: string
    password: string
}
