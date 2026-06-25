import { Request, Response, Router } from "express";
import { toMyselfUser, toOtherUser, User, UserId } from "../schema/types/User.js";
import { AuthService } from "../service/AuthService.js";
import { UserService } from "../service/UserService.js";
import { EnrollmentService } from "../service/EnrollmentService.js";
import { toCourse } from "../schema/types/InternalCourse.js";
import { EditUserBody } from "../schema/http/users.js";

export function userRoutes(
    router: Router,
    authService: AuthService,
    userService: UserService,
    enrollmentService: EnrollmentService,
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

    router.patch('/user', async (req: Request<EditUserBody>, res: Response) => {
        if (!req.actor.isAuthenticated)
            return res.status(401).send()

        const response = await userService.editUser(req.actor, req.body)

        if (response.status === 'Success') {
            return res.status(200).send(response)
        } else {
            // InvalidFirstName, InvalidLastName, ...
            return res.status(400).send(response)
        }
    })

    router.get(
        "/users/me/courses",
        async (req, res) => {
            if (!req.actor.isAuthenticated) {
                return res.status(401).send()
            }

            const courses =
                await enrollmentService.getMyCourses(
                    req.actor.userId
                )

            return res.status(200).json(
                courses.map(toCourse)
            )
        }
    )
}
