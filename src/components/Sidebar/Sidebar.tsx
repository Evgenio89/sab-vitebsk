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

  // НОВЫЙ МАССИВ ДЛЯ КАТЕГОРИЙ УСЛУГ
  const servicesNav = [
    { id: 'waste', label: 'Вывоз ТКО' },
    { id: 'cleaning', label: 'Уборка территорий' },
    { id: 'rent', label: 'Аренда техники' },
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
        {servicesNav.map((item) => (
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
    </aside>
  );
};
