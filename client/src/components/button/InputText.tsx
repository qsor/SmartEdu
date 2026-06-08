import React, { InputHTMLAttributes } from 'react';
import styles from '../../styles/Button.module.css';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export default function InputText({ hasError, className, ...props }: InputTextProps) {
  return (
    <input
      className={`${styles.inputText} ${hasError ? 'border-red-500 focus:outline-red-500' : ''} ${className || ''}`}
      {...props}
    />
  );
}