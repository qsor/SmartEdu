import {CourseId} from "../schema/types/Course.js";
import {InternalCourse} from "../schema/types/InternalCourse.js";

export class CourseRepository {
    private courses: InternalCourse[] = [
        {
            id: "1",
            title: "TypeScript для нубиков",
            shortDescription: "Изучаем основы TypeScript",
            tags: ["typescript", "backend"],
            lessonsCount: 10,
            rating: 0.9,
        },
        {
            id: "2",
            title: "React",
            shortDescription: "Создание SPA на React",
            tags: ["react", "frontend"],
            lessonsCount: 15,
            rating: 0.8,
        }
    ];

    async getCatalog(): Promise<InternalCourse[]> {
        return this.courses;
    }

    async getById(id: CourseId): Promise<InternalCourse | null> {
        return this.courses.find(c => c.id === id) ?? null;
    }
}