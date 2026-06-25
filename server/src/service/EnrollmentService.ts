import { EnrollmentRepository } from "../repository/EnrollmentRepository.js";
import { CourseRepository } from "../repository/CourseRepository.js";
import { UserId } from "../schema/types/User.js";
import { CourseId } from "../schema/types/Course.js";
import { InternalCourse } from "../schema/types/InternalCourse.js";

export class EnrollmentService {
    constructor(
        private readonly enrollmentRepository: EnrollmentRepository,
        private readonly courseRepository: CourseRepository,
    ) { }

    async joinCourse(
        userId: UserId,
        courseId: CourseId,
    ): Promise<
        | { status: "Success" }
        | { status: "AlreadyJoined" }
        | { status: "CourseNotFound" }
    > {
        const course = await this.courseRepository.getById(courseId);

        if (course === null) {
            return { status: "CourseNotFound" };
        }

        const alreadyJoined =
            await this.enrollmentRepository.isJoined(
                userId,
                courseId,
            );

        if (alreadyJoined) {
            return { status: "AlreadyJoined" };
        }

        await this.enrollmentRepository.joinCourse(
            userId,
            courseId,
        );

        return { status: "Success" };
    }

    async getMyCourses(
        userId: UserId,
    ): Promise<InternalCourse[]> {
        const ids =
            await this.enrollmentRepository.getJoinedCourseIds(
                userId,
            );

        const courses = await Promise.all(
            ids.map(id =>
                this.courseRepository.getById(id),
            ),
        );

        return courses.filter(
            (course): course is InternalCourse =>
                course !== null,
        );
    }
}