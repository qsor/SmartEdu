import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertBanner from './AlertBanner';
import ButtonPrimary from './button/ButtonPrimary';

interface CourseActionBlockProps {
  courseId: string;
  price?: number;
  isPurchased?: boolean;
}

const CourseActionBlock: React.FC<CourseActionBlockProps> = ({ courseId, price = 1200, isPurchased = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  // 1. Добавляем стейт для хранения статуса подписки
  const [hasSubscription, setHasSubscription] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Проверка купленных курсов
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
    if (enrolledCourses.includes(String(courseId)) || enrolledCourses.includes(Number(courseId)) || isPurchased) {
      setEnrolled(true);
    }

    // 2. Достаем статус подписки (в будущем здесь будет браться из Redux/Auth контекста)
    const isSubscribed = localStorage.getItem("smartedu_pro_subscription") === "true";
    setHasSubscription(isSubscribed);
  }, [courseId, isPurchased]);

  const handleActionClick = async () => {
    // Если курс уже есть у юзера — просто переходим к уроку
    if (enrolled) {
      navigate(`/course/${courseId}/lesson/typescript-types`);
      return;
    }

    // 3. Главная проверка: если курс платный, его нет в купленных и НЕТ ПОДПИСКИ -> отправляем на оплату
    if (price > 0 && !enrolled && !hasSubscription) {
      console.log('Переход к оплате...');
      // navigate('/checkout'); // В будущем редирект на оплату
      return;
    }

    // Если курс бесплатный ИЛИ есть подписка -> зачисляем пользователя на курс
    setIsLoading(true);
    try {
      // Имитация запроса на бэкенд
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const currentCourses = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
      const idToSave = !isNaN(Number(courseId)) ? Number(courseId) : courseId;

      if (!currentCourses.includes(idToSave)) {
        currentCourses.push(idToSave);
        localStorage.setItem('enrolled_courses', JSON.stringify(currentCourses));
      }

      setEnrolled(true);
      setShowBanner(true);

      setTimeout(() => {
        setShowBanner(false);
      }, 3000);

    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Динамически вычисляем текст кнопки для лучшего UX
  let buttonTitle = 'Купить';
  if (isLoading) {
    buttonTitle = 'Загрузка...';
  } else if (enrolled) {
    buttonTitle = 'Продолжить обучение';
  } else if (price === 0) {
    buttonTitle = 'Начать бесплатно';
  } else if (hasSubscription) {
    buttonTitle = 'Получить по подписке';
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {showBanner && (
        <AlertBanner 
          message="Курс успешно добавлен в Мои курсы!" 
          onClose={() => setShowBanner(false)} 
        />
      )}
      
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex justify-center w-full">
        <ButtonPrimary 
          title={buttonTitle}
          onClick={handleActionClick}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default CourseActionBlock;