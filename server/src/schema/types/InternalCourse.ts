import {Course, CourseDetails, CourseId, CourseReview} from "./Course.js";
import {InternalLesson, toLesson} from "./InternalLesson.js";
import {LessonId, MyLessonProgress} from "./Lesson.js";

export type InternalCourse = {
    id: CourseId;
    title: string;
    shortDescription: string;
    tags: string[];
    lessonsCount: number;
    rating: number;
};

export interface InternalCourseDetails {
    courseId: CourseId
    lessons: InternalLesson[]
    longDescription: string
    reviews: CourseReview[]
}

export function toCourse(internal: InternalCourse): Course {
    return internal satisfies Course
}

export function toCourseDetails(internal: InternalCourseDetails, options: {
    canReview: boolean,
    myLessonProgresses: Map<LessonId, MyLessonProgress>
}): CourseDetails {
    const lessons = internal.lessons.map(internalLesson =>
        toLesson(internalLesson, {
            myProgress: options.myLessonProgresses.get(internalLesson.id) ?? 'NotCompleted'
        })
    )

    return {...internal, lessons: lessons, canReview: options.canReview} satisfies CourseDetails
}
