import React from "react";
import { useNavigate } from "react-router-dom";

import { Footer } from "../components/Footer";
import { FeatureCard } from "../components/FeatureCard";
import CategoryPill from "../components/categories/CategoryPill";
import ButtonPrimary from "../components/button/ButtonPrimary";
import ArrowLinkButton from "../components/button/ArrowLinkButton";
import BannerSlider from "../components/BannerSlider"; 

import programmingIcon from "../assets/programming.svg";
import designIcon from "../assets/design.svg";
import analitikIcon from "../assets/analitik.svg";
import devopsIcon from "../assets/devops.svg";
import aiIcon from "../assets/ai.svg";
import platformLogo from "../../public/logo.png"; 
import careerIllustration from "../assets/career.svg";

import styles from "../styles/MainPage.module.css";

// Данные для слайдера
const sliderData = [
  {
    title: "Платформа интерактивного обучения нового поколения",
    subtitle: "Доступ к сотням практических задач и тестов 24/7"
  },
  {
    title: "Учитесь в удобном для вас темпе",
    subtitle: "Все материалы и курсы остаются доступны навсегда"
  },
  {
    title: "Поддержка опытных наставников",
    subtitle: "Получайте фидбек на каждом этапе вашего обучения"
  }
];

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContainer}>
        
        <section className={styles.heroSection}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>
              Онлайн-школа <br /> 
              современного <br /> 
              образования <br />
              <span className={styles.titleHighlight}>SmartEdu</span>
            </h1>
            <p className={styles.subtitle}>
              Осваивайте востребованные навыки с нуля, проходите курсы, выполняйте практические задания и получайте сертификаты
            </p>
            <div className={styles.heroButton}>
              <ButtonPrimary 
                title="Начать бесплатно" 
                onClick={() => navigate('/catalog')} 
              />
            </div>
          </div>

          <div className={styles.featuresGrid}>
            <FeatureCard 
              title="Освоить профессию с нуля"
              description="Пошаговые курсы для новичков с поддержкой наставников"
              isHighlighted={false}
              onClick={() => navigate('/catalog')}
            />
            <FeatureCard 
              title="Повысить навык и прокачать себя"
              description="Актуальные знания для роста в карьере"
              isHighlighted={false}
              onClick={() => navigate('/catalog')}
            />
            <FeatureCard 
              title="Начать бесплатно"
              description="Доступ к части курсов и практических заданий без оплаты"
              isHighlighted={true}
              onClick={() => navigate('/catalog')}
            />
            <FeatureCard 
              title="Обучение для компаний"
              description="Корпоративное обучение и личный кабинет для вашей команды"
              isHighlighted={false}
              onClick={() => navigate('/catalog')}
            />
          </div>
        </section>

        <section className={styles.categoriesSection}>
          <div className={styles.categoriesWrapper}>
            <CategoryPill icon={programmingIcon} label="Программирование" onClick={() => navigate('/catalog')} />
            <CategoryPill icon={designIcon} label="Дизайн" onClick={() => navigate('/catalog')} />
            <CategoryPill icon={analitikIcon} label="Аналитика" onClick={() => navigate('/catalog')} />
            <CategoryPill icon={devopsIcon} label="DevOps" onClick={() => navigate('/catalog')} />
            <CategoryPill icon={aiIcon} label="ИИ" onClick={() => navigate('/catalog')} />
          </div>
          
          <div className={styles.categoriesAction}>
            <ArrowLinkButton onClick={() => navigate('/catalog')}>
              Все направления
            </ArrowLinkButton>
          </div>
        </section>

        <BannerSlider logoUrl={platformLogo} slides={sliderData} />

        <section className={styles.tariffsSection}>
          <h2 className={styles.tariffsTitle}>
            Стоимость участия
          </h2>
          
          <div className={styles.tariffsGrid}>
            <div className={styles.tariffCardGray} onClick={() => navigate('/catalog')}>
              <h3>Бесплатно</h3>
              <p>Для наших<br />учеников</p>
            </div>

            <div className={styles.tariffCardYellow} onClick={() => navigate('/catalog')}>
              <div className={styles.badge100}>100%</div>
              <h3>0 руб/мес</h3>
              <p>Подписка на<br />сообщество</p>
            </div>

            <div className={styles.tariffCardAction}>
              <img 
                src={careerIllustration} 
                alt="График Карьеры" 
                className={styles.tariffSvgImage}
              />
              <ButtonPrimary 
                title="Приобрести подписку" 
                onClick={() => navigate('/subscriptions')} 
              />
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default MainPage;