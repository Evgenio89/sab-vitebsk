// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import portalReducer from './portalSlice';

export const store = configureStore({
  reducer: {
    portal: portalReducer,
  },
});

// Экспортируем типы для хуков реакта
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;