import {EditUserResult, User, UserId} from "../domain/index.js";
import {UserRepository} from "../repository/index.js";

export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async getUser(id: UserId): Promise<User | null> {
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
