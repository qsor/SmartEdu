import React, { useState, type ChangeEvent } from "react";
import InputText from "../components/button/InputText";
import { useNavigate } from "react-router-dom";
import styles from "../styles/login/LoginScreen.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearAuthError } from "@/store/slices/authSlice";
import { loginUser } from "@/store/slices/authThunks";

type LoginForm = {
  email: string;
  password: string;
};

type FormErrors = Partial<Record<keyof LoginForm, string>>;

function LoginScreen() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isLoading, error: authError } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name as keyof LoginForm;
    const { value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));

    if (errors[fieldName]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }

    if (authError) {
      dispatch(clearAuthError());
    }
  };

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      nextErrors.email = "Введите email";
    } else if (!emailPattern.test(form.email)) {
      nextErrors.email = "Введите корректный email";
    }

    if (!form.password) {
      nextErrors.password = "Введите пароль";
    } else if (form.password.length < 8) {
      nextErrors.password = "Минимум 8 символов";
    }

    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const result = await dispatch(loginUser(form));

    if (loginUser.fulfilled.match(result)) {
      navigate("/catalog");
    }
  };

  return (
    <section className={styles.loginSection}>
      <h1 className={styles.title}>Login</h1>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {authError && (
          <div
            className={styles.errorText}
            style={{ marginBottom: "16px", textAlign: "center" }}
          >
            {authError}
          </div>
        )}

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <InputText
            id="email"
            name="email"
            type="email"
            placeholder="username@gmail.com"
            value={form.email}
            hasError={!!errors.email}
            onChange={changeField}
            disabled={isLoading}
          />
          {errors.email && (
            <span className={styles.errorText}>{errors.email}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <InputText
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            hasError={!!errors.password}
            onChange={changeField}
            disabled={isLoading}
          />
          {errors.password && (
            <span className={styles.errorText}>{errors.password}</span>
          )}
        </div>

        <button 
          className={styles.forgotButton} 
          type="button"
          onClick={() => navigate("/reset-password")} // Добавь этот переход
        >
          Забыли пароль?
        </button>

        <div className={styles.submitWrapper}>
          <button
            type="submit"
            disabled={isLoading}
            className={`${styles.submitButton} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Вход..." : "Войти"}
          </button>
        </div>
      </form>

      <p className={styles.footerText}>
        Нет аккаунта?{" "}
        <button
          className={styles.registerButton}
          type="button"
          onClick={() => navigate("/register")}
        >
          Зарегистрироваться
        </button>
      </p>
    </section>
  );
}

export default function LoginPage() {
  return (
    <main className={styles.mainWrapper}>
      <LoginScreen />
    </main>
  );
}
