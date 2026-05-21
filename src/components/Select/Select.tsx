// src/components/Select/Select.tsx
import React, {type SelectHTMLAttributes, useId } from 'react';
import styles from './Select.module.css';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className = '', ...props }) => {
  const id = useId();
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <select id={id} className={styles.select} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};