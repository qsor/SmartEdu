import {InternalUser} from "../../types/User.js";

export type EditUserResult =
    | { type: 'Success', newUser: InternalUser }
    | { type: 'InvalidUserId' }

export type DeleteUserResult =
    | { type: 'Success' }
    | { type: 'InvalidUserId' }
