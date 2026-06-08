import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from '../../styles/Button.module.css';

interface ButtonPrimaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: ReactNode; 
}

export default function ButtonPrimary({ title, icon, disabled, ...props }: ButtonPrimaryProps) {
  return (
    <button
      disabled={disabled}
      className={`${styles.iconButtonBase} ${disabled ? styles.iconButtonDisabled : styles.iconButtonNormal}`}
      {...props}
    >
      {icon && (
        <div className={styles.iconWrapper}>
          {icon}
        </div>
      )}
      
      <span className={styles.iconText}>
        {title}
      </span>
    </button>
  );
}