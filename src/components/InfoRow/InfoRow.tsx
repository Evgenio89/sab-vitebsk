// src/components/InfoRow/InfoRow.tsx
import React from 'react';
import styles from './InfoRow.module.css';

interface InfoRowProps {
  label: string;
  value: string;
  isCopyable?: boolean;
  onCopySuccess?: (msg: string) => void; // Новый колбэк
}

export const InfoRow: React.FC<InfoRowProps> = ({ label, value, isCopyable = false, onCopySuccess }) => {
  const handleCopy = () => {
    if (isCopyable) {
      navigator.clipboard.writeText(value);
      if (onCopySuccess) {
        onCopySuccess(`Успешно скопировано: ${label}`);
      }
    }
  };

  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}:</span>
      <span 
        className={`${styles.value} ${isCopyable ? styles.copyable : ''}`} 
        onClick={handleCopy}
      >
        {value}
      </span>
    </div>
  );
};