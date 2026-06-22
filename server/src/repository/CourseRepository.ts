import {eq} from "drizzle-orm";
import type {NodePgDatabase} from "drizzle-orm/node-postgres";
import {CourseRow, courses} from "../db/schema.js";
import type * as schema from "../db/schema.js";
import {CourseId} from "../schema/types/Course.js";
import {InternalCourse, InternalCourseDetails} from "../schema/types/InternalCourse.js";

export class CourseRepository {
    constructor(
        private readonly db: NodePgDatabase,
    ) {}

    async getCatalog(): Promise<InternalCourse[]> {
        const rows = await this.db.select().from(courses)
        return rows.map(toInternalCourse)
    }

    async getById(id: CourseId): Promise<InternalCourse | null> {
        const [course] = await this.db
            .select()
            .from(courses)
            .where(eq(courses.id, id))
            .limit(1)

        return course ? toInternalCourse(course) : null
    }

    async getDetailsById(id: CourseId): Promise<InternalCourseDetails | null> {
        const course = await this.getById(id)
        if (course === null)
            return null

        return {
            courseId: course.id,
            longDescription: course.shortDescription,
            reviews: [],
            lessons: Array.from({length: course.lessonsCount}, (_, index) => ({
                id: `${course.id}-lesson-${index + 1}`,
                title: `Урок ${index + 1}`,
                short_description: course.shortDescription,
                xp: 10,
                parts: 1,
            })),
        }
    }
}

function toInternalCourse(row: CourseRow): InternalCourse {
    return {
        id: row.id,
        title: row.title,
        shortDescription: row.short_description,
        tags: row.tags,
        lessonsCount: 0, // todo
        rating: row.rating,
    }
}
