import { Router } from "express";
import { CourseService } from "../service/CourseService.js";

export function courseRoutes(
    router: Router,
    courseService: CourseService
) {
    router.get("/course/catalog", async (_req, res) => {
        const courses = await courseService.getCatalog();

        return res.status(200).json(courses);
    });

    router.get("/course/:id", async (req, res) => {
        const course = await courseService.getCourseById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.json(course);
    });
}