import { useState, type ChangeEvent, type FormEvent } from "react";
import InputText from "@/components/button/InputText";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import ThemeSettings from "@/components/settings/ThemeSettings";
import { useAuth } from "@/hooks/useAuth";
import styles from "@/styles/settings/ProfileForm.module.css";

type ProfileFormState = {
  name: string;
  email: string;
  password: string;
};

type FormErrors = Partial<Record<keyof ProfileFormState, string>>;

export default function ProfileForm() {
  const { user } = useAuth();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const [form, setForm] = useState<ProfileFormState>({
    name: user?.firstName ?? "",
    email: user?.email ?? "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const changeField = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name as keyof ProfileFormState;
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

    if (form.password && form.password.length < 8) {
      nextErrors.password = "Минимум 8 символов";
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    console.log("save profile settings", {
      ...form,
      theme: isDarkTheme ? "dark" : "light",
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="name">
          Имя
        </label>
        <InputText
          id="name"
          name="name"
          type="text"
          placeholder="Введите имя"
          value={form.name}
          hasError={!!errors.name}
          onChange={changeField}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
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
        />
        {errors.email && (
          <span className={styles.errorText}>{errors.email}</span>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="password">
          Новый пароль
        </label>
        <InputText
          id="password"
          name="password"
          type="password"
          placeholder="Введите новый пароль"
          value={form.password}
          hasError={!!errors.password}
          onChange={changeField}
        />
        {errors.password && (
          <span className={styles.errorText}>{errors.password}</span>
        )}
      </div>

      <ThemeSettings
        checked={isDarkTheme}
        onToggle={() => setIsDarkTheme((prev) => !prev)}
      />

      <div className={styles.submitWrapper}>
        <ButtonPrimary type="submit" title="Сохранить изменения" />
      </div>
    </form>
  );
}
