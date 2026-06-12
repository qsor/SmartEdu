export type CourseId = string;

export type InternalCourse = {
    id: CourseId;
    title: string;
    shortDescription: string;
    tags: string[];
    lessonsCount: number;
    rating: number;
};

export function toCourse(internalCourse: InternalCourse): Course {
    return internalCourse satisfies Course
}

/**
 * Содержит общую информации о курсе
 */
export interface Course {
    id: CourseId

    /**
     * Название курса
     */
    title: string

    /**
     * Короткое описние курса (для карточки)
     */
    shortDescription: string

    /**
     * Теги курса
     */
    tags: string[]

    /**
     * Общее колличество уроков в этом курсе
     */
    lessonsCount: number

    /**
     * Плавающее число от 0 до 1.
     * (На клиенте можно отображать 5 звезд: добавлять одну звёздочку за каждые 0.2 рейтинга)
     */
    rating: number
}

/**
 * Содержит полную информацию о курсе (для страницы курса)
 */
export interface CourseDetails {
    courseId: CourseId

    /**
     * Полный список уроков в этом курсе
     */
    lessons: Lesson[]

    /**
     * Длинное описание курса на странице курса
     */
    long_description: string

    reviews: CourseReview[]

    /**
     * Может ли текущий пользователь оставить отзыв на этот курс?
     * Обычно true только для тех, кто прошёл курс.
     * Но также, например, может быть true для админов, даже если они не прошли курс.
     * (Если true, то на странице курса нужно отобразить возможность оставить отзыв)
     */
    canReview: boolean
}

/**
 * Отзыв на курс (Отображается на странице курса)
 */
export interface CourseReview {
    /**
     * Кто оставил отзыв? Например: Иван Иванов
     */
    authorName: string

    /**
     * Текст отзыва
     */
    text: string

    /**
     * Плавающее число от 0 до 1.
     * (На клиенте можно отображать 5 звезд: добавлять одну звёздочку за каждые 0.2 рейтинга)
     */
    rating: number
}

/**
 * Содержит общую информацию об уроке
 */
export interface Lesson {
    id: string

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
     * Прогресс текущего пользователя в этом уроке
     */
    myProgress: MyLessonProgress
}

/**
 * NotCompleted - Текущий пользователь не начал прохождение этого урока
 * InProgress - Текущий пользователь частично прошёл урок
 * Completed - Текущий пользователь полностью прошёл этот урок
 */
export type MyLessonProgress = 'NotCompleted' | 'InProgress' | 'Completed'
