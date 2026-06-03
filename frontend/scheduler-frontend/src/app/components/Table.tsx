"use client";

import { useState } from "react";

interface Job {
  id: number;
  name: string;
  target_url: string;
  cron_expression: string;
  status: "Active" | "Paused" | "Failing" | "Retired" | null;
}

interface TableProps {
  allJobs: Job[];
}

export default function Table({ allJobs }: TableProps) {
  const [jobs, setJobs] = useState<Job[]>(allJobs);
  return (
    <div className="w-full mt-8 bg-slate-900 rounded-xl border border-slate-800/80 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full min-w-full table-auto border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/40 text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
              <th className="px-6 py-4">Job System ID</th>
              <th className="px-6 py-4">Target Destination Link</th>
              <th className="px-6 py-4">Interval Cadence</th>
              <th className="px-6 py-4">Current Status</th>
              <th className="px-6 py-4 text-right">Operational Control</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/50">
            {allJobs.map(
              (job) => (
                <tr
                  key={job.id}
                  className="hover:bg-slate-800/20 transition-colors duration-150"
                >
                  {/* Job System ID */}
                  <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap">
                    {job.name}
                  </td>

                  {/* Target Destination Link */}
                  <td className="px-6 py-4 font-mono text-xs text-slate-400 max-w-xs truncate">
                    {job.target_url}
                  </td>

                  {/* Interval Cadence */}
                  <td className="px-6 py-4 font-mono text-xs text-slate-300">
                    {job.cron_expression}
                  </td>

                  {/* Current Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`border rounded-full inline-flex items-center text-[11px] py-0.5 px-2 ${
                        job.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : job.status === "Paused"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : job.status === "Failing"
                              ? "bg-rose-500/10 text-rose-400 border-slate-rose/20"
                              : "bg-slate-500/10 text-slate-400 border-slate-slate/20"
                      }`}
                    >
                      <span
                        className={`h-1 w-1 rounded-full me-1.5 ${
                          job.status === "Active"
                            ? "bg-emerald-400"
                            : job.status === "Paused"
                              ? "bg-amber-400"
                              : job.status === "Failing"
                                ? "bg-rose-400"
                                : "bg-slate-400"
                        }`}
                      ></span>
                      {job.status}
                    </span>
                  </td>

                  {/* Operational Control Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="inline-flex items-center space-x-2.5 text-slate-400">
                      {/* PLAY / PAUSE TOGGLE BUTTON */}
                      <button
                        type="button"
                        title={
                          job.status === "Paused" ? "Resume Job" : "Pause Job"
                        }
                        className={`p-1.5 rounded-lg border transition-all duration-150 ${
                          job.status === "Paused"
                            ? "border-emerald-500/20 hover:bg-emerald-500/10 hover:text-emerald-400"
                            : "border-amber-500/20 hover:border-amber-500/20 hover:bg-amber-500/10 hover:text-amber-400"
                        }`}
                      >
                        {job.status === "Paused" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-4 h-4"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>

                      {/* RETIRE / TRASHCAN BUTTON */}
                      <button
                        type="button"
                        title="Retire Job"
                        className="p-1.5 rounded-lg border border-rose-400/20 hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-500 transition-all duration-150"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.8}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.34 6m-4.74 0l-.34-6m4.74-3.342.124-1.33a.75.75 0 0 0-.711-.833H10.16a.75.75 0 0 0-.711.833l.124 1.33m4.773 0A48.584 48.584 0 0 0 12 4.5c-2.408 0-4.717.1-6.917.287m13.717 0a48.544 48.544 0 0 1-5.714 2.136m-6.22 3.965l.847 13.13a2.25 2.25 0 0 0 2.247 2.11H15.75a2.25 2.25 0 0 0 2.247-2.11l.847-13.13m-14.73 0c.2-.203.475-.327.78-.327h13.86c.305 0 .58.124.78.327"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
