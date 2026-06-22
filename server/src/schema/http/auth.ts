// {"email": "...", "password": "..."}
export interface LoginRequestBody {
    email: string
    password: string
}

// {"firstName": "...", "lastName": "...", "email": "...", "password": "..."}
// {"firstName": "...", "lastName": null,  "email": "...", "password": "..."}
// Либо просто name (в этом случае lastName определяется по пробелу):
// {"name": "...", "email": "...", "password": "..."}
export type RegisterRequestBody = {
    firstName: string
    lastName: string
    email: string
    password: string
} | {
    name: string
    email: string
    password: string
}