"use client";

import { useState, useEffect } from "react";
import Summary from "./Summary";
import JobForm from "./JobForm";
import Table from "./Table";

interface Job {
  id: number;
  name: string;
  target_url: string;
  cron_expression: string;
  status: "Active" | "Paused" | "Failing" | "Retired" | null;
}

interface DashboardProps {
  initialJobs: Job[];
}

export default function Dashboard({ initialJobs }: DashboardProps) {
  // 🟢 The central source of truth for your dashboard layout
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  // Sync state if initialJobs completely changes from server refreshes
  useEffect(() => {
    setJobs(initialJobs);
  }, [initialJobs]);

  const handleJobAdded = (newJob: Job) => {
    // Adds the new cron configuration directly to the top of the UI list instantly
    setJobs((prev) => [newJob, ...prev]);
  };

  return (
    <>
      <Summary allJobs={jobs} />
      <div className="justify-self-center w-full">
        {/* Pass down the state hook trigger to the form */}
        <JobForm onJobAdded={handleJobAdded} />
      </div>
      {/* Feed the connected state array directly to your table layout */}
      <Table allJobs={jobs} />
    </>
  );
}