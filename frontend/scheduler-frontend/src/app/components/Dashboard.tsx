"use client";

import { useState, useEffect } from "react";
import Summary from "./Summary";
import JobForm from "./JobForm";
import Table from "./Table";
import Logs from "./Logs";

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
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  useEffect(() => {
    setJobs(initialJobs);
  }, [initialJobs]);

  const handleJobAdded = (newJob: Job) => {
    setJobs((prev) => [newJob, ...prev]);
  };

  const handleStatusToggle = (jobId: number, nextStatus: "Active" | "Paused") => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status: nextStatus } : job
      )
    );
  };

  const handleJobDeleted = (jobId: number) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  return (
    <>
      <Summary allJobs={jobs} />
      
      <div className="justify-self-center w-full">
        <JobForm onJobAdded={handleJobAdded} />
      </div>
      
      <Table 
        allJobs={jobs} 
        onSelectJob={setSelectedJobId} 
        selectedJobId={selectedJobId} 
        onStatusToggle={handleStatusToggle}
        onJobDeleted={handleJobDeleted}
      />
      
      <Logs activeJobId={selectedJobId} />
    </>
  );
}