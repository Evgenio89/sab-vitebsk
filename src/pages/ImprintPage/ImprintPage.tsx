// src/pages/ImprintPage/ImprintPage.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Navbar } from '@/components/Navbar/Navbar';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Card } from '@/components/Card/Card';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { Select } from '@/components/Select/Select';
import { Modal } from '@/components/Modal/Modal';

import { ContactList, type ContactListProps } from '../../features/ContactList/ContactList';
import { Requisites, type RequisitesProps } from '../../features/Requisites/Requisites';
import { WeatherWidget } from '../../components/WeatherWidget/WeatherWidget';
import { Toast } from '@/components/Toast/Toast';

import trucksImg from '@/assets/trucks.png';

interface RecenterMapProps {
  coords: [number, number];
}

const RecenterMap: React.FC<RecenterMapProps> = ({ coords }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(coords, 15);
  }, [coords, map]);
  return null;
};

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  category: 'graphics' | 'announcements' | 'tariffs';
}
export const ImprintPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('news');
  const [wasteType, setWasteType] = useState<string>('tko');
  const [volume, setVolume] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const staticNews: NewsItem[] = [
    {
      id: 3,
      title: 'Утверждены новые тарифы на второе полугодие',
      content: 'На основании решения Витебского облисполкома скорректированы тарифы на обращение с твердыми коммунальными отходами для населения и юридических лиц.',
      date: '20.05.2026',
      category: 'tariffs'
    },
    {
      id: 2,
      title: 'Изменение графика вывоза крупногабаритных отходов',
      content: 'В связи с проведением плановых уборочных работ в Первомайском районе, график движения спецтехники смещается на 1 час вперед.',
      date: '18.05.2026',
      category: 'graphics'
    },
    {
      id: 1,
      title: 'Плановые работы по дезинфекции контейнерных площадок',
      content: 'Спецавтобаза приступает к весеннему этапу санитарной обработки мусороприемных камер и дворовых площадок города.',
      date: '10.05.2026',
      category: 'announcements'
    },
  ];

  const calculatePrice = () => {
    const rates: Record<string, number> = { tko: 11.25, kgo: 16.40, stroy: 24.10 };
    return (rates[wasteType] * (volume || 0)).toFixed(2);
  };

  const filteredNews = selectedCategory === 'all' 
    ? staticNews 
    : staticNews.filter(item => item.category === selectedCategory);

  const showNotification = (message: string) => {
    setToastMessage(message);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)', scrollBehavior: 'smooth' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{ display: 'flex', marginTop: '70px' }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div style={{ flex: 1, padding: '40px', maxWidth: '1300px', position: 'relative', boxSizing: 'border-box' }}>
          
          <div style={{
            position: 'absolute', top: '5%', right: '5%', width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(40, 167, 69, 0.04) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0
          }} />

          <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 1 }}>
            <div>
              <span style={{ color: 'var(--accent-primary)', fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' }}>
                Информационно-сервисный портал
              </span>
              <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '8px 0 0 0', letterSpacing: '-0.5px', color: 'var(--text-main)' }}>
                Государственное предприятие <br />
                <span style={{ color: 'var(--accent-primary)' }}>"Спецавтобаза г. Витебска"</span>
              </h1>
            </div>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              🚨 Сообщить о проблеме
            </Button>
          </header>

          <div style={{
            width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px',
            padding: '20px 40px', marginBottom: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center',
            boxShadow: 'var(--shadow)', overflow: 'hidden', boxSizing: 'border-box'
          }}>
            <img src={trucksImg} alt="Автопарк" style={{ maxWidth: '100%', height: 'auto', maxHeight: '160px', objectFit: 'contain' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '32px', alignItems: 'start', position: 'relative', zIndex: 1 }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              <Card title="Калькулятор стоимости вывоза отходов (Ориентировочный)">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <Select 
                    label="Тип отходов / ТКО"
                    value={wasteType}
                    onChange={(e) => setWasteType(e.target.value)}
                    options={[
                      { value: 'tko', label: 'Твердые коммунальные отходы' },
                      { value: 'kgo', label: 'Крупногабаритный мусор' },
                      { value: 'stroy', label: 'Строительные отходы' }
                    ]}
                  />
                  <Input 
                    label="Объем (в метрах кубических)" 
                    type="number" 
                    min={1} 
                    value={volume}
                    onChange={(e) => setVolume(Math.max(1, Number(e.target.value)))}
                  />
                </div>
                <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Предварительная стоимость по тарифу:</span>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-primary)' }}>{calculatePrice()} BYN</span>
                </div>
              </Card>
              <div id="news" style={{ display: 'flex', flexDirection: 'column', gap: '20px', scrollMarginTop: '100px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Актуальные публикации</h2>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[
                      { id: 'all', name: 'Все публикации', icon: '📋' },
                      { id: 'announcements', name: 'Объявления', icon: '📢' },
                      { id: 'graphics', name: 'Графики', icon: '📅' },
                      { id: 'tariffs', name: 'Тарифы', icon: '💳' }
                    ].map(btn => (
                      <button
                        key={btn.id}
                        onClick={() => setSelectedCategory(btn.id)}
                        style={{
                          background: selectedCategory === btn.id ? 'var(--accent-primary)' : 'var(--bg-card)',
                          color: selectedCategory === btn.id ? '#ffffff' : 'var(--text-main)',
                          border: '1px solid var(--border-color)',
                          padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                          display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s ease'
                        }}
                      >
                        <span>{btn.icon}</span>
                        {btn.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <AnimatePresence mode="popLayout">
                    {filteredNews.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      >
                        <Card animateOnScroll>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>{item.title}</h3>
                            <span style={{ fontSize: '12px', color: 'var(--accent-primary)', fontFamily: 'monospace', background: 'var(--accent-glow)', padding: '2px 8px', borderRadius: '4px' }}>
                              {item.date}
                            </span>
                          </div>
                          <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '15px' }}>{item.content}</p>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <Card title="Карта спецавтобазы г. Витебска">
                <div style={{ width: '100%', height: '350px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative', zIndex: 10 }}>
                  <MapContainer center={[55.15942303753537, 30.264455059175337]} zoom={15} style={{ width: '100%', height: '100%' }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                    />
                    <RecenterMap coords={[55.15942303753537, 30.264455059175337]} />
                    <Marker position={[55.15942303753537, 30.264455059175337]}>
                      <Popup>
                        <div style={{ color: '#212529', fontFamily: 'sans-serif', fontSize: '13px' }}>
                          <strong>ГП "Спецавтобаза г. Витебска"</strong><br />📍 Старобабиновичский тракт, 12
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
                <div style={{ marginTop: '12px', textAlign: 'right' }}>
                  <a href="https://yandex.by" target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: 'var(--accent-primary)', fontWeight: 600, textDecoration: 'none', background: 'var(--accent-glow)', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', display: 'inline-block' }}>🗺️ Открыть в приложении Яндекс.Навигатор</a>
                </div>
              </Card>

            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <WeatherWidget />
              
              <Card title="Документы и бланки">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { name: 'Договор для физ. лиц (Вывоз ТКО).pdf', size: '240 КБ' },
                    { name: 'Типовой контракт для юр. лиц.docx', size: '1.2 МБ' },
                    { name: 'Заявление на аренду техники.pdf', size: '115 КБ' }
                  ].map((doc, idx) => (
                    <div 
                      key={idx} 
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)', transition: 'all 0.2s ease' }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.background = 'var(--bg-main)'; }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }} title={doc.name}>📄 {doc.name}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{doc.size}</span>
                      </div>
                      <a href="#" onClick={(e) => { e.preventDefault(); showNotification('Скачивание файла началось...'); }} style={{ color: 'var(--accent-primary)', fontSize: '12px', fontWeight: 700, textDecoration: 'none', background: 'var(--bg-card)', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>🖨 Получить</a>
                    </div>
                  ))}
                </div>
              </Card>

              <div id="contacts" style={{ scrollMarginTop: '100px' }}>
                {React.createElement(ContactList as React.FC<ContactListProps>, { onCopySuccess: showNotification })}
              </div>
              
              <div id="requisites" style={{ scrollMarginTop: '100px' }}>
                {React.createElement(Requisites as React.FC<RequisitesProps>, { onCopySuccess: showNotification })}
              </div>
            </div>

          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Сигнал: Проблема на контейнерной площадке">
        <form onSubmit={(e) => { e.preventDefault(); showNotification('Ваш сигнал зафиксирован и передан диспетчерской бригаде.'); setIsModalOpen(false); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Input label="Адрес площадки в г. Витебске" placeholder="ул. Строителей, д. 4" required />
          <Select 
            label="Что именно произошло?"
            options={[
              { value: 'over', label: 'Контейнеры переполнены мусором' },
              { value: 'broken', label: 'Поврежден сам бак/евроконтейнер' },
              { value: 'dirty', label: 'Не убрана площадка после вывоза' }
            ]}
          />
          <Button type="submit" variant="primary" fullWidth>Отправить срочную заявку</Button>
        </form>
      </Modal>

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  );
};
