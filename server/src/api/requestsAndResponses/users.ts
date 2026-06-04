import {MyselfDto, UserDto} from "../types/users.js";

export type GetUserResponse =
    | { type: 'Success', isMyself: false, user: UserDto }
    | { type: 'Success', isMyself: true, user: MyselfDto }
    | { type: 'InvalidUserId' }
