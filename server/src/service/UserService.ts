import {InternalUser, toMyselfUser, UserId} from "../schema/types/User.js";
import {UserRepository} from "../repository/UserRepository.js";
import {Actor, UserActor} from "../schema/types/JWT.js";
import {EditUserResponse} from "../schema/responses/user.js";
import {emailRegex} from "../shared/index.js";
import {EditUserBody} from "../schema/http/users.js";

export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async getUser(id: UserId): Promise<InternalUser | null> {
        return await this.userRepository.getUser(id)
    }

    async editUser(actor: UserActor, fields: EditUserBody): Promise<EditUserResponse> {
        if (fields.email) {
            if (!emailRegex.test(fields.email)) {
                return {status: 'InvalidEmail'}
            }
        }

        return await this.userRepository.editUser(actor.userId, fields)
    }
}
