import React, { useState } from "react";
import styles from "../styles/settings/SettingsPage.module.css";

import InputText from "../components/button/InputText";
import ButtonPrimary from "../components/button/ButtonPrimary";

const SettingsPage: React.FC = () => {
  const [name, setName] = useState("admin");
  const [email, setEmail] = useState("admin@admin.ru");
  const [password, setPassword] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Сохранено:", { name, email, password, theme: isDarkTheme ? "dark" : "light" });
    alert("Настройки сохранены! (заглушка)");
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Настройки профиля</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Имя</label>
            <InputText
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <InputText
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Новый пароль</label>
            <InputText
              type="password"
              placeholder="Введите новый пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Тёмная тема</label>
            <div className={styles.themeWrapper}>
              <span className={styles.themeLabel}></span>
              <button
                type="button"
                role="switch"
                aria-checked={isDarkTheme}
                onClick={toggleTheme}
                className={`${styles.switch} ${isDarkTheme ? styles.switchActive : ""}`}
              >
                <span className={styles.slider} />
              </button>
              <span className={styles.themeLabel}></span>
            </div>
          </div>

          <ButtonPrimary
            title="Сохранить изменения"
            type="submit"
            className={styles.button}
          />
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;