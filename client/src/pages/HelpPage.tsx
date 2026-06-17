import React from "react";
import styles from "../styles/HelpPage.module.css";
import FaqList from "../components/FaqList";
import SupportForm from "../components/SupportForm";

const HelpPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Помощь и обратная связь</h1>
      <div className={styles.gridContainer}>
        <div className={styles.leftCol}>
          <FaqList />
        </div>
        <div className={styles.rightCol}>
          <SupportForm />
        </div>
      </div>
    </div>
  );
};

export default HelpPage;