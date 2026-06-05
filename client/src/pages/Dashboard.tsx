<<<<<<< HEAD
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export function Dashboard() {
  return (
    <div className="h-screen overflow-hidden">
      <Sidebar />

      <div className="ml-[230px] flex h-screen flex-col">
        <Header />
        <main></main>
      </div>
    </div>
  );
}
=======
import React from 'react';
import DashboardCourseCard from '../components/DashboardCourseCard';

interface Course {
  id: number;
  title: string;
  progress: number;
}

const Dashboard: React.FC = () => {
  // Данные пользователя (позже из Redux/API)
  const myCourses: Course[] = [
    { id: 1, title: "Курс 1", progress: 50 },
    { id: 2, title: "Название курса", progress: 75 },
    { id: 3, title: "JavaScript Pro", progress: 30 }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Мои курсы</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCourses.map(course => (
          <DashboardCourseCard
            key={course.id}
            title={course.title}
            progress={course.progress}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
>>>>>>> 375dce9 (Компоненты карточек курсов, прогресс бар, звёздный рейтинг)
