// src/features/Requisites/Requisites.tsx
import React from 'react';
import { Card } from '../../components/Card/Card';
import { InfoRow } from '../../components/InfoRow/InfoRow';

export interface RequisitesProps {
  onCopySuccess?: (msg: string) => void;
}

export const Requisites: React.FC<RequisitesProps> = ({ onCopySuccess }) => {
  return (
    <Card title="Юридические реквизиты">
      <InfoRow label="УНП" value="300082155" isCopyable onCopySuccess={onCopySuccess} />
      <InfoRow label="ОКПО" value="03366820" isCopyable onCopySuccess={onCopySuccess} />
      <InfoRow label="БИК (IBAN)" value="BLBBBY2X" isCopyable onCopySuccess={onCopySuccess} />
      <InfoRow label="Расчетный счет" value="BY43BLBB30120300082155001001" isCopyable onCopySuccess={onCopySuccess} />
      <InfoRow label="Адрес банка" value="г. Витебск, ул. Ленина, 22/16" />
    </Card>
  );
};