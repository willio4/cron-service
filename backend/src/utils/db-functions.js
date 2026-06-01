import { HttpStatusCode } from "axios";
import { getPool } from "../db/db.js";
import { CronExpressionParser } from "cron-parser";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);

export async function set_job_to_running(job) {
  try {
    // Fetch the active connection pool right here
    const db = getPool();
    await db.query(`UPDATE jobs SET is_running = True WHERE id = ?;`, [job.id]);
  } catch (err) {
    console.error(`❌ Failed to lock job ${job.id}:`, err);
  }
}

export async function insert_log_successfully(job, start, response) {
  try {
    const db = getPool();
    await db.query(
      `INSERT INTO jobs_logs(id, job_id, executed_at, response_status, execution_time_ms, error_message) VALUES(UUID_TO_BIN(UUID()), ?, ?, ?, ?, ?);`,
      [
        job.id,
        new Date(start),
        response.status,
        Date.now() - start,
        HttpStatusCode[response.status] || "OK",
      ],
    );
  } catch (err) {
    console.error("❌ Log insertion failed:", err);
  }
}

export async function insert_log_with_error(job, start, err) {
  const status = err.response?.status || 500;
  const errorMessage = err.message || "Unknown Network Error";
  try {
    const db = getPool();
    await db.query(
      `INSERT INTO jobs_logs(id, job_id, executed_at, response_status, execution_time_ms, error_message) VALUES(UUID_TO_BIN(UUID()), ?, ?, ?, ?, ?);`,
      [job.id, new Date(start), status, Date.now() - start, errorMessage],
    );
  } catch (dbErr) {
    console.error("❌ Log insertion failed:", dbErr);
  }
}

export async function find_next_exec_and_end(job) {
  let date;
  try {
    const interval = CronExpressionParser.parse(job.cron_expression);
    date = interval.next().toString();
  } catch (err) {
    console.error("❌ Cron parsing error:", err.message);
    return;
  }
  const next = dayjs(date).utc().format("YYYY-MM-DD HH:mm:ss");
  try {
    const db = getPool();
    await db.query(
      `UPDATE jobs SET is_running = False, next_run_time = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [next, job.id],
    );
  } catch (err) {
    console.error(`❌ Failed to release job ${job.id}:`, err);
  }
}
