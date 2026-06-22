import React from "react";
import { useNavigate } from "react-router-dom"; // 1. Импортируем хук навигации
import styles from "../styles/MainPage.module.css";

import { FeatureCard } from "../components/FeatureCard";
import CategoryPill from "../components/categories/CategoryPill";
import ArrowLinkButton from "../components/button/ArrowLinkButton";
import { Footer } from "../components/Footer";

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 1,
      title: "Освоить профессию с нуля",
      description: "Пошаговые курсы для новичков с поддержкой наставников",
      isHighlighted: false,
    },
    {
      id: 2,
      title: "Актуальные знания",
      description: "Новости повысились на 10% и проехали на 20% в 2026 году",
      isHighlighted: false,
    },
    {
      id: 3,
      title: "Начать бесплатно",
      description: "Доступ к части курсов и практических заданий без оплаты",
      isHighlighted: true,
    },
    {
      id: 4,
      title: "Обучение для компаний",
      description: "Корпоративное обучение, личный кабинет для вашей команды",
      isHighlighted: false,
    },
  ];

  const categories = ["Программирование", "Дизайн", "Аналитика", "DevOps", "ИИ"];

  return (
    <>
      <main className={styles.main}>
        <div className={styles.twoColumns}>
          <div className={styles.heroLeft}>
            <h1 className={styles.title}>
              Онлайн-школа современного образования{" "}
              <span className={styles.orange}>SmartEdu</span>
            </h1>
            <p className={styles.subtitle}>
              Осваивайте востребованные навыки с нуля, проходите курсы,
              выполняйте практические задания и получайте сертификаты
            </p>
            <button 
              className={styles.primaryButton}
              onClick={() => navigate('/catalog')}
            >
              Начать бесплатно
            </button>
          </div>

          <div className={styles.cardsGrid}>
            {features.map((f) => (
              <FeatureCard
                key={f.id}
                title={f.title}
                description={f.description}
                isHighlighted={f.isHighlighted}
                onClick={() => navigate('/catalog')}
              />
            ))}
          </div>
        </div>

        <div className={styles.categoriesRow}>
          <div className={styles.pills}>
              {categories.map((cat) => (
                <CategoryPill 
                  key={cat} 
                  onClick={() => navigate('/catalog')}
                >
                  {cat}
                </CategoryPill>
              ))}
            </div>
          <ArrowLinkButton to="/catalog">
            Все направления
          </ArrowLinkButton>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default MainPage;