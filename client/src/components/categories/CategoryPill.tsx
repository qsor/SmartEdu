import React, { ReactNode } from 'react';
import styles from '../../styles/CategoryPill.module.css';

interface CategoryPillProps {
  label?: string;
  children?: ReactNode;
  icon?: ReactNode | string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function CategoryPill({
  label,
  children,
  icon,
  isActive = false,
  onClick,
}: CategoryPillProps) {

const content = children || label;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.pillBase} ${isActive ? styles.pillActive : styles.pillInactive}`}
    >
      {/* Рендер иконки */}
      {icon && (
        <span className={styles.iconWrapper}>
          {typeof icon === 'string' ? (
            <img 
              src={icon} 
              alt="" 
              className={styles.iconImage} 
              aria-hidden="true" 
            />
          ) : (
            icon
          )}
        </span>
      )}
      
      <span>{content}</span>
    </button>
  );
}