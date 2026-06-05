import React from 'react';
import StarRatingAdvanced from './StarRatingAdvanced';

interface CatalogCourseCardProps {
  title?: string;
  description?: string;
  rating?: number;
  price?: number;
  imagePlaceholder?: boolean;
  onCardClick?: () => void;
}

const CatalogCourseCard: React.FC<CatalogCourseCardProps> = ({
  title = "Название курса",
  description = "Описание курса, представьте что здесь очень много текста. Лорем Ипсум Дорем Сит Амет",
  rating = 5,
  price = 1200,
  imagePlaceholder = true,
  onCardClick = () => console.log('Открыть курс')
}) => {
  return (
    <div 
      onClick={onCardClick}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full"
    >
      {/* Заглушка под картинку (верхняя часть) */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        {imagePlaceholder && (
          <span className="text-gray-400 text-sm">Обложка курса</span>
        )}
      </div>

      {/* Контентная часть */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Заголовок */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {title}
        </h3>

        {/* Описание с line-clamp (2 строчки) */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {description}
        </p>

        {/* Рейтинг с половинчатыми звездами */}
        <div className="mb-3">
          <StarRatingAdvanced 
            rating={rating} 
            size="w-5 h-5" 
            showNumber={true}
          />
        </div>

        {/* Блок цены в правом нижнем углу */}
        <div className="flex justify-end mt-auto pt-2">
          <span className="text-xl font-bold text-gray-900">
            {price.toLocaleString()} ₽
          </span>
        </div>
      </div>
    </div>
  );
};

export default CatalogCourseCard;