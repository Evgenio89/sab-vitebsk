// src/components/InfoRow/InfoRow.tsx
import React from 'react';
import styles from './InfoRow.module.css';

interface InfoRowProps {
  label: string;
  value: string;
  isCopyable?: boolean;
}

export const InfoRow: React.FC<InfoRowProps> = ({ label, value, isCopyable = false }) => {
  const handleCopy = () => {
    if (isCopyable) {
      navigator.clipboard.writeText(value);
      alert(`Скопировано: ${value}`);
    }
  };

  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}:</span>
      <span 
        className={`${styles.value} ${isCopyable ? styles.copyable : ''}`} 
        onClick={handleCopy}
        title={isCopyable ? "Нажмите для копирования" : undefined}
      >
        {value}
      </span>
    </div>
  );
};