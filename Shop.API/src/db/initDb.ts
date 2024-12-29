import { openDb } from './db';

export async function initDb() {
  const db = await openDb();

  // Создаем таблицу products, если она не существует
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL
    )
  `);

  console.log('Database initialized');
}

// Уберите вызов функции инициализации
// initDb(); // Удалите эту строку