import React from "react";
import ProgressCourseCard from "../components/ProgressCourseCard";

interface Course {
  id: number;
  title: string;
  progress: number;
}

const ProgressPage: React.FC = () => {
  const name = "NoName";
  
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
    <div className="w-full pt-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Привет, {name}!
      </h2>

      {/* Секция: Продолжить курс */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Продолжить курс</h3>
        <div className="w-full">
          <ProgressCourseCard
            key={mainCourse.id}
            title={mainCourse.title}
            progress={mainCourse.progress}
            isMain={true}
          />
        </div>
      </section>

      {/* Секция: Мои курсы */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Мои курсы</h3>
        {/* 
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 w-full">
          {myCourses.map((course) => (
            <ProgressCourseCard
              key={course.id}
              title={course.title}
              progress={course.progress}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProgressPage;