// src/pages/ImprintPage/ImprintPage.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Импорт хуков глобального состояния Redux
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../../store/store';
import { 
  setWasteType, setVolume, resetCalculator, 
  setSelectedCategory, setModalOpen, setToastMessage 
} from '../../store/portalSlice';

// Импорт центральной конфигурации координат (Принцип DRY)
import { VITEBSK_SAB_COORDS } from '@/config/mapConfig';

// Импорт чистого CSS-модуля без инлайн-стилей
import styles from './ImprintPage.module.css';

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
  useEffect(() => {
    map.setView(coords, 15);
  }, [coords, map]);
  return null;
};

// ИСПРАВЛЕНО: Интерфейс теперь строго содержит свойство image для картинок
export const ImprintPage: React.FC = () => {
  const dispatch = useDispatch();

  const { 
    wasteType, 
    volume, 
    selectedCategory, 
    isModalOpen, 
    toastMessage, 
    staticNews 
  } = useSelector((state: RootState) => state.portal);

  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculatePrice = () => {
    const rates: Record<string, number> = { tko: 11.25, kgo: 16.40, stroy: 24.10 };
    return (rates[wasteType] * (volume || 0)).toFixed(2);
  };

  const filteredNews = selectedCategory === 'all' 
    ? staticNews 
    : staticNews.filter(item => item.category === selectedCategory);

  const showNotification = (message: string) => {
    dispatch(setToastMessage(message));
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />

      <div className={styles.mainLayout}>
        <Sidebar activeTab={selectedCategory} setActiveTab={(tab) => dispatch(setSelectedCategory(tab))} />

        <div className={styles.contentContainer}>
          <div className={styles.glowEffect} />

          <header className={styles.headerRow}>
            <div>
              <span className={styles.subTitle}>Информационно-сервисный портал</span>
              <h1 className={styles.mainTitle} style={{ fontSize: '32px', fontWeight: 800, margin: '8px 0 0 0', letterSpacing: '-0.5px', color: 'var(--text-main)' }}>
                Государственное предприятие <br />
                <span style={{ color: 'var(--accent-primary)' }}>"Спецавтобаза г. Витебска"</span>
              </h1>
            </div>
            <Button variant="primary" onClick={() => dispatch(setModalOpen(true))}>
              🚨 Сообщить о проблеме
            </Button>
          </header>

          <div className={styles.bannerContainer}>
            <img src={trucksImg} alt="Автопарк" className={styles.bannerImage} />
          </div>

          <div className={styles.twoColumnGrid}>
            
            <div className={styles.leftColumn}>
              
              <Card title="Калькулятор стоимости вывоза отходов (Ориентировочный)">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <Select 
                    label="Тип отходов / ТКО"
                    value={wasteType}
                    onChange={(e) => dispatch(setWasteType(e.target.value))}
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
                    onChange={(e) => dispatch(setVolume(Math.max(1, Number(e.target.value))))}
                  />
                </div>
                <div className={styles.calcSummary}>
                  <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Предварительная стоимость по тарифу:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-primary)' }}>{calculatePrice()} BYN</span>
                    <button 
                      onClick={() => dispatch(resetCalculator())}
                      title="Сбросить калькулятор"
                      type="button"
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px', fontWeight: 600, padding: '4px 8px', borderRadius: '4px', transition: 'all 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ff4d4d'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                      ✕ Очистить
                    </button>
                  </div>
                </div>
              </Card>

              <div id="news" style={{ display: 'flex', flexDirection: 'column', gap: '20px', scrollMarginTop: '100px' }}>
                <div className={styles.newsHeader}>
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
                        onClick={() => dispatch(setSelectedCategory(btn.id))}
                        className={styles.filterButton}
                        style={{
                          background: selectedCategory === btn.id ? 'var(--accent-primary)' : 'var(--bg-card)',
                          color: selectedCategory === btn.id ? '#ffffff' : 'var(--text-main)'
                        }}
                      >
                        <span>{btn.icon}</span>
                        {btn.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.newsGrid}>
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

                          {item.image && (
                            <div style={{ width: '100%', maxHeight: '200px', overflow: 'hidden', borderRadius: '8px', marginBottom: '14px', border: '1px solid var(--border-color)' }}>
                              <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                          )}

                          <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '15px' }}>{item.content}</p>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
              {/* ПОЛНОЦЕННЫЙ БЛОК НЕЗАВИСИМОЙ КАРТЫ НА ГЛОБАЛЬНЫХ КООРДИНАТАХ VITEBSK_SAB_COORDS */}
              <Card title="Карта спецавтобазы г. Витебска">
                <div className={styles.mapWrapper}>
                  {(() => {
                    const ecoSvgIcon = L.divIcon({
                      html: `<div style="font-size: 32px; transform: translate(-10px, -28px); filter: drop-shadow(0 2px 5px rgba(0,0,0,0.3)); cursor: pointer;">📍</div>`,
                      className: 'custom-eco-pin'
                    });

                    return (
                      <MapContainer center={VITEBSK_SAB_COORDS} zoom={15} style={{ width: '100%', height: '100%' }}>
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                        />
                        <RecenterMap coords={VITEBSK_SAB_COORDS} />
                        
                        <Marker position={VITEBSK_SAB_COORDS} icon={ecoSvgIcon}>
                          <Popup>
                            <div style={{ color: '#212529', fontFamily: 'sans-serif', fontSize: '13px', lineHeight: '1.4' }}>
                              <strong>ГП "Спецавтобаза г. Витебска"</strong><br />
                              📍 Старобабиновичский тракт, 12
                            </div>
                          </Popup>
                        </Marker>
                      </MapContainer>
                    );
                  })()}
                </div>
                <div style={{ marginTop: '12px', textAlign: 'right' }}>
                  <a href="https://yandex.by" target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: 'var(--accent-primary)', fontWeight: 600, textDecoration: 'none', background: 'var(--accent-glow)', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', display: 'inline-block' }}>
                    🗺️ Открыть в приложении Яндекс.Навигатор
                  </a>
                </div>
              </Card>

              {/* КАРТОЧКА УСЛУГИ: ВЫВОЗ ТКО */}
              <div id="waste" style={{ scrollMarginTop: '100px', marginTop: '32px' }}>
                <Card title="🚜 Вывоз твердых коммунальных отходов (ТКО)">
                  <p style={{ margin: '0 0 12px 0', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Обеспечиваем регулярный и плановый вывоз бытового, крупногабаритного и строительного мусора для населения, жилищных кооперативов и коммерческих организаций города Витебска.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '16px 0' }}>
                    <div style={{ background: 'var(--bg-main)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <strong style={{ display: 'block', fontSize: '13px', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>Для населения:</strong>
                      <span style={{ fontSize: '15px', fontWeight: 700 }}>По графику дворовых территорий</span>
                    </div>
                    <div style={{ background: 'var(--bg-main)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <strong style={{ display: 'block', fontSize: '13px', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>Для бизнеса:</strong>
                      <span style={{ fontSize: '15px', fontWeight: 700 }}>Установка евроконтейнеров 1.1 м³</span>
                    </div>
                  </div>
                  <Button variant="primary" onClick={() => dispatch(setModalOpen(true))}>Оформить договор на вывоз</Button>
                </Card>
              </div>

              {/* КАРТОЧКА УСЛУГИ: УБОРКА ТЕРРИТОРИЙ */}
              <div id="cleaning" style={{ scrollMarginTop: '100px', marginTop: '32px' }}>
                <Card title="🧹 Санитарная уборка и очистка территорий">
                  <p style={{ margin: '0 0 12px 0', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Оказываем профессиональные услуги по механизированной и ручной уборке улиц, парковок, заводских и дворовых территорий от грязи, пыли, листьев, а также обработке противогололедными смесями.
                  </p>
                  <ul style={{ margin: '12px 0', paddingLeft: '20px', color: 'var(--text-main)', fontSize: '14px', lineHeight: '1.8' }}>
                    <li>Подметание и мойка асфальтовых покрытий спецмашинами</li>
                    <li>Покос сорной растительности и уборка газонов</li>
                    <li>Санитарно-гигиеническая дезинфекция мусоропроводных камер</li>
                  </ul>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-primary)', background: 'var(--accent-glow)', padding: '10px 16px', borderRadius: '6px', display: 'inline-block' }}>
                    ⏱ Работаем круглосуточно в экстренных погодных условиях
                  </div>
                </Card>
              </div>
              {/* КАРТОЧКА УСЛУГИ: АРЕНДА ТЕХНИКИ */}
              <div id="rent" style={{ scrollMarginTop: '100px', marginTop: '32px' }}>
                <Card title="🚛 Аренда специализированной техники с экипажем">
                  <p style={{ margin: '0 0 16px 0', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Предоставляем во временное пользование собственный автопарк надежной коммунальной и строительной техники ГП «Спецавтобаза» для выполнения разовых и долгосрочных задач в Витебской области.
                  </p>
                  <div className={styles.leftColumn} style={{ gap: '8px', marginBottom: '16px' }}>
                    {[
                      { machine: 'Мусоровоз задней загрузки (МАЗ/ГАЗ)', price: 'от 65.00 BYN / час' },
                      { machine: 'Погрузчик фронтальный (Амкодор)', price: 'от 78.00 BYN / час' },
                      { machine: 'Самосвал грузоподъемностью до 20 тонн', price: 'от 55.00 BYN / час' },
                      { machine: 'Подметально-уборочная машина "Бродвей"', price: 'от 90.00 BYN / час' }
                    ].map((item, idx) => (
                      <div key={idx} className={styles.docItem}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>{item.machine}</span>
                        </div>
                        <span style={{ fontWeight: 700, color: 'var(--accent-primary)', fontSize: '14px' }}>{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>
                    * В стоимость аренды уже включены затраты на ГСМ и работа квалифицированного оператора. Шаблон заявления доступен в блоке документов справа.
                  </p>
                </Card>
              </div>

            </div>

            {/* ПРАВАЯ КОЛОНКА */}
            <div className={styles.rightColumn}>
              
              <WeatherWidget />
              
              <Card title="Документы и бланки">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { name: 'Договор для физ. лиц (Вывоз ТКО).pdf', size: '240 КБ' },
                    { name: 'Типовой контракт для юр. лиц.docx', size: '1.2 МБ' },
                    { name: 'Заявление на аренду техники.pdf', size: '115 КБ' }
                  ].map((doc, idx) => (
                    <div key={idx} className={styles.docItem}>
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

      <Modal isOpen={isModalOpen} onClose={() => dispatch(setModalOpen(false))} title="Сигнал: Проблема на контейнерной площадке">
        <form onSubmit={(e) => { e.preventDefault(); showNotification('Ваш сигнал зафиксирован и передан диспетчерской бригаде.'); dispatch(setModalOpen(false)); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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

      {/* Фича 4: Плавающая кнопка "Наверх" */}
      {showScrollBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={styles.scrollTopButton}
        >
          ↑
        </button>
      )}

      {toastMessage && <Toast message={toastMessage} onClose={() => dispatch(setToastMessage(null))} />}

    </div>
  );
};
