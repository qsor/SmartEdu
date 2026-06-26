import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '@/api/instance';
import CatalogCourseCard from '../components/CatalogCourseCard';

import testCourseImage from '../assets/course-covers/test-course.png';
import reactImage from '../assets/course-covers/react.png';
import typescriptImage from '../assets/course-covers/typescript.png';
import nodejsImage from '../assets/course-covers/nodejs.png';
import dockerImage from '../assets/course-covers/docker.png';
import postgresqlImage from '../assets/course-covers/postgresql.png';
import tailwindImage from '../assets/course-covers/tailwind.png';

// Моки — fallback, если бэк ещё не готов или запрос упал
const mockCourses = [
  {
    id: 0,
    title: 'Тестовый бесплатный курс',
    description: 'Этот курс нужен нам, чтобы протестировать добавление в Мои курсы без оплаты.',
    rating: 5.0,
    price: 0,
    image: testCourseImage,
  },
  {
    id: 1,
    title: 'Основы React',
    description: 'Полный курс по React для начинающих. Изучите хуки, контекст и маршрутизацию.',
    rating: 4.5,
    price: 2990,
    image: reactImage,
  },
  {
    id: 2,
    title: 'TypeScript с нуля',
    description: 'Научитесь писать типобезопасный код. Интерфейсы, дженерики и утилитарные типы.',
    rating: 5.0,
    price: 3500,
    image: typescriptImage,
  },
  {
    id: 3,
    title: 'Node.js и Express',
    description: 'Создание REST API на Node.js. Работа с базами данных и аутентификация.',
    rating: 4.8,
    price: 4200,
    image: nodejsImage,
  },
  {
    id: 4,
    title: 'Docker для разработчиков',
    description: 'Контейнеризация приложений. Docker Compose, сети и тома.',
    rating: 4.2,
    price: 1990,
    image: dockerImage,
  },
  {
    id: 5,
    title: 'PostgreSQL на практике',
    description: 'Проектирование баз данных, сложные запросы и оптимизация производительности.',
    rating: 4.7,
    price: 3100,
    image: postgresqlImage,
  },
  {
    id: 6,
    title: 'Tailwind CSS',
    description: 'Быстрая и красивая верстка с использованием utility-first CSS фреймворка.',
    rating: 4.9,
    price: 1500,
    image: tailwindImage,
  },
];

interface Course {
  id: number | string;
  title: string;
  description: string;
  shortDescription?: string;
  short_description?: string;
  rating: number;
  price?: number;
  image?: string;
}

export default function CatalogPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const fetchUrl = searchQuery 
      ? `/course/catalog/search?q=${encodeURIComponent(searchQuery)}` 
      : `/course/catalog`;

    api.get<Course[]>(fetchUrl)
      .then(res => {
        // Если бэк вернул пустой массив — fallback на моки
        if (res.data && res.data.length > 0) {
          setCourses(res.data);
        } else {
          setCourses(mockCourses as Course[]);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Ошибка при загрузке каталога:", err);
        setError("Не удалось загрузить курсы. Показываем демо-данные.");
        setCourses(mockCourses as Course[]);
        setIsLoading(false);
      });
  }, [searchQuery]);

  const handleCardClick = (courseId: number | string) => {
    navigate(`/course/${courseId}`);
  };

  if (isLoading && courses.length === 0) {
    return (
      <div className="w-full pt-10 text-center text-gray-500">
        Загрузка курсов...
      </div>
    );
  }

  return (
    <div className="w-full pt-10 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {searchQuery ? `Результаты поиска: "${searchQuery}"` : "Каталог курсов"}
      </h1>
      
      {error && courses.length === 0 && (
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg text-orange-700">
          {error}
        </div>
      )}
      
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 w-full">
          {courses.map((course) => (
            <CatalogCourseCard
              key={course.id}
              title={course.title}
              description={course.shortDescription || course.short_description || course.description || "Описание отсутствует"}
              rating={course.rating}
              price={course.price || 0}
              onCardClick={() => handleCardClick(course.id)}
              imageSrc={course.image}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">По вашему запросу ничего не найдено.</p>
          {searchQuery && (
            <button 
              onClick={() => navigate('/catalog')}
              className="text-orange-500 font-semibold underline"
            >
              Сбросить поиск
            </button>
          )}
        </div>
      )}
    </div>
  );
}