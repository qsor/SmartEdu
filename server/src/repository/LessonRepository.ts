import {asc, eq} from "drizzle-orm";
import type {NodePgDatabase} from "drizzle-orm/node-postgres";
import {LessonRow, lessons} from "../db/schema.js";
import {CourseId} from "../schema/types/Course.js";
import {InternalLesson} from "../schema/types/InternalLesson.js";

export class LessonRepository {
    constructor(
        private readonly db: NodePgDatabase,
    ) {}

    async getByCourseId(courseId: CourseId): Promise<InternalLesson[]> {
        const rows = await this.db
            .select()
            .from(lessons)
            .where(eq(lessons.course, courseId))
            .orderBy(asc(lessons.course_order))

        return rows.map(toInternalLesson)
    }
}

function toInternalLesson(row: LessonRow): InternalLesson {
    return {
        id: row.id,
        title: row.title,
        short_description: row.short_description,
        xp: row.xp,
        parts: 1,
    }
}
