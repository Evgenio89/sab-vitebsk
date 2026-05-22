// src/components/WeatherWidget/WeatherWidget.tsx
import React, { useEffect, useState } from 'react';
import { CloudSun, Snowflake, Sun, Thermometer } from 'lucide-react';
import { Card } from '../Card/Card';

export const WeatherWidget: React.FC = () => {
  // По умолчанию ставим весеннюю заглушку (+15), пока данные грузятся
  const [temp, setTemp] = useState<number>(15);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Координаты Витебска: latitude=55.19, longitude=30.20
    fetch('https://open-meteo.com')
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка сети');
        return res.json();
      })
      .then((data) => {
        // Проверяем структуру ответа от современного API Open-Meteo
        if (data && data.current && data.current.temperature_2m !== undefined) {
          setTemp(Math.round(data.current.temperature_2m));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Не удалось загрузить погоду:', err);
        setLoading(false);
      });
  }, []);

  const getWeatherIcon = () => {
    if (temp <= 0) return <Snowflake size={24} color="#38bdf8" />;
    if (temp > 20) return <Sun size={24} color="#f59e0b" />;
    return <CloudSun size={24} color="var(--accent-primary)" />;
  };

  return (
    <Card title="Мониторинг погоды: Витебск">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {getWeatherIcon()}
          <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            {temp <= 0 ? 'Спецтехника в зимнем режиме' : 'Уборка улиц по регламенту'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', fontWeight: 800, color: 'var(--text-main)' }}>
          <Thermometer size={20} style={{ color: 'var(--text-muted)' }} />
          {loading ? '...' : `${temp > 0 ? `+${temp}` : temp}°C`}
        </div>
      </div>
    </Card>
  );
};
