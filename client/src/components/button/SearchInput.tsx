import type { InputHTMLAttributes } from 'react';
import searchIcon from '../../assets/search.svg';
import styles from '../../styles/Button.module.css';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function SearchInput(props: SearchInputProps) {
  return (
    <div className={styles.searchWrapper}>
      <img src={searchIcon} alt="" aria-hidden="true" className="w-4 h-4 opacity-80" />
      
      <input
        type="text"
        placeholder="Найти"
        autoComplete="off"
        className={styles.searchInput}
        {...props}
      />
    </div>
  );
}
