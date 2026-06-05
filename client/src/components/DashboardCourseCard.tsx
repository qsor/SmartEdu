import React from 'react';
import ProgressBar from './ProgressBar';

interface DashboardCourseCardProps {
  title?: string;
  progress?: number;
  onContinue?: () => void;
  imagePlaceholder?: boolean;
}

const DashboardCourseCard: React.FC<DashboardCourseCardProps> = ({
  title = "Курс 1",
  progress = 50,
  onContinue = () => console.log('Продолжить курс'),
  imagePlaceholder = true
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 w-full max-w-md hover:shadow-lg transition-shadow">
      {/* Заглушка для обложки */}
      <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
        {imagePlaceholder && (
          <span className="text-gray-400 text-sm">Обложка курса</span>
        )}
      </div>

      {/* Заголовок */}
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        {title}
      </h3>

      {/* Progress Bar */}
      <ProgressBar progress={progress} label="Прогресс" />

      {/* Secondary кнопка */}
      <button
        onClick={onContinue}
        className="w-full mt-4 px-4 py-2 bg-transparent border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors font-medium"
      >
        Продолжить
      </button>
    </div>
  );
};

export default DashboardCourseCard;