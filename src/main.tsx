// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Импортируем Провайдер
import { store } from './store/store';  // Импортируем Хранилище
import App from './App';
import './index.css';
import 'leaflet/dist/leaflet.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Оборачиваем всё приложение в Redux */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
