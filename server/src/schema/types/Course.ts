export type CourseId = string;

export type InternalCourse = {
    id: CourseId;
    title: string;
    shortDescription: string;
    tags: string[];
    lessonsCount: number;
    rating: number;
};