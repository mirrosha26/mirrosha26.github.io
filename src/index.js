import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Находим корневой элемент в вашем HTML
const container = document.getElementById('root');

// Создаем корневой элемент для React
const root = createRoot(container);

// Рендерим приложение в корневой элемент
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
