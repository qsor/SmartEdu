import {User} from "../../domain/index.js";
import {MyselfDto, UserDto} from "../index.js";

export function toUserDto(user: User): UserDto {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        xp: 0,
    }
}

export function toMyselfDto(user: User): MyselfDto {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        xp: 0,
        email: user.email,
        phoneNumber: user.phoneNumber,
    }
}
