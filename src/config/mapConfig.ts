// src/config/mapConfig.ts

// Точные гео-координаты предприятия в Витебске
export const VITEBSK_SAB_COORDS: [number, number] = [55.15942303753537, 30.264455059175337];

// Ссылка на внешние Яндекс.Карты для навигатора
export const YANDEX_NAVIGATOR_URL = `https://yandex.by{VITEBSK_SAB_COORDS[1]}%2C${VITEBSK_SAB_COORDS[0]}&z=15`;
