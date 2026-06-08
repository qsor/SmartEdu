import React from "react";
import { Sidebar } from "../components/Sidebar";
import ProgressCourseCard from "../components/ProgressCourseCard";
import Header from "@/components/Header";
import styles from "../styles/progress/ProgressPage.module.css";
interface Course {
  id: number;
  title: string;
  progress: number;
}

const ProgressPage: React.FC = ({}) => {
  const name = "NoName";
  // Данные пользователя (позже из Redux/API)
  const mainCourse: Course = {
    id: 0,
    title: "Тестовый курс",
    progress: 80,
  };

  const myCourses: Course[] = [
    { id: 1, title: "Курс 1", progress: 50 },
    { id: 2, title: "Название курса", progress: 75 },
    { id: 3, title: "JavaScript Pro", progress: 30 },
    { id: 4, title: "TypeScript Pro", progress: 30 },
  ];

  return (
    <div className={styles.pageContainer}>
      <Sidebar />

      <div className={styles.mainLayout}>
        <Header />
        <main className={styles.mainContent}>
          <h2 className={styles.welcomeTitle}>
            Привет, {name}!
          </h2>

          <section>
            <h3 className={styles.sectionTitle}>Продолжить курс</h3>
            <ProgressCourseCard
              key={mainCourse.id}
              title={mainCourse.title}
              progress={mainCourse.progress}
              isMain={true}
            />
          </section>

          <section>
            <h3 className={styles.sectionTitleWithMargin}>Мои курсы</h3>
            <div className={styles.coursesGrid}>
              {myCourses.map((course) => (
                <ProgressCourseCard
                  key={course.id}
                  title={course.title}
                  progress={course.progress}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProgressPage;