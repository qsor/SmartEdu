import React, { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import styles from "../styles/SubscriptionPage.module.css";
import ReviewsSlider from "@/components/ReviewsSlider";

type SubState = "idle" | "loading" | "active";

const SubscriptionPage: React.FC = () => {
  const [subState, setSubState] = useState<SubState>("idle");

  useEffect(() => {
    const isSubscribed = localStorage.getItem("smartedu_pro_subscription");
    if (isSubscribed === "true") {
      setSubState("active");
    }
  }, []);

  const handleSubscribe = () => {
    if (subState !== "idle") return;
    
    setSubState("loading");
    
    setTimeout(() => {
      setSubState("active");
      localStorage.setItem("smartedu_pro_subscription", "true");
    }, 2000);
  };

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContainer}>
        <div className={styles.contentGrid}>
          
          <div className={styles.infoSection}>
            <h1 className={styles.mainTitle}>
              Присоединяйтесь <br />
              к сообществу <span className={styles.highlight}>SmartEdu</span> со <br />
              скидкой в 100%
            </h1>

            <div className={styles.benefitsBox}>
              <h2 className={styles.benefitsTitle}>Что входит в подписку</h2>
              <ul className={styles.benefitsList}>
                <li>
                  <span className={styles.checkIcon}>
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Закрытое сообщество в Telegram
                </li>
                <li>
                  <span className={styles.checkIcon}>
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Персональные рекомендации по обучению
                </li>
                <li>
                  <span className={styles.checkIcon}>
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Приоритетная поддержка от команды SmartEdu
                </li>
              </ul>
            </div>
          </div>

          {/* ПРАВАЯ ЧАСТЬ: Карточка оформления */}
          <div className={styles.cardSection}>
            {/* Фоновое свечение для красоты */}
            <div className={styles.glowEffect}></div>
            
            <div className={styles.pricingCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Подписка на сообщество</h3>
                <div className={styles.priceContainer}>
                  <span className={styles.priceValue}>0 ₽</span>
                  <span className={styles.pricePeriod}>в месяц • без автопродления</span>
                </div>
              </div>

              <div className={styles.cardAction}>
                <button
                  onClick={handleSubscribe}
                  disabled={subState !== "idle"}
                  className={`
                    ${styles.submitButton} 
                    ${subState === "idle" ? styles.btnIdle : ""}
                    ${subState === "loading" ? styles.btnLoading : ""}
                    ${subState === "active" ? styles.btnActive : ""}
                  `}
                >
                  {subState === "idle" && "Оформить подписку"}
                  {subState === "loading" && "Оформление..."}
                  {subState === "active" && "У вас активна подписка"}
                </button>
                <p className={styles.disclaimer}>
                  Нажимая кнопку, вы соглашаетесь с условиями использования
                </p>
              </div>
            </div>
          </div>

        </div>
        <div className="mt-24">
          <ReviewsSlider />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubscriptionPage;