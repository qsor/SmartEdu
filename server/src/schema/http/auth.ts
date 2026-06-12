// {"email": "...", "password": "..."}
export interface LoginRequestBody {
    email: string
    password: string
}

// {"firstName": "...", "lastName": "...", "email": "...", "password": "..."}
// {"firstName": "...", "lastName": null,  "email": "...", "password": "..."}
export interface RegisterRequestBody {
    firstName: string
    lastName: string | null
    email: string
    password: string
}
