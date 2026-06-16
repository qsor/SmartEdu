import {Lesson, LessonId, LessonQuizPart, LessonTheoryPart, MyLessonProgress} from "./Lesson.js";

// ------ Урок ------

export interface InternalLesson {
    id: LessonId
    title: string
    short_description: string
    xp: number
    parts: number
}

// ------ Части урока ------

export type InternalLessonPart = InternalLessonTheoryPart | InternalLessonQuizPart

export interface InternalLessonTheoryPart {
    type: 'Theory'
    text: string
}

export interface InternalLessonQuizPart {
    type: 'Quiz'
    questionText: string
    answers: string[]
}

// ------ Мапперы ------

export function toLesson(internal: InternalLesson, options: {
    myProgress: MyLessonProgress
}): Lesson {
    return {...internal, myProgress: options.myProgress} satisfies Lesson
}

export function toLessonTheoryPart(internal: InternalLessonTheoryPart): LessonTheoryPart {
    return internal satisfies LessonTheoryPart
}

export function toLessonQuizPart(internal: InternalLessonQuizPart, options: {
    myAnswer: string | null
}): LessonQuizPart {
    return {...internal, myAnswer: options.myAnswer}
}
