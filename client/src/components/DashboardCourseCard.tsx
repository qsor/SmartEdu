import React from "react";
import ProgressBar from "./ProgressBar";

interface DashboardCourseCardProps {
  title?: string;
  progress?: number;
  onContinue?: () => void;
  imagePlaceholder?: boolean;
  isMain?: boolean;
}

const DashboardCourseCard: React.FC<DashboardCourseCardProps> = ({
  title = "Курс 1",
  progress = 50,
  onContinue = () => console.log("Продолжить курс"),
  imagePlaceholder = true,
  isMain = false,
}) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-4 transition-shadow hover:shadow-lg ${
        isMain ? "flex gap-10 max-w-none items-center" : "w-full max-w-md"
      }`}
    >
      {/* Заглушка для обложки */}
      <div
        className={`bg-gray-200 rounded-lg flex items-center justify-center ${
          isMain ? "w-80 h-52 shrink-0" : "w-full h-40 mb-4"
        }`}
      >
        {imagePlaceholder && (
          <span className="text-gray-400 text-sm">Обложка курса</span>
        )}
      </div>

      {/* Контент карточки */}
      <div className={isMain ? "flex-1" : ""}>
        {/* Заголовок */}
        <h3
          className={`font-semibold text-gray-900 ${
            isMain ? "text-2xl mb-2" : "text-lg mb-3"
          }`}
        >
          {title}
        </h3>

        <ProgressBar
          progress={progress}
          label={isMain ? undefined : "Прогресс"}
        />

        <button
          onClick={onContinue}
          className={`mt-4 px-4 py-2 bg-transparent border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors font-medium ${
            isMain ? "w-fit" : "w-full"
          }`}
        >
          Продолжить
        </button>
      </div>
    </div>
  );
};

export default DashboardCourseCard;
