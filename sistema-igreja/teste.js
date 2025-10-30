import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function teste() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'igreja_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  try {
    const [rows] = await pool.query('SELECT * FROM membros');
    console.log('Membros encontrados:', rows);
  } catch (err) {
    console.error('Erro:', err.message);
  } finally {
    await pool.end();
  }
}

teste();
