import React, { useState } from "react";
import styles from "../styles/SupportForm.module.css";

import InputText from "./button/InputText";
import AreaText from "./button/AreaText";
import ButtonPrimary from "./button/ButtonPrimary";

const SupportForm: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Тема:", topic);
    console.log("Сообщение:", message);
    alert("Ваше обращение отправлено! (заглушка)");
    setTopic("");
    setMessage("");
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Написать в поддержку</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <InputText
          id="topic"
          name="topic"
          placeholder="Тема обращения"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className={styles.input}
          required
        />

        <AreaText
          id="message"
          name="message"
          placeholder="Опишите вашу проблему..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.textarea}
          required
          rows={5}
        />

        <ButtonPrimary title="Отправить" type="submit" className={styles.button} />
      </form>
    </div>
  );
};

export default SupportForm;