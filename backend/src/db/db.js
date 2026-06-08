import mysql from 'mysql2/promise';

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      timezone: process.env.TIMEZONE,
      waitForConnections: process.env.WAITFORCONNECTIONS === 'true',
      connectionLimit: parseInt(process.env.CONNECTIONLIMIT || '10', 10),
      queueLimit: parseInt(process.env.QUEUELIMIT || '0', 10)
    });
  }
  return pool;
}
