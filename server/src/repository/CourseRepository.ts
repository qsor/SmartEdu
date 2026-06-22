import {desc, eq, sql} from "drizzle-orm";
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

    async search(searchQuery: string): Promise<InternalCourse[]> {
        // Совпадения меньше этого значения отсекаются (Можно изменять, подбирать наилучшее значение)
        const relevantThreshold = 0.2

        // Текстовый поиск. Результат отсортирован по наилучшему совпадению.
        // Приоритет по совпаданию такой: сначала лучшее совпадение по title, затем по tags, затем по short_description.
        const searchScore = sql<number>`
            (word_similarity(${searchQuery}, ${courses.title}) * 3) +
            (word_similarity(${searchQuery}, array_to_string(${courses.tags}, ' ')) * 2) +
            (word_similarity(${searchQuery}, ${courses.short_description}) * 1)
        `

        const results = await this.db
            .select({
                id: courses.id,
                title: courses.title,
                tags: courses.tags,
                short_description: courses.short_description,
                rating: courses.rating,
                score: searchScore,
            })
            .from(courses)
            .where(sql`${searchScore} >= ${relevantThreshold}`)
            .orderBy(desc(searchScore))

        return results.map(row => toInternalCourse(row))
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
