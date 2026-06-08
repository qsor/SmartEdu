import React from 'react';
import styles from '../styles/ConfirmDialog.module.css';

interface ConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  message = "Подтвердить действие ?" 
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.header}>Окно подтверждения</h3>
        <p className={styles.message}>{message}</p>
        
        <div className={styles.actions}>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Подтвердить
          </button>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;