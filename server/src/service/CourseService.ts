import { CourseRepository } from "../repository/CourseRepository.js";
import {CourseDetails, CourseId, InternalCourse} from "../schema/types/Course.js";
import {UserId} from "../schema/types/User.js";

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

    async getCourseDetails(forUser: UserId | null, id: CourseId): Promise<CourseDetails | null> {
        // todo
        throw new Error('Not yet implemented')
    }
}