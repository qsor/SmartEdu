import React, { TextareaHTMLAttributes } from 'react';
import styles from '../../styles/Button.module.css';

interface AreaTextProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export default function AreaText({ hasError, className, ...props }: AreaTextProps) {
  return (
    <textarea
      className={`${styles.inputText} min-h-[100px] ${hasError ? 'border-red-500 focus:outline-red-500' : ''} ${className || ''}`}
      {...props}
    />
  );
}