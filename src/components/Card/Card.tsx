// src/components/Card/Card.tsx
import React, { type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import styles from './Card.module.css';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  id?: string;
  animateOnScroll?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  title, 
  children, 
  className = '', 
  id,
  animateOnScroll = false 
}) => {
  const cardClass = `${styles.card} ${className}`;

  // ИСПРАВЛЕНО: Добавлен строгий тип Variants для совместимости с framer-motion
  const animVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: 'easeOut' } 
    }
  };

  if (animateOnScroll) {
    return (
      <motion.div
        id={id}
        className={cardClass}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={animVariants}
      >
        {title && <h3 className={styles.title}>{title}</h3>}
        <div className={styles.content}>{children}</div>
      </motion.div>
    );
  }

  return (
    <div id={id} className={cardClass}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};