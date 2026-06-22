import type { Topic } from "@/types/coursePass";

export const mockTopic: Topic = {
  id: "typescript-types",
  courseTitle: "TypeScript с нуля",
  title: "Типы и интерфейсы",
  description:
    "Разберемся, как TypeScript описывает данные и помогает находить ошибки до запуска программы.",
  durationMinutes: 18,
  theory: [
    {
      title: "Зачем нужны типы",
      paragraphs: [
        "JavaScript позволяет переменной менять тип значения во время работы программы. Это удобно, но часть ошибок становится заметна только при запуске.",
        "TypeScript добавляет статическую проверку. Редактор и компилятор заранее знают, какие значения ожидает функция, из каких полей состоит объект и что она должна вернуть.",
      ],
      note: "Типы существуют во время разработки и не попадают в итоговый JavaScript-код.",
    },
    {
      title: "Базовые типы",
      paragraphs: [
        "Для строк используется string, для чисел — number, а для логических значений — boolean. Тип массива можно записать как string[] или Array<string>.",
        "Чаще всего TypeScript сам выводит тип из присвоенного значения. Явную аннотацию стоит добавлять там, где она делает контракт кода понятнее.",
      ],
      code: `const courseName: string = "TypeScript с нуля";
const lessonNumber: number = 3;
const isCompleted: boolean = false;
const tags: string[] = ["frontend", "types"];`,
    },
    {
      title: "Интерфейсы",
      paragraphs: [
        "Интерфейс описывает форму объекта. Он фиксирует обязательные поля и их типы, поэтому один контракт можно безопасно использовать в компонентах, функциях и ответах API.",
      ],
      code: `interface Student {
  id: number;
  name: string;
  completedLessons: number;
}

const student: Student = {
  id: 7,
  name: "Алексей",
  completedLessons: 12,
};`,
    },
  ],
  questions: [
    {
      id: "question-1",
      text: "Какой тип подходит для значения true или false?",
      answers: [
        { id: "answer-1-1", text: "string", isCorrect: false },
        { id: "answer-1-2", text: "boolean", isCorrect: true },
        { id: "answer-1-3", text: "number", isCorrect: false },
      ],
    },
    {
      id: "question-2",
      text: "Что описывает интерфейс в TypeScript?",
      answers: [
        {
          id: "answer-2-1",
          text: "Форму объекта и типы его полей",
          isCorrect: true,
        },
        {
          id: "answer-2-2",
          text: "Последовательность выполнения программы",
          isCorrect: false,
        },
        {
          id: "answer-2-3",
          text: "Стили HTML-элемента",
          isCorrect: false,
        },
      ],
    },
    {
      id: "question-3",
      text: "Какая запись корректно описывает массив строк?",
      answers: [
        { id: "answer-3-1", text: "string[]", isCorrect: true },
        { id: "answer-3-2", text: "string{}", isCorrect: false },
        { id: "answer-3-3", text: "[string, number]", isCorrect: false },
      ],
    },
  ],
};
