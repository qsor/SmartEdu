import { useState } from "react";
import TheoryBlock from "@/components/course-pass/TheoryBlock";
import QuizBlock from "@/components/course-pass/QuizBlock";
import { mockTopic } from "@/mocks/courseLesson";

type LessonMode = "reading" | "testing";

export default function CoursePassPage() {
  const [mode, setMode] = useState<LessonMode>("reading");

  return mode === "reading" ? (
    <TheoryBlock topic={mockTopic} onStartQuiz={() => setMode("testing")} />
  ) : (
    <QuizBlock topic={mockTopic} />
  );
}
