import { prisma } from "../db/prisma.js";

export async function get_all_endpoints(req, res) {
  try {
    const data = await prisma.jobs.findMany({
      where: {
        NOT: {
          status: "Retired"
        }
      },
      orderBy: {
        created_at: "desc"
      }
    });
    res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function create_endpoint(req, res) {
  try {
    const jobData = req.body;

    const newJob = await prisma.jobs.create({
      data: jobData,
    });

    res.status(201).json({
      endpoint: newJob,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function get_endpoint_by_id(req, res) {
  try {
    const { id } = req.params;

    const result = await prisma.jobs.findUnique({
      where: { id: Number(id) },
    });

    if (!result) {
      return res.status(404).json({ error: "Endpoint not found" });
    }

    res.status(200).json({ endpoint: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function update_endpoint_by_id(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await prisma.jobs.update({
      where: { id: Number(id) },
      data: updatedData,
    });

    res.status(200).json({ endpoint: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function delete_endpoint_by_id(req, res) {
  try {
    const { id } = req.params;

    const retiredJob = await prisma.jobs.update({
      where: { id: Number(id) },
      data: { status: "Retired" },
    });

    res
      .status(200)
      .json({ message: "Job retired successfully", job: retiredJob });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function get_logs_by_id(req, res) {
  try {
    const { id } = req.params;

    const jobWithLogs = await prisma.jobs.findUnique({
      where: { id: Number(id) },
      select: {
        name: true,
        status: true,
        jobs_logs: {
          select: {
            id: true,
            executed_at: true,
            response_status: true,
            execution_time_ms: true,
            error_message: true,
          },
          orderBy: {
            executed_at: "desc",
          },
        },
      },
    });

    if (!jobWithLogs) {
      return res
        .status(404)
        .json({ error: `Job with ID '${id}' not found` });
    }

    res.status(200).json({
      name: jobWithLogs.name,
      status: jobWithLogs.status,
      logs: jobWithLogs.jobs_logs,
    });
  } catch (err) {
    console.error(`Error fetching logs for job ID ${req.params.id}:`, err);
    res.status(500).json({ error: "Internal server error" });
  }
}