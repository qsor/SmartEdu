import {InternalUser, MyselfUser, User} from "../types/User.js";

export type GetUserResult =
    | { type: 'Success', user: User }
    | { type: 'InvalidUserId' }

export type EditUserResult =
    | { type: 'Success', user: MyselfUser }
    | { type: 'InvalidUserId' }

export type DeleteUserResult =
    | { type: 'Success' }
    | { type: 'InvalidUserId' }
