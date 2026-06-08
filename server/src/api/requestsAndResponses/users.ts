import {User} from "../../types/User.js";

export type GetUserResponse =
    | { type: 'Success', user: User }
    | { type: 'InvalidUserId' }
