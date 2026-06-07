import React, { useState, type ChangeEvent, type InputHTMLAttributes } from 'react';
import { ButtonPrimary } from "./components/Components";
import styles from './styles/LoginScreen.module.css';
type LoginForm = {
  email: string;
  password: string;
};

type FormErrors = Partial<Record<keyof LoginForm, string>>;

type LoginInputProps = {
  id: keyof LoginForm;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder: string;
  value: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function LoginInput({
  id,
  type = 'text',
  placeholder,
  value,
  error,
  onChange,
}: LoginInputProps) {
  return (
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      aria-invalid={error ? 'true' : 'false'}
      className={`${styles.input} ${error ? styles.inputError : styles.inputNormal}`}
    />
  );
}

function LoginScreen() {
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
    } else if (form.password.length < 6) {
      nextErrors.password = 'Минимум 6 символов';
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
          <LoginInput
            id="email"
            type="email"
            placeholder="username@gmail.com"
            value={form.email}
            error={errors.email}
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
          <LoginInput
            id="password"
            type="password"
            placeholder="Password"
            value={form.password}
            error={errors.password}
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
          <button
            type="submit"
            className={styles.submitButton}
          >
            Войти
          </button>
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

export default function App() {
  return (
    <main className={styles.mainWrapper}>
      <LoginScreen />
    </main>
  );
}