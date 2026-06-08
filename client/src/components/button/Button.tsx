import React, { ButtonHTMLAttributes } from 'react';
import styles from '../../styles/Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export default function Button({ title, disabled, ...props }: ButtonProps) {
  return (
    <button 
      disabled={disabled} 
      className={`${styles.buttonBase} ${disabled ? styles.buttonDisabled : styles.buttonNormal}`} 
      {...props}
    >
      {title}
    </button>
  );
}