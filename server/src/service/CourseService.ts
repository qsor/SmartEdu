import { CourseRepository } from "../repository/CourseRepository.js";
import { InternalCourse } from "../schema/types/Course.js";

export class CourseService {
    constructor(
        private readonly courseRepository: CourseRepository
    ) { }

    async getCatalog(): Promise<InternalCourse[]> {
        // ...
        return this.courseRepository.getCatalog();
    }

    async getCourseById(id: string): Promise<InternalCourse | null> {
        return this.courseRepository.getById(id);
    }
}