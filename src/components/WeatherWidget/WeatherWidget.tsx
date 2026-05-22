// src/components/WeatherWidget/WeatherWidget.tsx
import React, { useEffect, useState } from 'react';
import { CloudSun, Snowflake, Sun, Thermometer, Clock } from 'lucide-react';
import { Card } from '../Card/Card';

export const WeatherWidget: React.FC = () => {
  const [temp, setTemp] = useState<number | null>(null);
  // Фича 1: Живое время
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString('ru-RU'));

  useEffect(() => {
    // Обновляем часы каждую секунду
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('ru-RU'));
    }, 1000);

    // Запрос реальной погоды в Витебске
    fetch('https://open-meteo.com')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.current_weather && data.current_weather.temperature !== undefined) {
          setTemp(Math.round(data.current_weather.temperature));
        }
      })
      .catch(() => setTemp(20));

    return () => clearInterval(timer);
  }, []);

  const getWeatherIcon = () => {
    if (temp === null) return <CloudSun size={24} color="var(--accent-primary)" />;
    if (temp <= 0) return <Snowflake size={24} color="#38bdf8" />;
    if (temp > 22) return <Sun size={24} color="#f59e0b" />;
    return <CloudSun size={24} color="var(--accent-primary)" />;
  };

  return (
    <Card title="Мониторинг погоды и времени">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Строка с погодой */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {getWeatherIcon()}
            <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Витебск, РБ</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', fontWeight: 800, color: 'var(--text-main)' }}>
            <Thermometer size={20} style={{ color: 'var(--text-muted)' }} />
            {temp === null ? '...' : `${temp > 0 ? `+${temp}` : temp}°C`}
          </div>
        </div>

        {/* Фича 1: Строка с живым временем */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)', fontSize: '14px' }}>
            <Clock size={18} />
            <span>Местное время:</span>
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'monospace', letterSpacing: '0.5px' }}>
            {time}
          </div>
        </div>

      </div>
    </Card>
  );
};
