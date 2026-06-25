import React from 'react';
import StarRatingAdvanced from './StarRatingAdvanced';
import styles from '../styles/catalog/CatalogCourseCard.module.css';

interface CatalogCourseCardProps {
  title?: string;
  description?: string;
  rating?: number;
  price?: number;
  imageSrc?: string;
  onCardClick?: () => void;
}

const CatalogCourseCard: React.FC<CatalogCourseCardProps> = ({
  title = "Название курса",
  description = "Описание курса, представьте что здесь очень много текста. Лорем Ипсум Дорем Сит Амет",
  rating = 5,
  price = 1200,
  imageSrc,
  onCardClick = () => console.log('Открыть курс')
}) => {
  return (
    <div 
      onClick={onCardClick}
      className={styles.card}
    >
      <div className={styles.imageContainer}>
  {imageSrc ? (
    <img
      src={imageSrc}
      alt={title}
      className={styles.courseImage}
    />
  ) : (
    <span className={styles.imagePlaceholderText}>Обложка курса</span>
  )}
</div>

      <div className={styles.contentContainer}>
        <h3 className={styles.title}>
          {title}
        </h3>

        <p className={styles.description}>
          {description}
        </p>

        <div className={styles.ratingContainer}>
          <StarRatingAdvanced 
            rating={rating} 
            size="w-5 h-5" 
            showNumber={true}
          />
        </div>

        <div className={styles.priceContainer}>
          {price === 0 ? (
            <span className={`${styles.price} text-green-500`}>
              Бесплатно
            </span>
          ) : (
            <span className={styles.price}>
              {price?.toLocaleString()} ₽
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogCourseCard;