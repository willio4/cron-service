import { prisma } from "../db/prisma.js";

export async function ticker() {
  try {
    const dueJobs = await prisma.jobs.findMany({
      where: {
        status: "Active",
      },
    });

    return dueJobs;
  } catch (error) {
    console.error("Database error inside ticker execution payload:", error);
    throw error;
  }
}
