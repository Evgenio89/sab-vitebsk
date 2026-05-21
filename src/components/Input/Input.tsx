// src/components/Input/Input.tsx
import React, { useId, type InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  const id = useId();
  
  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <input id={id} className={`${styles.input} ${error ? styles.invalid : ''}`} {...props} />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};