import { useState, useRef, useEffect } from "react";
import type { Topic } from "@/types/coursePass";
import styles from "@/styles/CoursePassPage.module.css";
import { useNavigate } from "react-router-dom";

interface QuizBlockProps {
  topic: Topic;
}

export default function QuizBlock({ topic }: QuizBlockProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const navigate = useNavigate();
  
  const resultRef = useRef<HTMLElement>(null);

  const answeredCount = Object.keys(selectedAnswers).length;
  const isQuizComplete = answeredCount === topic.questions.length;

  useEffect(() => {
    if (score !== null && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [score]);

  const selectAnswer = (questionId: string, answerId: string) => {
    setSelectedAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: answerId,
    }));
    setScore(null);
  };

  const finishLesson = () => {
      const correctAnswers = topic.questions.filter((question) =>
        question.answers.some(
          (answer) =>
            answer.id === selectedAnswers[question.id] && answer.isCorrect,
        ),
      ).length;

      setScore(correctAnswers);

      if (correctAnswers === topic.questions.length) {
        const completedLessons = JSON.parse(localStorage.getItem('completed_lessons') || '[]');
        if (!completedLessons.includes(topic.id)) {
          completedLessons.push(topic.id);
          localStorage.setItem('completed_lessons', JSON.stringify(completedLessons));
        }
        
        const enrolledCourses = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
        if (!enrolledCourses.includes(0)) {
          enrolledCourses.push(0);
          localStorage.setItem('enrolled_courses', JSON.stringify(enrolledCourses));
        }
      }
    };

  return (
    <section className={styles.lessonShell}>
      <header className={styles.quizHeader}>
        <div>
          <p className={styles.eyebrow}>{topic.courseTitle}</p>
          <h1 className={styles.title}>Проверка знаний</h1>
          <p className={styles.description}>
            Выберите один ответ в каждом вопросе. Результат появится после завершения урока.
          </p>
        </div>
        <div className={styles.quizProgress} aria-live="polite">
          <strong>{answeredCount}/{topic.questions.length}</strong>
          <span>ответов выбрано</span>
        </div>
      </header>

      <div className={styles.modeBar}>
        <span className={styles.modeStep}>01 Теория</span>
        <span className={styles.modeStepActive}>02 Проверка знаний</span>
      </div>

      <form className={styles.quizForm}>
        {topic.questions.map((question, questionIndex) => (
          <fieldset className={styles.question} key={question.id}>
            <legend>
              <span>Вопрос {questionIndex + 1}</span>
              {question.text}
            </legend>
            <div className={styles.answers}>
              {question.answers.map((answer, answerIndex) => {
                const isSelected = selectedAnswers[question.id] === answer.id;
                return (
                  <label
                    className={`${styles.answer} ${isSelected ? styles.answerSelected : ""}`}
                    key={answer.id}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={answer.id}
                      checked={isSelected}
                      onChange={() => selectAnswer(question.id, answer.id)}
                    />
                    <span className={styles.answerMarker}>
                      {String.fromCharCode(65 + answerIndex)}
                    </span>
                    <span>{answer.text}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}

        <div className={styles.quizFooter}>
          <p>
            {isQuizComplete
              ? "Все готово — можно завершать урок."
              : `Осталось ответить: ${topic.questions.length - answeredCount}`}
          </p>
          <button
            className={styles.primaryButton}
            type="button"
            disabled={!isQuizComplete}
            onClick={finishLesson}
          >
            Завершить урок
          </button>
        </div>
      </form>

      {score !== null && (
        <section ref={resultRef} className={styles.result} aria-live="polite">
          <div className={styles.resultSummary}>
            <div>
              <span className={styles.footerLabel}>Урок завершен</span>
              <h2>Результат: {score} из {topic.questions.length}</h2>
              <p style={{ marginBottom: '16px' }}>
                {score === topic.questions.length
                  ? "Отлично! Все ответы правильные."
                  : "Урок пройден не полностью. Можно вернуться к теории и повторить материал."}
              </p>
              
              {score === topic.questions.length && (
                <button
                  className={styles.primaryButton}
                  type="button"
                  onClick={() => navigate('/progress')}
                >
                  Вернуться в Мои курсы
                </button>
              )}
            </div>
            <span className={styles.score}>
              {Math.round((score / topic.questions.length) * 100)}%
            </span>
          </div>
        </section>
      )}
    </section>
  );
}