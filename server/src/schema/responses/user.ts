import {MyselfUser} from "../types/User.js";

// {"status": "Success", myself: {...}}
// {"status": "InvalidFirstName", reason: "TooShort"}
// {"status": "InvalidLastName", reason: "TooLong"}
// {"status": "InvalidEmail"}
// {"status": "EmailAlreadyTaken"}
export type EditUserResponse =
    | { status: 'Success', myself: MyselfUser }
    | { status: 'InvalidFirstName', reason: 'TooShort' | 'TooLong' }
    | { status: 'InvalidLastName', reason: 'TooShort' | 'TooLong' }
    | { status: 'InvalidEmail' }
    | { status: 'EmailAlreadyTaken' }
