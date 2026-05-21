// src/pages/ImprintPage/ImprintPage.tsx
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar/Navbar';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Card } from '@/components/Card/Card';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { Select } from '@/components/Select/Select';
import { Modal } from '@/components/Modal/Modal';

// ИМПОРТ КОМПОНЕНТОВ БИЗНЕС-ЛОГИКИ С УКАЗАНИЕМ ИХ ТИПОВ
import { ContactList,type ContactListProps } from '../../features/ContactList/ContactList';
import { Requisites,type RequisitesProps } from '../../features/Requisites/Requisites';
import { WeatherWidget } from '@/components/WeatherWidget/WeatherWidget';
import { Toast } from '@/components/Toast/Toast';

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

  // Массив новостей, редактируемый напрямую через код
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
      {/* 1. Фиксированная верхняя шапка */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Гибкий контейнер-обертка Flexbox для выравнивания */}
      <div style={{ display: 'flex', marginTop: '70px' }}>
        
        {/* Боковая панель (ее ширина 240px заложена в css) */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* 3. Основной контент, автоматически занимающий все свободное место */}
        <div style={{
          flex: 1,
          padding: '40px',
          maxWidth: '1300px',
          position: 'relative',
          boxSizing: 'border-box'
        }}>
          
          {/* Мягкий градиентный фоновый эффект */}
          <div style={{
            position: 'absolute', top: '5%', right: '5%', width: '400px', height: '400px',
            background: 'radial-gradient(circle, var(--accent-glow) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0
          }} />

          {/* Заголовок страницы */}
          <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 1 }}>
            <div>
              <span style={{ color: 'var(--accent-primary)', fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' }}>
                Информационно-сервисный портал
              </span>
              <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '8px 0 0 0', letterSpacing: '-0.5px' }}>
                Государственное предприятие <span style={{ color: 'var(--accent-primary)' }}>"Спецавтобаза г. Витебска"</span>
              </h1>
            </div>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              🚨 Сообщить о проблеме
            </Button>
          </header>

          {/* Двухколоночная адаптивная сетка контента */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '32px', alignItems: 'start', position: 'relative', zIndex: 1 }}>
            
            {/* ЛЕВАЯ КОЛОНКА */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* Калькулятор */}
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
                    onChange={(e) => setVolume(Math.max(1, Number(e.target.value)))} // Защита от ввода 0 и отрицательных чисел
                  />
                </div>
                <div style={{ background: 'var(--accent-glow)', border: '1px solid var(--border-color)', padding: '16px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Предварительная стоимость по тарифу:</span>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-primary)' }}>{calculatePrice()} BYN</span>
                </div>
              </Card>

              {/* Лента публикаций */}
              <div id="news" style={{ display: 'flex', flexDirection: 'column', gap: '20px', scrollMarginTop: '100px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Актуальные публикации</h2>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {[
                      { id: 'all', name: 'Все' },
                      { id: 'announcements', name: 'Объявления' },
                      { id: 'graphics', name: 'Графики' },
                      { id: 'tariffs', name: 'Тарифы' }
                    ].map(btn => (
                      <button
                        key={btn.id}
                        onClick={() => setSelectedCategory(btn.id)}
                        style={{
                          background: selectedCategory === btn.id ? 'var(--accent-primary)' : 'transparent',
                          color: selectedCategory === btn.id ? '#000000' : 'var(--text-main)',
                          border: '1px solid var(--border-color)',
                          padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, transition: 'all 0.2s'
                        }}
                      >
                        {btn.name}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredNews.map((item) => (
                  <Card key={item.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>{item.title}</h3>
                      <span style={{ fontSize: '12px', color: 'var(--accent-primary)', fontFamily: 'monospace', background: 'var(--accent-glow)', padding: '2px 8px', borderRadius: '4px' }}>
                        {item.date}
                      </span>
                    </div>
                    <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '15px' }}>{item.content}</p>
                  </Card>
                ))}
              </div>

              {/* Встроенная интерактивная карта */}
              <Card title="Карта спецавтобазы г. Витебска">
                <div style={{ width: '100%', height: '350px', background: '#121620', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <iframe 
                    title="Map"
                    src="https://google.com"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }}
                    allowFullScreen
                  />
                </div>
              </Card>

            </div>

            {/* ПРАВАЯ КОЛОНКА */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* Виджет погоды Витебска */}
              <WeatherWidget />
              
              {/* Бланки документов */}
              <Card title="Документы и бланки">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { name: 'Договор для физ. лиц (Вывоз ТКО).pdf', size: '240 КБ' },
                    { name: 'Типовой контракт для юр. лиц.docx', size: '1.2 МБ' },
                    { name: 'Заявление на аренду техники.pdf', size: '115 КБ' }
                  ].map((doc, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '13px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }} title={doc.name}>
                          📄 {doc.name}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{doc.size}</span>
                      </div>
                      <a href="#" onClick={(e) => { e.preventDefault(); showNotification('Скачивание файла началось...'); }} style={{ color: 'var(--accent-primary)', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }}>
                        Скачать
                      </a>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Вызов списка контактов и реквизитов с жестким кастом типов для обхода кэша TS */}
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

      {/* Модальное окно обратной связи */}
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
          <Button type="submit" variant="primary" fullWidth>
            Отправить срочную заявку
          </Button>
        </form>
      </Modal>

      {/* Глобальный компонент всплывающих уведомлений */}
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}

    </div>
  );
};