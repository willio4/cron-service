"use client";

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

export default function Summary({ allJobs }: TableProps) {
  const totalActiveJobs = allJobs.filter((j) => j.status === "Active").length;
  const totalPausedJobs = allJobs.filter((j) => j.status === "Paused").length;
  const totalFailingJobs = allJobs.filter((j) => j.status === "Failing").length;
  const totalMonitored = allJobs.filter((j) => j.status !== "Retired").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* CARD 1: ACTIVE JOBS COUNTER */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 flex flex-col space-y-2 shadow-md">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          Active Automations
        </span>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl text-white font-bold font-mono">
            {totalActiveJobs}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            / {totalMonitored} monitored
          </span>
        </div>
      </div>

      {/* CARD 2: PAUSED JOBS COUNTER */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 flex flex-col space-y-2 shadow-md">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          Paused Triggers
        </span>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl text-amber-400 font-bold font-mono">
            {totalPausedJobs}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            in standby
          </span>
        </div>
      </div>

      {/* CARD 3: FAILING TASKS ALERTS */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 flex flex-col space-y-2 shadow-md relative overflow-hidden">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          Failing Tasks
        </span>
        <span className={`text-2xl font-bold font-mono ${
          totalFailingJobs > 0 ? "text-rose-400 animate-pulse" : "text-slate-500"
        }`}>
          {totalFailingJobs}
        </span>
        {/* Subtle decorative alert accent lines */}
        {totalFailingJobs > 0 && (
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-rose-500" />
        )}
      </div>

      {/* CARD 4: OVERALL SYSTEM HEALTH INDEX */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 flex flex-col space-y-2 shadow-md">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          System Operational Core
        </span>
        <span className={`text-2xl font-bold font-mono ${
          totalFailingJobs > 0 ? "text-amber-400" : "text-emerald-400"
        }`}>
          {totalMonitored === 0 
            ? "100.0%" 
            : `${(( (totalMonitored - totalFailingJobs) / totalMonitored) * 100).toFixed(1)}%`}
        </span>
      </div>

    </div>
  );
}