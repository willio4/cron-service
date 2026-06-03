import { prisma } from "../db/prisma.js";
import { v4 as uuidv4, parse as uuidParse } from "uuid";

export async function get_all_endpoints(req, res) {
  try {
    const data = await prisma.jobs.findMany({
      
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

    const uuidString = uuidv4();

    const binaryId = Buffer.from(uuidParse(uuidString));

    const newJob = await prisma.jobs.create({
      data: {
        ...jobData,
        id: binaryId,
      },
    });

    res.status(201).json({
      endpoint: {
        ...newJob,
        id: uuidString,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function get_endpoint_by_name(req, res) {
  try {
    const { name } = req.params;

    const result = await prisma.jobs.findFirst({
      where: { name: name },
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

export async function update_endpoint_by_name(req, res) {
  try {
    const { name } = req.params;
    const updatedData = req.body;

    const result = await prisma.jobs.update({
      where: { name: name },
      data: updatedData,
    });

    res.status(200).json({ endpoint: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function delete_endpoint_by_name(req, res) {
  try {
    const { name } = req.params;

    const retiredJob = await prisma.jobs.update({
      where: { name: name },
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

export async function get_logs_by_name(req, res) {
  try {
    const { name } = req.params;

    const jobWithLogs = await prisma.jobs.findUnique({
      where: { name: name },
      select: {
        name: true,
        status: true,
        jobs_logs: {
          select: {
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
        .json({ error: `Job with name '${name}' not found` });
    }

    res.status(200).json({
      name: jobWithLogs.name,
      status: jobWithLogs.status,
      logs: jobWithLogs.jobs_logs,
    });
  } catch (err) {
    console.error(`Error fetching logs for ${req.params.name}:`, err);
    res.status(500).json({ error: "Internal server error" });
  }
}
