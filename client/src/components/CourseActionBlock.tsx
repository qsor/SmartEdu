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
  const navigate = useNavigate();

  useEffect(() => {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
    if (enrolledCourses.includes(String(courseId)) || enrolledCourses.includes(Number(courseId)) || isPurchased) {
      setEnrolled(true);
    }
  }, [courseId, isPurchased]);

  const handleActionClick = async () => {
    if (price > 0 && !enrolled) {
      console.log('Переход к оплате...');
      return;
    }

    if (enrolled) {
      navigate(`/course/${courseId}/lesson/typescript-types`);
      return;
    }

    setIsLoading(true);
    try {
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
          title={isLoading ? 'Загрузка...' : enrolled ? 'Продолжить обучение' : price === 0 ? 'Начать бесплатно' : `Купить`}
          onClick={handleActionClick}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default CourseActionBlock;