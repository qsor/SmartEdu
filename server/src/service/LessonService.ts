import { LessonRepository } from "../repository/LessonRepository.js";
import { CourseId } from "../schema/types/Course.js";
import { InternalLesson } from "../schema/types/InternalLesson.js";
import {LessonId, MyLessonProgress} from "../schema/types/Lesson.js";
import {UserId} from "../schema/types/User.js";

export class LessonService {
    constructor(
        private readonly lessonRepository: LessonRepository,
    ) { }

    async getMyProgress(userId: UserId, lessonId: LessonId): Promise<MyLessonProgress> {
        // todo заглушка. Все уроки пока считаются NotCompleted
        return 'NotCompleted'
    }

    async getByCourseId(courseId: CourseId): Promise<InternalLesson[]> {
        return this.lessonRepository.getByCourseId(courseId)
    }
}
