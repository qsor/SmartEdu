import {Response, Router} from "express";
import {toMyselfUser, toOtherUser, User, UserId} from "../schema/types/User.js";
import {AuthService} from "../service/AuthService.js";
import {UserService} from "../service/UserService.js";

export function userRoutes(
    router: Router,
    authService: AuthService,
    userService: UserService,
) {
    router.get('/user/:id', async (req, res: Response<User>) => {
        const id: UserId = req.params.id
        const user = await userService.getUser(id)

        if (user === null) {
            return res.status(404).send()
        }

        const isMyself = req.actor.userId === user.id

        if (isMyself) {
            return res.status(200).send(toMyselfUser(user))
        } else {
            return res.status(200).send(toOtherUser(user))
        }
    })
}
