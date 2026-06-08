"use client";

import axios from "axios";

interface Job {
  id: number;
  name: string;
  target_url: string;
  cron_expression: string;
  status: "Active" | "Paused" | "Failing" | "Retired" | null;
}

interface ArchivedJobsProps {
  allJobs: Job[];
  onStatusToggle: (id: number, nextStatus: "Active" | "Paused") => void;
}

export default function ArchivedJobs({ allJobs, onStatusToggle }: ArchivedJobsProps) {
  const archivedJobs = allJobs.filter((job) => job.status === "Retired");

  const handleReactivate = async (jobId: number) => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/endpoints/${jobId}`, {
        status: "Paused",
      });

      onStatusToggle(jobId, "Paused");
    } catch (err) {
      alert("Failed to reactivate cron job: " + err);
    }
  };

  return (
    <div className="w-full bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
      <div className="p-6 border-b border-slate-800/60">
        <h2 className="text-lg font-semibold text-white tracking-tight">System Archives</h2>
        <p className="text-xs text-slate-400 mt-1">
          Reviewing historically decomissioned microservices and cron tasks.
        </p>
      </div>

      {archivedJobs.length === 0 ? (
        <div className="py-16 text-center text-sm font-mono text-slate-500">
          No records are currently sitting in the system archives pool.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-full table-auto border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
                <th className="px-6 py-4">Job System ID</th>
                <th className="px-6 py-4">Target Destination Link</th>
                <th className="px-6 py-4">Interval Cadence</th>
                <th className="px-6 py-4 text-right">Operational Restore</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {archivedJobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-800/10 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm font-medium text-slate-300 font-mono">
                    {job.name}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500 max-w-xs truncate">
                    {job.target_url}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-400">
                    {job.cron_expression}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      type="button"
                      onClick={() => handleReactivate(job.id)}
                      className="px-3 py-1 text-xs font-semibold rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all duration-150"
                    >
                      Reactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}