import {Course, CourseDetails, CourseId, CourseReview} from "./Course.js";
import {InternalLesson} from "./InternalLesson.js";

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
    canReview: boolean
}): CourseDetails {
    return {...internal, canReview: options.canReview} satisfies CourseDetails
}
