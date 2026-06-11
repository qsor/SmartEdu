import React from 'react';

interface CourseActionBlockProps {
  isPurchased: boolean;
  onActionClick: () => void;
}

const CourseActionBlock: React.FC<CourseActionBlockProps> = ({ isPurchased, onActionClick }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex justify-center">
      <button
        onClick={onActionClick}
        className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
      >
        {isPurchased ? 'Начать курс' : 'Купить'}
      </button>
    </div>
  );
};

export default CourseActionBlock;