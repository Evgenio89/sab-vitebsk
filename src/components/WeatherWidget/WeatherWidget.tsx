import React, { useEffect, useState } from 'react';
import { CloudSun, Snowflake, Sun, Thermometer } from 'lucide-react';
import { Card } from '../Card/Card';

export const WeatherWidget: React.FC = () => {
  const [temp, setTemp] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Координаты Витебска: 55.19, 30.20
    fetch('https://open-meteo.com')
      .then(res => res.json())
      .then(data => {
        setTemp(Math.round(data.current_weather.temperature));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getWeatherIcon = () => {
    if (temp === null) return <CloudSun size={24} color="var(--accent-primary)" />;
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
            {temp !== null && temp <= 0 ? 'Спецтехника в режиме зимней уборки' : 'Уборка дорог по регламенту'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', fontWeight: 800 }}>
          <Thermometer size={20} style={{ color: 'var(--text-muted)' }} />
          {loading || temp === null ? '...' : `${temp > 0 ? `+${temp}` : temp}°C`}
        </div>
      </div>
    </Card>
  );
};