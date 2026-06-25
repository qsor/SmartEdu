import { UserId } from "../schema/types/User.js";
import { CourseId } from "../schema/types/Course.js";

export class EnrollmentRepository {
    private enrollments: {
        userId: UserId
        courseId: CourseId
    }[] = []

    async isJoined(
        userId: UserId,
        courseId: CourseId,
    ): Promise<boolean> {
        return this.enrollments.some(
            e => e.userId === userId && e.courseId === courseId
        )
    }

    async joinCourse(
        userId: UserId,
        courseId: CourseId,
    ): Promise<void> {
        this.enrollments.push({
            userId,
            courseId,
        })
    }

    async getJoinedCourseIds(
        userId: UserId,
    ): Promise<CourseId[]> {
        return this.enrollments
            .filter(e => e.userId === userId)
            .map(e => e.courseId)
    }
}
