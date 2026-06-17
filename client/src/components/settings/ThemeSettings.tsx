import styles from "@/styles/settings/ThemeSettings.module.css";

interface ThemeSettingsProps {
  checked: boolean;
  onToggle: () => void;
}

export default function ThemeSettings({
  checked,
  onToggle,
}: ThemeSettingsProps) {
  return (
    <div className={styles.row}>
      <div>
        <p className={styles.title}>Тёмная тема</p>
      </div>

      <button
        type="button"
        onClick={onToggle}
        className={`${styles.switchButton} ${checked ? styles.switchButtonActive : ""}`}
        aria-pressed={checked}
        aria-label="Переключить тему"
      >
        <span
          className={`${styles.switchCircle} ${checked ? styles.switchCircleActive : ""}`}
        />
      </button>
    </div>
  );
}
