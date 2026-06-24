import React, { useRef } from "react";
import styles from "../styles/ReviewsSlider.module.css";

// Моковые данные (потом сможешь тянуть их с бэкенда)
const reviewsData = [
  {
    id: 1,
    name: "Анна Смирнова",
    role: "UX/UI Дизайнер",
    text: "Потрясающая платформа! Уроки структурированы, а практика помогает сразу закрепить материал. Закрытое комьюнити — отдельная любовь.",
    initials: "АС",
    color: "bg-orange-100 text-orange-600"
  },
  {
    id: 2,
    name: "Иван Петров",
    role: "Frontend-разработчик",
    text: "Начал с нуля, а через 4 месяца уже получил первый оффер. Менторы всегда на связи и дают подробнейший фидбек. Рекомендую!",
    initials: "ИП",
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 3,
    name: "Елена Васильева",
    role: "Data Scientist",
    text: "Отличные курсы по аналитике. Сложные вещи объясняются простым языком. Подписка полностью оправдывает свою цену.",
    initials: "ЕВ",
    color: "bg-green-100 text-green-600"
  },
  {
    id: 4,
    name: "Михаил Иванов",
    role: "DevOps-инженер",
    text: "Удобно, что все материалы остаются навсегда. Платформа работает быстро, нет лишней воды, только хардкорная практика.",
    initials: "МИ",
    color: "bg-purple-100 text-purple-600"
  }
];

const ReviewsSlider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Функция для плавного скролла по стрелочкам
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 380; // Ширина карточки + отступ
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={styles.reviewsSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Отзывы наших учеников</h2>
        <div className={styles.controls}>
          <button onClick={() => scroll("left")} className={styles.arrowButton} aria-label="Предыдущие отзывы">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <button onClick={() => scroll("right")} className={styles.arrowButton} aria-label="Следующие отзывы">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.sliderContainer} ref={scrollRef}>
        {reviewsData.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <div className={styles.cardHeader}>
              {/* Аватарка-заглушка с инициалами */}
              <div className={`${styles.avatar} ${review.color}`}>
                {review.initials}
              </div>
              <div className={styles.userInfo}>
                <h4 className={styles.userName}>{review.name}</h4>
                <p className={styles.userRole}>{review.role}</p>
              </div>
            </div>
            <p className={styles.reviewText}>"{review.text}"</p>
            
            {/* Рейтинг 5 звезд (декоративный) */}
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={styles.starIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSlider;