// src/components/Navbar/Navbar.tsx
import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import styles from './Navbar.module.css';
import logoImg from '@/assets/logo.png'; // Импортируем логотип

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
      {/* ОБНОВЛЕННЫЙ БЛОК: Логотип + Название */}
      <div className={styles.logo} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img 
          src={logoImg} 
          alt="Спецавтобаза Лого" 
          style={{ height: '40px', width: 'auto', objectFit: 'contain' }} 
        />
        <div style={{ lineHeight: '1.1' }}>
          <span style={{ fontWeight: 800, fontSize: '16px' }}>САБ ВИТЕБСК</span>
          <span style={{ color: 'var(--accent-primary)', fontWeight: '800' }}>.</span>
          <span style={{ fontSize: '11px', display: 'block', color: 'var(--text-muted)', fontWeight: 600 }}>Официальный портал</span>
        </div>
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