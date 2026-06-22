import ProfileForm from "@/components/settings/ProfileForm";
import styles from "@/styles/settings/SettingsPage.module.css";

export default function SettingsPage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Настройки профиля</h1>
      <ProfileForm />
    </section>
  );
}
