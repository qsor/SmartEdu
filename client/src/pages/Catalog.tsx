// client/src/pages/Catalog.tsx
import React from 'react';
import CatalogCourseCard from '../components/CatalogCourseCard';

interface Course {
  id: number;
  title: string;
  description: string;
  rating: number;
  price: number;
}

const Catalog: React.FC = () => {
  // Данные каталога (позже из API)
  const allCourses: Course[] = [
    {
      id: 1,
      title: "Курс 2",
      description: "Описание курса, представьте что здесь очень много текста. Лорем Ипсум Дорем Сит Амет",
      rating: 5,
      price: 1200
    },
    {
      id: 2,
      title: "React для начинающих",
      description: "Полный курс по React с нуля. Изучите хуки, компоненты, роутинг и управление состоянием. Практические проекты и домашние задания.",
      rating: 4.8,
      price: 3500
    },
    {
      id: 3,
      title: "TypeScript практика",
      description: "Углубленный курс по TypeScript. Типы, дженерики, утилиты и интеграция с React.",
      rating: 4.5,
      price: 2800
    }
  ];

  const handleCourseClick = (courseId: number): void => {
    console.log('Открыть курс:', courseId);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Каталог курсов</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCourses.map(course => (
          <CatalogCourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            rating={course.rating}
            price={course.price}
            onCardClick={() => handleCourseClick(course.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;