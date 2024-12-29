import React from 'react';
import { createRoot } from 'react-dom/client'; // Импорт createRoot
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Импорт стилей Bootstrap

// Находим корневой элемент
const container = document.getElementById('root');

// Создаём корневой элемент
const root = createRoot(container!);

// Рендерим приложение
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);