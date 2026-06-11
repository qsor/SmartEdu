import { useEffect, useState } from 'react';

import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import CatalogCourseCard from '../components/CatalogCourseCard';

// Мок
const mockCourses = [
  {
    id: 1,
    title: 'Основы React',
    description:
      'Полный курс по React для начинающих. Изучите хуки, контекст и маршрутизацию.',
    rating: 4.5,
    price: 2990,
  },
  {
    id: 2,
    title: 'TypeScript с нуля',
    description:
      'Научитесь писать типобезопасный код. Интерфейсы, дженерики и утилитарные типы.',
    rating: 5.0,
    price: 3500,
  },
  {
    id: 3,
    title: 'Node.js и Express',
    description:
      'Создание REST API на Node.js. Работа с базами данных и аутентификация.',
    rating: 4.8,
    price: 4200,
  },
  {
    id: 4,
    title: 'Docker для разработчиков',
    description:
      'Контейнеризация приложений. Docker Compose, сети и тома.',
    rating: 4.2,
    price: 1990,
  },
  {
    id: 5,
    title: 'PostgreSQL на практике',
    description:
      'Проектирование баз данных, сложные запросы и оптимизация производительности.',
    rating: 4.7,
    price: 3100,
  },
  {
    id: 6,
    title: 'Tailwind CSS',
    description:
      'Быстрая и красивая верстка с использованием utility-first CSS фреймворка.',
    rating: 4.9,
    price: 1500,
  },
];

interface Course {
  id: number;
  title: string;
  description: string;
  rating: number;
  price: number;
}

export default function CatalogPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setCourses(mockCourses);
  }, []);

  const handleCardClick = (courseTitle: string) => {
    console.log(`Клик по курсу: ${courseTitle}`);
    // Здесь позже будет переход на страницу курса
  };

  return (
    <>
      {/* Боковая панель */}
      <Sidebar />

      {/* Шапка */}
      <Header />

      {/* Основной контент */}
      <main className="ml-[230px] mt-[56px] min-h-screen bg-[#f5f5f5] p-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">
            Все курсы
          </h1>

          {/* Адаптивная сетка карточек */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CatalogCourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                rating={course.rating}
                price={course.price}
                imagePlaceholder={true}
                onCardClick={() =>
                  handleCardClick(course.title)
                }
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}