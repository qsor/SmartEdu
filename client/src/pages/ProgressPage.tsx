import React, { useEffect, useState } from "react";
import ProgressCourseCard from "../components/ProgressCourseCard";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface Course {
  id: number | string;
  title: string;
  progress: number;
}

const ProgressPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const name = user?.firstName || "Студент";
  
  const [myCourses, setMyCourses] = useState<Course[]>([]);

  useEffect(() => {
    const allAvailableCourses: Record<string | number, string> = {
      'test-free-course-1': "Тестовый бесплатный курс",
      1: "Основы React",
      2: "TypeScript с нуля",
      3: "Node.js и Express",
      4: "Docker для разработчиков",
      5: "PostgreSQL на практике",
      6: "Tailwind CSS"
    };

    const enrolledIds: Array<string | number> = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
    const completedLessons: string[] = JSON.parse(localStorage.getItem('completed_lessons') || '[]');

    const enrolledCoursesData: Course[] = enrolledIds.map((id) => {
      let currentProgress = 0;

      if (id === 'test-free-course-1') {
        if (completedLessons.includes('typescript-types')) {
          currentProgress = 100;
        } else {
          currentProgress = 10; 
        }
      }

      return {
        id: id,
        title: allAvailableCourses[id] || `Курс ${id}`,
        progress: currentProgress
      };
    });

    setMyCourses(enrolledCoursesData);
  }, []);

  const hasCourses = myCourses.length > 0;

  return (
    <div className="w-full pt-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Привет, {name}!
      </h2>

      <section className="mb-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Продолжить курс</h3>
        <div className="w-full">
          {hasCourses ? (
            <ProgressCourseCard
              key={`main-${myCourses[0].id}`}
              title={myCourses[0].title}
              progress={myCourses[0].progress}
              isMain={true}
              onContinue={() => navigate(`/course/${myCourses[0].id}/lesson/typescript-types`)}
            />
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500 shadow-sm w-full max-w-md">
              <p className="text-base font-medium">У тебя пока нет активных курсов.</p>
              <p className="text-sm text-gray-400 mt-1">Загляни в каталог и начни обучение!</p>
            </div>
          )}
        </div>
      </section>

      {hasCourses && (
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Мои курсы</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 w-full">
            {myCourses.map((course) => (
              <ProgressCourseCard
                key={course.id}
                title={course.title}
                progress={course.progress}
                onContinue={() => navigate(`/course/${course.id}/lesson/typescript-types`)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProgressPage;