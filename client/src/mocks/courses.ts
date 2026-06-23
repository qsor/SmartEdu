export interface MockCourse {
  id: number | string;
  title: string;
  description: string;
  rating: number;
  price: number;
}

export const mockCourses: MockCourse[] = [
  {
    id: 0,
    title: 'Тестовый бесплатный курс',
    description: 'Этот курс нужен нам, чтобы протестировать добавление в Мои курсы без оплаты.',
    rating: 5.0,
    price: 0,
  },
  {
    id: 1,
    title: 'Основы React',
    description: 'Полный курс по React для начинающих. Изучите хуки, контекст и маршрутизацию.',
    rating: 4.5,
    price: 2990,
  },
  {
    id: 2,
    title: 'TypeScript с нуля',
    description: 'Научитесь писать типобезопасный код. Интерфейсы, дженерики и утилитарные типы.',
    rating: 5.0,
    price: 3500,
  },
  {
    id: 3,
    title: 'Node.js и Express',
    description: 'Создание REST API на Node.js. Работа с базами данных и аутентификация.',
    rating: 4.8,
    price: 4200,
  },
  {
    id: 4,
    title: 'Docker для разработчиков',
    description: 'Контейнеризация приложений. Docker Compose, сети и тома.',
    rating: 4.2,
    price: 1990,
  },
  {
    id: 5,
    title: 'PostgreSQL на практике',
    description: 'Проектирование баз данных, сложные запросы и оптимизация производительности.',
    rating: 4.7,
    price: 3100,
  },
  {
    id: 6,
    title: 'Tailwind CSS',
    description: 'Быстрая и красивая верстка с использованием utility-first CSS фреймворка.',
    rating: 4.9,
    price: 1500,
  },
];
