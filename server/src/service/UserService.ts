import {InternalUser, UserId} from "../schema/types/User.js";
import {UserRepository} from "../repository/UserRepository.js";

export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async getUser(id: UserId): Promise<InternalUser | null> {
        return await this.userRepository.getUser(id)
    }

    // async editUser(actor: Actor, fields: {
    //     firstName?: string
    //     lastName?: string | null
    //     email?: string | null
    // }): Promise<EditUserResult> {
    //     return await this.userRepository.editUser(id, fields)
    // }
}
