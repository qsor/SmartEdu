import React, { useState } from "react";
import styles from "../styles/FaqList.module.css";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "Как зарегистрироваться на платформе?",
    answer:
      "Нажмите кнопку «Войти» в правом верхнем углу, затем выберите «Создать аккаунт» и заполните все поля.",
  },
  {
    question: "Как начать обучение?",
    answer:
      "Выберите курс в каталоге, нажмите «Записаться» и перейдите в раздел «Мои курсы».",
  },
  {
    question: "Как получить сертификат?",
    answer:
      "После успешного завершения курса сертификат появится в разделе «Сертификаты».",
  },
  {
    question: "Можно ли сменить пароль?",
    answer:
      "Да, в настройках профиля есть раздел «Безопасность», где можно сменить пароль.",
  },
  {
    question: "Что делать, если урок не загружается?",
    answer:
      "Проверьте интернет-соединение и перезагрузите страницу. Если проблема осталась — напишите в поддержку через форму на этой странице.",
  },
];

const FaqList: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.list}>
      <h2 className={styles.title}>Часто задаваемые вопросы</h2>
      <div className={styles.items}>
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={styles.card}
              onClick={() => toggle(index)}
            >
              <h3 className={styles.question}>
                {item.question}
                <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
                  ▼
                </span>
              </h3>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}
              >
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqList;