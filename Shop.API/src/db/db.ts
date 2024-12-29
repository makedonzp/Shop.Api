import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Открываем соединение с базой данных
export async function openDb() {
  return open({
    filename: './src/db/database.sqlite', // Путь к файлу базы данных
    driver: sqlite3.Database,
  });
}