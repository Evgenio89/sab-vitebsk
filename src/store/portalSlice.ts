// src/store/portalSlice.ts
import { createSlice,type PayloadAction } from '@reduxjs/toolkit';

// Описываем типы данных нашего хранилища
interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  category: 'graphics' | 'announcements' | 'tariffs';
}

export interface PortalState {
  wasteType: string;
  volume: number;
  selectedCategory: string;
  isModalOpen: boolean;
  toastMessage: string | null;
  staticNews: NewsItem[];
}

// Начальные данные (Дефолтное состояние)
const initialState: PortalState = {
  wasteType: 'tko',
  volume: 1,
  selectedCategory: 'all',
  isModalOpen: false,
  toastMessage: null,
  staticNews: [
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
  ]
};

// Создаем Слайс логики Redux
export const portalSlice = createSlice({
  name: 'portal',
  initialState,
  reducers: {
    setWasteType: (state, action: PayloadAction<string>) => {
      state.wasteType = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    resetCalculator: (state) => {
      state.wasteType = 'tko';
      state.volume = 1;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setToastMessage: (state, action: PayloadAction<string | null>) => {
      state.toastMessage = action.payload;
    }
  }
});

// Экспортируем экшены для компонентов
export const { 
  setWasteType, 
  setVolume, 
  resetCalculator, 
  setSelectedCategory, 
  setModalOpen, 
  setToastMessage 
} = portalSlice.actions;

export default portalSlice.reducer;