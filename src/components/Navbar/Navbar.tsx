// src/components/Navbar/Navbar.tsx
import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import styles from './Navbar.module.css';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const menuItems = [
    { id: 'news', label: 'Лента новостей' },
    { id: 'requisites', label: 'Реквизиты ГП' },
    { id: 'contacts', label: 'Телефоны служб' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        САБ ВИТЕБСК<span className={styles.logoDot}>.</span>BY
      </div>
      <div className={styles.rightMenu}>
        <div className={styles.menu}>
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`${styles.link} ${activeTab === item.id ? styles.activeLink : ''}`}
            >
              {item.label}
            </a>
          ))}
        </div>
        <button className={styles.themeToggle} onClick={toggleTheme} title="Переключить тему">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
};