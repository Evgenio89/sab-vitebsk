// src/features/ContactList/ContactList.tsx
import React, { useState } from 'react';
import { Card } from '../../components/Card/Card';
import { InfoRow } from '../../components/InfoRow/InfoRow';

export interface ContactListProps {
  onCopySuccess?: (msg: string) => void;
}

export const ContactList: React.FC<ContactListProps> = ({ onCopySuccess }) => {
  // Фича 3: Состояние для строки поиска
  const [searchQuery, setSearchQuery] = useState('');

  const contacts = [
    { label: 'Приемная тел./факс', value: '+375 (212) 22-76-44' },
    { label: 'Диспетчерская служба', value: '+375 (212) 22-76-21' },
    { label: 'Планово-экономический отдел', value: '+375 (212) 22-76-29' },
    { label: 'Бухгалтерия расчетная', value: '+375 (212) 22-76-03' },
    { label: 'Отдел кадров / правовой', value: '+375 (212) 22-76-08' },
    { label: 'Электронная почта Sabre', value: 'sabvitebsk@sab-vit.by' },
  ];

  // Фильтруем массив на основе поискового запроса (без учета регистра букв)
  const filteredContacts = contacts.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card title="Контакты и телефоны служб">
      {/* Фича 3: Поле поиска внутри карточки */}
      <input 
        type="text"
        placeholder="🔍 Быстрый поиск службы (например: кадры)..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 14px',
          background: 'var(--bg-main)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          color: 'var(--text-main)',
          fontSize: '13px',
          outline: 'none',
          marginBottom: '12px',
          boxSizing: 'border-box',
          transition: 'all 0.2s'
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
      />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {filteredContacts.length === 0 ? (
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '10px 0' }}>
            Ничего не найдено
          </div>
        ) : (
          filteredContacts.map((item, idx) => (
            <InfoRow 
              key={idx} 
              label={item.label} 
              value={item.value} 
              onCopySuccess={onCopySuccess}
            />
          ))
        )}
      </div>
    </Card>
  );
};
