import React from "react";
import ProgressBar from "./ProgressBar";
import styles from "../styles/progress/ProgressCourseCard.module.css";

interface ProgressCourseCardProps {
  title?: string;
  progress?: number;
  onContinue?: () => void;
  imagePlaceholder?: boolean;
  isMain?: boolean;
}

const ProgressCourseCard: React.FC<ProgressCourseCardProps> = ({
  title = "Курс 1",
  progress = 50,
  onContinue = () => console.log("Продолжить курс"),
  imagePlaceholder = true,
  isMain = false,
}) => {
  return (
    <div
      className={`${styles.card} ${
        isMain ? styles.cardMain : styles.cardDefault
      }`}
    >
      {/* Заглушка для обложки */}
      <div
        className={`${styles.imageContainer} ${
          isMain ? styles.imageContainerMain : styles.imageContainerDefault
        }`}
      >
        {imagePlaceholder && (
          <span className={styles.imagePlaceholderText}>Обложка курса</span>
        )}
      </div>

      {/* Контент карточки */}
      <div className={isMain ? styles.contentContainer : ""}>
        {/* Заголовок */}
        <h3 className={isMain ? styles.titleMain : styles.titleDefault}>
          {title}
        </h3>

        <ProgressBar
          progress={progress}
          label={isMain ? undefined : "Прогресс"}
        />

        <button
          onClick={onContinue}
          className={`${styles.continueButton} ${
            isMain ? styles.continueButtonMain : styles.continueButtonDefault
          }`}
        >
          Продолжить
        </button>
      </div>
    </div>
  );
};

export default ProgressCourseCard;