import {User} from "../types/users.js";

export type EditUserResult =
    | { type: 'Success', newUser: User }
    | { type: 'InvalidUserId' }

export type DeleteUserResult =
    | { type: 'Success' }
    | { type: 'InvalidUserId' }
