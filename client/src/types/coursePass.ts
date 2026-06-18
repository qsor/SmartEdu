export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

export interface Topic {
  id: string;
  courseTitle: string;
  title: string;
  description: string;
  durationMinutes: number;
  theory: Array<{
    title: string;
    paragraphs: string[];
    code?: string;
    note?: string;
  }>;
  questions: Question[];
}
