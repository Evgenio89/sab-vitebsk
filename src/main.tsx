// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd'; // 1. Импортируем провайдер стилей
import { store } from './store/store';
import App from './App';
import './index.css';
import 'leaflet/dist/leaflet.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* 2. Задаем наш благородный эко-зеленый цвет как главный бренд-цвет для всех компонентов */}
      <ConfigProvider theme={{ token: { colorPrimary : '#28a745', borderRadius: 8 } }}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);
