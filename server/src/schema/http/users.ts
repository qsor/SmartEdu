
// {"firstName": "new first name"}
// {"lastName": "new last name", "email": "and@new.email"}
export interface EditUserBody {
    firstName?: string
    lastName?: string | null
    email?: string | null
}
