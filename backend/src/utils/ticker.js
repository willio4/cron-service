import { getPool } from "../db/db.js";

export async function ticker() {
  try {
    const db = getPool();
    const [rows] = await db.query(
      `SELECT * FROM jobs WHERE next_run_time <= UTC_TIMESTAMP() AND status = 'Active' AND is_running = False;`,
    );
    return rows;
  } catch (error) {
    console.error("❌ Error checking cron database:", error);
  }
}
