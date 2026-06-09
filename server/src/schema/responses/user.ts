import {MyselfUser} from "../types/User.js";

export type EditUserResponse =
    | { status: 'Success', myself: MyselfUser }
    | { status: 'InvalidFirstName', reason: 'TooShort' | 'TooLong' }
    | { status: 'InvalidLastName', reason: 'TooShort' | 'TooLong' }
    | { status: 'InvalidEmail' }
    | { status: 'EmailAlreadyTaken' }
