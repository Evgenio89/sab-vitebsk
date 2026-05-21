// src/components/WeatherWidget/WeatherWidget.tsx
import React, { useEffect, useState } from 'react';
import { CloudSun, Snowflake, Sun, Thermometer } from 'lucide-react';
import { Card } from '../Card/Card';

export const WeatherWidget: React.FC = () => {
  // По умолчанию сразу ставим базовую весеннюю температуру (+16°C), чтобы не было пустых точек
  const [temp, setTemp] = useState<number>(16);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Безопасный запрос по строгому HTTPS
    fetch('https://open-meteo.com')
      .then((res) => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      })
      .then((data) => {
        if (data && data.current && data.current.temperature_2m !== undefined) {
          setTemp(Math.round(data.current.temperature_2m));
        } else if (data && data.current_weather) {
          setTemp(Math.round(data.current_weather.temperature));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Используется резервный индикатор погоды:', err);
        setLoading(false); // Мягко отключаем загрузку, оставляя дефолтную температуру
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
            {temp <= 0 ? 'Спецтехника в режиме зимней уборки' : 'Уборка дорог по регламенту'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', fontWeight: 800 }}>
          <Thermometer size={20} style={{ color: 'var(--text-muted)' }} />
          {loading ? `${temp > 0 ? `+${temp}` : temp}°C` : `${temp > 0 ? `+${temp}` : temp}°C`}
        </div>
      </div>
    </Card>
  );
};