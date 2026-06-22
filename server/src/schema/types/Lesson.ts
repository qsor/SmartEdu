// ------ Урок ------

export type LessonId = string

/**
 * Содержит общую информацию об уроке
 */
export interface Lesson {
    id: LessonId

    /**
     * Заголовок урока
     */
    title: string

    /**
     * Короткое описание урока (Что в нём будет, кратко)
     */
    short_description: string

    /**
     * Сколько XP получит пользователь, если пройдёт этот урок
     */
    xp: number

    /**
     * Сколько частей содержит этот урок
     */
    parts: number

    myProgress: MyLessonProgress
}

/**
 * NotCompleted - Текущий пользователь не начал прохождение этого урока
 * InProgress - Текущий пользователь частично прошёл урок
 * Completed - Текущий пользователь полностью прошёл этот урок
 */
export type MyLessonProgress = 'NotCompleted' | 'InProgress' | 'Completed'


// ------ Части урока ------


export type LessonPart = LessonTheoryPart

/**
 * Теоретическая часть урока
 */
export interface LessonTheoryPart {
    type: 'Theory'
    text: string
}

/**
 * Quiz-часть урока. Нужно выбрать ответ на вопрос [questionText] из вариантов ответа [answers].
 */
export interface LessonQuizPart {
    type: 'Quiz'
    questionText: string
    answers: string[]

    /**
     * Ответ текущего пользователя на эту викторину. Либо null, либо один из [answers]
     */
    myAnswer: string | null
}
