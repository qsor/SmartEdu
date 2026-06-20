import { CourseRepository } from "../repository/CourseRepository.js";
import {CourseDetails, CourseId} from "../schema/types/Course.js";
import {UserId} from "../schema/types/User.js";
import {InternalCourse, toCourseDetails} from "../schema/types/InternalCourse.js";

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
        const courseDetails = await this.courseRepository.getDetailsById(id)
        if (courseDetails === null)
            return null

        return toCourseDetails(courseDetails, {
            canReview: false,
            myLessonProgresses: new Map(),
        })
    }
}
