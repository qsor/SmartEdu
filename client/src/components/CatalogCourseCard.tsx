import React from 'react';
import StarRatingAdvanced from './StarRatingAdvanced';
import styles from '../styles/catalog/CatalogCourseCard.module.css';
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
      className={styles.card}
    >
      {/* Заглушка под картинку (верхняя часть) */}
      <div className={styles.imageContainer}>
        {imagePlaceholder && (
          <span className={styles.imagePlaceholderText}>Обложка курса</span>
        )}
      </div>

      {/* Контентная часть */}
      <div className={styles.contentContainer}>
        {/* Заголовок */}
        <h3 className={styles.title}>
          {title}
        </h3>

        {/* Описание с line-clamp (2 строчки) */}
        <p className={styles.description}>
          {description}
        </p>

        {/* Рейтинг с половинчатыми звездами */}
        <div className={styles.ratingContainer}>
          <StarRatingAdvanced 
            rating={rating} 
            size="w-5 h-5" 
            showNumber={true}
          />
        </div>

        {/* Блок цены в правом нижнем углу */}
        <div className={styles.priceContainer}>
          <span className={styles.price}>
            {price.toLocaleString()} ₽
          </span>
        </div>
      </div>
    </div>
  );
};

export default CatalogCourseCard;