import React from 'react';
import StarRatingAdvanced from '../StarRatingAdvanced';

interface CourseHeaderProps {
  title: string;
  rating: number;
  price: number;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ title, rating, price }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">{title}</h1>
        <span className="text-xl font-bold text-gray-900">{price.toLocaleString()} ₽</span>
      </div>
      <div className="mt-2">
        <StarRatingAdvanced rating={rating} size="w-5 h-5" showNumber={true} />
      </div>
      <div className="border-b border-gray-200 mt-3"></div>
    </div>
  );
};

export default CourseHeader;