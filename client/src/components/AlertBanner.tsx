import React from 'react';
import closeImg from '../assets/cross.svg'
import styles from '../styles/AlertBanner.module.css';

interface AlertBannerProps {
  message: string;
  onClose: () => void;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ message, onClose }) => {
  return (
    <div className={styles.bannerContainer}>
      <span className={styles.messageText}>
        {message}
      </span>
      
      <button
        type="button"
        onClick={onClose}
        className={styles.closeButton}
        aria-label="Закрыть уведомление"
      >
        <img 
          src={closeImg} 
          alt="Закрыть" 
          className={styles.closeIcon} 
          aria-hidden="true"
        />
      </button>
    </div>
  );
};

export default AlertBanner;