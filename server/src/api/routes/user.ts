import {Response, Router} from "express";
import {AuthService, UserService} from "../../service/index.js";
import {UserId} from "../../domain/index.js";
import {GetUserResponse} from "../requestsAndResponses/users.js";
import {toMyselfDto, toUserDto} from "../mappers/users.js";

export function userRoutes(
    router: Router,
    authService: AuthService,
    userService: UserService,
) {
    router.get('/user/:id', async (req, res: Response<GetUserResponse>) => {
        const id: UserId = req.params.id
        const user = await userService.getUser(id)

        if (user === null) {
            return res.status(404).send({type: 'InvalidUserId'})
        }

        const isMyself = req.actor.userId === user.id

        if (isMyself) {
            return res.status(200).send({
                type: 'Success',
                isMyself: true,
                user: toMyselfDto(user),
            })
        }

        return res.status(200).send({
            type: 'Success',
            isMyself: false,
            user: toUserDto(user),
        })
    })
}
