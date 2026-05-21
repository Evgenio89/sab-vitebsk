// src/pages/ImprintPage/ImprintPage.tsx
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar/Navbar';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { ContactList } from '@/features/ContactList/ContactList';
import { Requisites } from '@/features/Requisites/Requisites';
import { Card } from '@/components/Card/Card';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { Select } from '@/components/Select/Select';
import { Modal } from '@/components/Modal/Modal';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  category: 'graphics' | 'announcements' | 'tariffs';
}

export const ImprintPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('news');
  
  // Состояния для калькулятора тарифов
  const [wasteType, setWasteType] = useState<string>('tko');
  const [volume, setVolume] = useState<number>(1);
  
  // Состояния для фильтрации новостей
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Состояние модального окна жалоб
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Статический массив новостей с категориями
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

  // Расчет стоимости на базе тарифов (условные тарифы BYN за куб. метр)
  const calculatePrice = () => {
    const rates: Record<string, number> = { tko: 11.25, kgo: 16.40, stroy: 24.10 };
    return (rates[wasteType] * (volume || 0)).toFixed(2);
  };

  // Фильтрация новостей
  const filteredNews = selectedCategory === 'all' 
    ? staticNews 
    : staticNews.filter(item => item.category === selectedCategory);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)', scrollBehavior: 'smooth' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Передаем функцию открытия модалки в сайдбар при необходимости, либо выводим кнопку */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{ padding: '110px 40px 40px 300px', maxWidth: '1600px', position: 'relative' }}>
        
        {/* Glow Эффект фонового свечения */}
        <div style={{
          position: 'absolute', top: '5%', right: '5%', width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(135,249,8,0.06) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0
        }} />

        <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 1 }}>
          <div>
            <span style={{ color: '#87f908', fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' }}>
              Информационно-сервисный портал
            </span>
            <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '8px 0 0 0', letterSpacing: '-0.5px' }}>
              Государственное предприятие <span style={{ color: '#87f908' }}>"Спецавтобаза г. Витебска"</span>
            </h1>
          </div>
          {/* ФИЧА 4: Кнопка вызова модального окна экстренной связи */}
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            🚨 Сообщить о переполнении баков
          </Button>
        </header>

        {/* ОСНОВНАЯ СЕТКА */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', alignItems: 'start', position: 'relative', zIndex: 1 }}>
          
          {/* ЛЕВАЯ КОЛОНКА (Интерактив и контент) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* ФИЧА 1: Калькулятор стоимости услуг */}
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
                  onChange={(e) => setVolume(Number(e.target.value))}
                />
              </div>
              <div style={{ background: 'rgba(135, 249, 8, 0.05)', border: '1px solid rgba(135, 249, 8, 0.2)', padding: '16px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Предварительная стоимость по прейскуранту:</span>
                <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-primary)' }}>{calculatePrice()} BYN</span>
              </div>
            </Card>

            {/* ФИЧА 3: Фильтрация и поиск по новостям */}
            <div id="news" style={{ display: 'flex', flexDirection: 'column', gap: '20px', scrollMarginTop: '100px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#ffffff' }}>Актуальные публикации</h2>
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
                        color: selectedCategory === btn.id ? '#000000' : '#ffffff',
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
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>{item.title}</h3>
                    <span style={{ fontSize: '12px', color: 'var(--accent-primary)', fontFamily: 'monospace', background: 'var(--accent-glow)', padding: '2px 8px', borderRadius: '4px' }}>
                      {item.date}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '15px' }}>{item.content}</p>
                </Card>
              ))}
            </div>

            {/* ФИЧА 2: Интерактивная карта Витебска */}
            <Card title="Карта спецавтобазы и пунктов сбора вторсырья">
              <div style={{ width: '100%', height: '350px', background: '#121620', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {/* Эмуляция высокотехнологичной карты */}
                <iframe 
                  title="Map"
                  src="https://google.com"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(60deg) brightness(95%) contrast(90%)' }}
                  allowFullScreen
                />
              </div>
            </Card>

          </div>

          {/* ПРАВАЯ КОЛОНКА */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* ФИЧА 5: Скачивание документов (Бланки договоров) */}
            <Card title="Документы и бланки">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { name: 'Договор для физ. лиц (Вывоз ТКО).pdf', size: '240 КБ' },
                  { name: 'Типовой контракт для юр. лиц.docx', size: '1.2 МБ' },
                  { name: 'Заявление на аренду техники.pdf', size: '115 КБ' }
                ].map((doc, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }} title={doc.name}>
                        📄 {doc.name}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{doc.size}</span>
                    </div>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Скачивание файла началось...'); }} style={{ color: 'var(--accent-primary)', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }}>
                      Скачать
                    </a>
                  </div>
                ))}
              </div>
            </Card>

            <div id="contacts" style={{ scrollMarginTop: '100px' }}>
              <ContactList />
            </div>
            
            <div id="requisites" style={{ scrollMarginTop: '100px' }}>
              <Requisites />
            </div>

          </div>

        </div>
      </div>

      {/* РЕАЛИЗАЦИЯ ФИЧИ 4 (Всплывающее модальное окно) */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Сигнал: Переполнение контейнеров">
        <form onSubmit={(e) => { e.preventDefault(); alert('Ваш сигнал зафиксирован оператором и передан дежурной бригаде.'); setIsModalOpen(false); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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

    </div>
  );
};
