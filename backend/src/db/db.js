import mysql from 'mysql2/promise';

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
      timezone: process.env.timezone,
      waitForConnections: process.env.waitForConnections === 'true',
      connectionLimit: parseInt(process.env.connectionLimit || '10', 10),
      queueLimit: parseInt(process.env.queueLimit || '0', 10)
    });
  }
  return pool;
}
