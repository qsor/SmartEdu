import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../components/button/InputText";
import styles from "../styles/login/LoginScreen.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearAuthError } from "@/store/slices/authSlice";
import { registerUser } from "@/store/slices/authThunks";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

type FormErrors = Partial<Record<keyof RegisterForm, string>>;

function RegisterScreen() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error: authError } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name as keyof RegisterForm;
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

    if (!form.name.trim()) {
      nextErrors.name = "Введите имя";
    }

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

    if (!form.repeatPassword) {
      nextErrors.repeatPassword = "Повторите пароль";
    } else if (form.password !== form.repeatPassword) {
      nextErrors.repeatPassword = "Пароли не совпадают";
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const result = await dispatch(
      registerUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      }),
    );

    if (registerUser.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <section className={styles.loginSection}>
      <h1 className={styles.title}>Registration</h1>

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
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <InputText
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            hasError={!!errors.name}
            onChange={changeField}
            disabled={isLoading}
          />
          {errors.name && (
            <span className={styles.errorText}>{errors.name}</span>
          )}
        </div>

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

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="repeatPassword">
            Repeat password
          </label>
          <InputText
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            placeholder="Password"
            value={form.repeatPassword}
            hasError={!!errors.repeatPassword}
            onChange={changeField}
            disabled={isLoading}
          />
          {errors.repeatPassword && (
            <span className={styles.errorText}>{errors.repeatPassword}</span>
          )}
        </div>

        <div className={styles.submitWrapper}>
          <button
            type="submit"
            disabled={isLoading}
            className={`${styles.submitButton} ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </div>
      </form>

      <p className={styles.footerText}>
        Уже есть аккаунт?{" "}
        <Link className={styles.registerButton} to="/login">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default function RegisterPage() {
  return (
    <main className={styles.mainWrapper}>
      <RegisterScreen />
    </main>
  );
}
