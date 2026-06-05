import {MyselfDto, UserDto} from "../index.js";

export type GetUserResponse =
    | { type: 'Success', isMyself: false, user: UserDto }
    | { type: 'Success', isMyself: true, user: MyselfDto }
    | { type: 'InvalidUserId' }
