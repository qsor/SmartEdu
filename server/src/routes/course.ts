import { Router } from "express";
import { CourseService } from "../service/CourseService.js";
import { EnrollmentService } from "../service/EnrollmentService.js";
import { toCourse } from "../schema/types/InternalCourse.js";

export function courseRoutes(
    router: Router,
    courseService: CourseService,
    enrollmentService: EnrollmentService,
) {
    router.get("/course/catalog", async (_req, res) => {
        const courses = (await courseService.getCatalog())
            .map(internalCourse => toCourse(internalCourse))

        return res.status(200).json(courses);
    });

    router.get("/course/:id", async (req, res) => {
        const course = await courseService.getCourseById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.json(toCourse(course));
    });

    router.get("/course/catalog/search", async (req, res) => {
        const { q } = req.query
        const searchQuery = q?.toString()?.trim()

        // Если запрос пустой, вернуть весь каналог
        if (!searchQuery || searchQuery === '') {
            const courses = (await courseService.getCatalog())
                .map(internalCourse => toCourse(internalCourse))

            return res.status(200).json(courses);
        }

        const searchResults = (await courseService.search(searchQuery))
            .map(internalCourse => toCourse(internalCourse))

        return res.status(200).json(searchResults)
    })

    router.post("/course/:id/join", async (req, res) => {
        if (!req.actor.isAuthenticated) {
            return res.status(401).send({
                message: "Unauthorized",
            });
        }

        const result = await enrollmentService.joinCourse(
            req.actor.userId,
            req.params.id,
        );

        if (result.status === "CourseNotFound") {
            return res.status(404).send({
                message: "Course not found",
            });
        }

        if (result.status === "AlreadyJoined") {
            return res.status(409).send({
                message: "Already joined",
            });
        }

        return res.status(200).send({
            status: "Success",
        });
    });
}
