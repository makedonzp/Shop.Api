import mysql from 'mysql2';
import { RowDataPacket } from 'mysql2';

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'shop',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export const db = pool.promise();

export interface Product extends RowDataPacket {
    id: number;
    title: string;
    description: string;
    price: number;
}