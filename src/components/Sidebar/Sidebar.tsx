// src/components/Sidebar/Sidebar.tsx
import React from 'react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const mainNav = [
    { id: 'news', label: 'Лента новостей' },
    { id: 'requisites', label: 'Реквизиты ГП' },
    { id: 'contacts', label: 'Телефоны служб' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Навигация</div>
        {mainNav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setActiveTab(item.id)}
            className={`${styles.sideLink} ${activeTab === item.id ? styles.sideLinkActive : ''}`}
          >
            {item.label}
          </a>
        ))}
      </div>
      
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Категории услуг</div>
        <a href="#waste" className={styles.sideLink}>Вывоз ТКО</a>
        <a href="#cleaning" className={styles.sideLink}>Уборка территорий</a>
        <a href="#rent" className={styles.sideLink}>Аренда техники</a>
      </div>
    </aside>
  );
};