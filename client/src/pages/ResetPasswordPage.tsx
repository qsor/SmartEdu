import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputText from "@/components/button/InputText";
import styles from "@/styles/login/LoginScreen.module.css";

type ResetStep = "REQUEST_EMAIL" | "VERIFY_CODE_AND_RESET";

type ResetForm = {
  email: string;
  code: string;
  password: string;
  repeatPassword: string;
};

type FormErrors = Partial<Record<keyof ResetForm, string>>;

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<ResetStep>("REQUEST_EMAIL");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const [form, setForm] = useState<ResetForm>({
    email: "",
    code: "",
    password: "",
    repeatPassword: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});

  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name as keyof ResetForm;
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
    
    if (apiError) {
      setApiError(null);
    }
  };

  const validateEmailStep = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      nextErrors.email = "Введите email";
    } else if (!emailPattern.test(form.email)) {
      nextErrors.email = "Введите корректный email";
    }

    return nextErrors;
  };

  const validateResetStep = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!form.code.trim()) {
      nextErrors.code = "Введите код из письма";
    } else if (form.code.trim().length < 4) {
      nextErrors.code = "Код слишком короткий";
    }

    if (!form.password) {
      nextErrors.password = "Введите новый пароль";
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

  const handleRequestEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateEmailStep();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setIsLoading(true);
    try {
      // Имитируем запрос к API
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      setStep("VERIFY_CODE_AND_RESET");
    } catch {
      setApiError("Не удалось отправить код. Проверьте email.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateResetStep();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setIsLoading(true);
    try {
      // Здесь в будущем будет вызов confirmResetPassword({ email, code, password })
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      navigate("/login");
    } catch {
      setApiError("Неверный код или срок его действия истек");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.mainWrapper}>
      <section className={styles.loginSection}>
        <h1 className={styles.title}>Восстановление пароля</h1>

        {apiError && (
          <div className={styles.errorText} style={{ marginBottom: "16px", textAlign: "center" }}>
            {apiError}
          </div>
        )}

        {step === "REQUEST_EMAIL" ? (
          <form className={styles.form} onSubmit={handleRequestEmail} noValidate>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="email">
                Почта
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
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.submitWrapper}>
              <button
                type="submit"
                disabled={isLoading}
                className={`${styles.submitButton} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isLoading ? "Отправка..." : "Получить код"}
              </button>
            </div>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleResetPassword} noValidate>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="code">
                Код из письма
              </label>
              <InputText
                id="code"
                name="code"
                type="text"
                placeholder="Введи код"
                value={form.code}
                hasError={!!errors.code}
                onChange={changeField}
                disabled={isLoading}
                maxLength={6}
              />
              {errors.code && <span className={styles.errorText}>{errors.code}</span>}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="password">
                Новый пароль
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
              {errors.password && <span className={styles.errorText}>{errors.password}</span>}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="repeatPassword">
                Повтори пароль
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
                className={`${styles.submitButton} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isLoading ? "Сохранение..." : "Сбросить пароль"}
              </button>
            </div>
          </form>
        )}

        <p className={styles.footerText}>
          <Link className={styles.registerButton} to="/login">
            Назад к авторизации
          </Link>
        </p>
      </section>
    </main>
  );
}