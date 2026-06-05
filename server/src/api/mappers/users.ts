import {User} from "../../domain/index.js";
import {MyselfDto, UserDto} from "../types/users.js";

export function toUserDto(user: User): UserDto {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
    }
}

export function toMyselfDto(user: User): MyselfDto {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
    }
}
