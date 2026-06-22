import type { Topic } from "@/types/coursePass";
import styles from "@/styles/CoursePassPage.module.css";

interface TheoryBlockProps {
  topic: Topic;
  onStartQuiz: () => void;
}

export default function TheoryBlock({
  topic,
  onStartQuiz,
}: TheoryBlockProps) {
  return (
    <article className={styles.lessonShell}>
      <header className={styles.lessonHeader}>
        <div>
          <p className={styles.eyebrow}>{topic.courseTitle}</p>
          <h1 className={styles.title}>{topic.title}</h1>
          <p className={styles.description}>{topic.description}</p>
        </div>

        <div className={styles.lessonMeta} aria-label="Информация об уроке">
          <span>Урок 3</span>
          <span>{topic.durationMinutes} минут</span>
        </div>
      </header>

      <div className={styles.modeBar}>
        <span className={styles.modeStepActive}>01 Теория</span>
        <span className={styles.modeStep}>02 Проверка знаний</span>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.theoryContent}>
          {topic.theory.map((section) => (
            <section className={styles.theorySection} key={section.title}>
              <h2>{section.title}</h2>

              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {section.code && (
                <pre className={styles.codeBlock}>
                  <code>{section.code}</code>
                </pre>
              )}

              {section.note && (
                <aside className={styles.note}>
                  <strong>Обратите внимание</strong>
                  <p>{section.note}</p>
                </aside>
              )}
            </section>
          ))}
        </div>

        <aside className={styles.lessonOutline}>
          <p className={styles.outlineTitle}>В этом уроке</p>
          <ol>
            {topic.theory.map((section, index) => (
              <li key={section.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </li>
            ))}
          </ol>
        </aside>
      </div>

      <footer className={styles.lessonFooter}>
        <div>
          <span className={styles.footerLabel}>Следующий этап</span>
          <strong>{topic.questions.length} вопроса по материалу</strong>
        </div>
        <button
          className={styles.primaryButton}
          type="button"
          onClick={onStartQuiz}
        >
          Перейти к тесту
          <span aria-hidden="true">→</span>
        </button>
      </footer>
    </article>
  );
}
