import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500); // Закроется сам через 2.5 секунды
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed', bottom: '30px', right: '30px',
      background: 'var(--bg-card)', border: '1px solid var(--accent-primary)',
      padding: '16px 24px', borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      display: 'flex', alignItems: 'center', gap: '12px', zIndex: 2000,
      animation: 'slideIn 0.3s ease'
    }}>
      <CheckCircle size={20} color="var(--accent-primary)" />
      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>{message}</span>
      <style>{`
        @keyframes slideIn {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};