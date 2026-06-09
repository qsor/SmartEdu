import styles from "@/styles/Footer.module.css";
import logo from "../../public/logo.png";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <div className={styles.logoBox}>
          <img
            className={styles.logoIcon}
            src={logo}
            alt=""
            aria-hidden="true"
          />
          <span className={styles.logoText}>SmartEdu</span>
        </div>

        <p className={styles.copyright}>
          2026 SmartEdu все права защищены.
          <br />
          Онлайн-образование нового поколения.
        </p>
      </div>

      <nav className={styles.nav}>
        <a href="#" className={styles.navLink}>
          О платформе
        </a>
        <a href="#" className={styles.navLink}>
          Пользовательское соглашение
        </a>
        <a href="#" className={styles.navLink}>
          Политика конфиденциальности
        </a>
      </nav>

      <div className={styles.socials}>
        <a href="#" className={styles.socialLink}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M21.5 3.5L2.8 10.7c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.8 5.7c.2.7.1 1 .9 1 .6 0 .9-.3 1.2-.7l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8L23 5.1c.3-1.3-.5-1.9-1.5-1.6zM9.2 13.4l9.4-5.9c.5-.3.9-.1.5.2l-7.8 7-.3 3.5-1.8-4.8z" />
          </svg>
        </a>
        <a href="#" className={styles.socialLink}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.8 31.8 0 0 0 0 12a31.8 31.8 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.8 31.8 0 0 0 24 12a31.8 31.8 0 0 0-.5-5.8zM9.6 15.5v-7L16 12l-6.4 3.5z" />
          </svg>
        </a>
        <a href="#" className={styles.socialLink}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M12.8 18h-1.4s-3.1-.2-5.8-2.7C2.6 12.5.2 6.9.2 6.9s-.1-.4 0-.6c.2-.2.7-.2.7-.2l3.3-.1s.3 0 .5.1c.2.1.3.4.3.4s.5 1.2 1.2 2.3c1.4 2.1 2 2.6 2.5 2.4.4-.2.3-1.9.3-1.9s0-.6-.2-.9c-.2-.2-.5-.3-.6-.3-.1 0 .1-.3.5-.4.7-.1 1.9-.1 3.4 0 1.1.1 1.5.7 1.5 1.5v2c0 .6.1.8.3.9.2.1.8 0 2.3-2.3.7-1.1 1.2-2.4 1.2-2.4s.1-.2.3-.4c.2-.1.5-.1.5-.1h3.4s1 .1 1.1.3c.2.3-.2.9-.2.9s-.5 1.3-1.8 3c-1.4 1.8-1.5 1.6-.5 2.5 2 1.8 2.4 2.8 2.5 3.1 0 .1 0 .8-.9.8h-3c-.8 0-1.2-.2-1.9-.8-.9-.9-1.8-1.8-2.2-1.7-.4.1-.4.5-.4.5v1.5c0 .4-.1.6-.3.8-.3.2-.8.3-1.2.3z" />
          </svg>
        </a>
      </div>
    </footer>
  );
};
