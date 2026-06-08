import { HttpStatusCode } from "axios";
import { prisma } from "../db/prisma.js";
import { CronExpressionParser } from "cron-parser";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);

export async function set_job_to_running(job) {
  try {
    await prisma.jobs.update({
      where: { id: job.id },
      data: { is_running: true },
    });
  } catch (err) {
    console.error(`❌ Failed to lock job ${job.id}:`, err);
  }
}

export async function insert_log_successfully(job, start, response) {
  try {
    await prisma.jobs_logs.create({
      data: {
        job_id: job.id,
        executed_at: new Date(start),
        response_status: String(response.status).substring(0, 3),
        execution_time_ms: Date.now() - start,
        error_message: (HttpStatusCode[response.status] || "OK").substring(
          0,
          255,
        ),
      },
    });
  } catch (err) {
    console.error("❌ Log insertion failed:", err);
  }
}

export async function insert_log_with_error(job, start, err) {
  const status = err.response?.status || 500;
  const errorMessage = err.message || "Unknown Network Error";
  try {
    await prisma.jobs_logs.create({
      data: {
        job_id: job.id,
        executed_at: new Date(start),
        response_status: String(status).substring(0, 3),
        execution_time_ms: Date.now() - start,
        error_message: errorMessage.substring(0, 255),
      },
    });
  } catch (dbErr) {
    console.error("❌ Log insertion failed:", dbErr);
  }
}

export async function find_next_exec_and_end(job) {
  let date;
  try {
    const interval = CronExpressionParser.parse(job.cron_expression);
    date = interval.next().toDate();
  } catch (err) {
    console.error("❌ Cron parsing error:", err.message);
    return;
  }

  try {
    await prisma.jobs.update({
      where: { id: job.id },
      data: {
        is_running: false,
        next_run_time: date,
        updated_at: new Date(),
      },
    });
  } catch (err) {
    console.error(`❌ Failed to release job ${job.id}:`, err);
  }
}
