// src/features/ContactList/ContactList.tsx
import React from 'react';
import { Card } from '../../components/Card/Card';
import { InfoRow } from '../../components/InfoRow/InfoRow';

export interface ContactListProps {
  onCopySuccess?: (msg: string) => void;
}

export const ContactList: React.FC<ContactListProps> = ({ onCopySuccess }) => {
  const contacts = [
    { label: 'Приемная тел./факс', value: '+375 (212) 22-76-44' },
    { label: 'Диспетчерская', value: '+375 (212) 22-76-21' },
    { label: 'Плановый отдел', value: '+375 (212) 22-76-29' },
    { label: 'Бухгалтерия', value: '+375 (212) 22-76-03' },
    { label: 'Отдел кадров', value: '+375 (212) 22-76-08' },
    { label: 'Email', value: 'sabvitebsk@sab-vit.by' },
  ];

  return (
    <Card title="Телефоны и контакты служб">
      {contacts.map((item, idx) => (
        <InfoRow 
          key={idx} 
          label={item.label} 
          value={item.value} 
          onCopySuccess={onCopySuccess}
        />
      ))}
    </Card>
  );
};