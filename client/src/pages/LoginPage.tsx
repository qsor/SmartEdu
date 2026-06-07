import React, { useState, type ChangeEvent, type InputHTMLAttributes } from 'react';
import InputText from '../components/button/InputText';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/LoginScreen.module.css'; 
import ButtonPrimary from '@/components/button/ButtonPrimary';

type LoginForm = {
  email: string;
  password: string;
};

type FormErrors = Partial<Record<keyof LoginForm, string>>;

function LoginScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
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
        [fieldName]: '',
      }));
    }
  };

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      nextErrors.email = 'Введите email';
    } else if (!emailPattern.test(form.email)) {
      nextErrors.email = 'Введите корректный email';
    }

    if (!form.password) {
      nextErrors.password = 'Введите пароль';
    } else if (form.password.length < 8) {
      nextErrors.password = 'Минимум 8 символов';
    }

    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    navigate('/catalog');
    console.log('Форма входа прошла валидацию', form);
  };

  return (
    <section className={styles.loginSection}>
      <h1 className={styles.title}>Login</h1>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <InputText
            id="email"
            type="email"
            placeholder="username@gmail.com"
            value={form.email}
            hasError={!!errors.email}
            onChange={changeField}
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
            type="password"
            placeholder="Password"
            value={form.password}
            hasError={!!errors.password}
            onChange={changeField}
          />
          {errors.password && (
            <span className={styles.errorText}>{errors.password}</span>
          )}
        </div>

        <button
          className={styles.forgotButton}
          type="button"
        >
          Забыли пароль?
        </button>

        <div className={styles.submitWrapper}>
          <ButtonPrimary
            title="Войти"
            type="submit"/>
        </div>
      </form>

      <p className={styles.footerText}>
        Нет аккаунта?{' '}
        <button
          className={styles.registerButton}
          type="button"
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