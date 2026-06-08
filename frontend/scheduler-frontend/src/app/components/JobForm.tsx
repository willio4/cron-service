"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface JobFormProps {
  onJobAdded: (newJob: any) => void;
}

export default function JobForm({ onJobAdded }: JobFormProps) {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [endpoint, setEndpoint] = useState<string>("");
  const [cron, setCron] = useState<string>("");

  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleEndpoint(e: React.ChangeEvent<HTMLInputElement>) {
    setEndpoint(e.target.value);
  }

  function handleCron(e: React.ChangeEvent<HTMLInputElement>) {
    setCron(e.target.value);
  }

  async function handleSubmit(cronName: string, cronUrl: string, cronExpression: string) {
    try {
      const date = new Date().toISOString();
      
      const response = await axios.post(`http://localhost:3000/api/endpoints`, {
        name: cronName,
        target_url: cronUrl,
        cron_expression: cronExpression,
        status: "Active",
        next_run_time: date,
      });

      setName("");
      setEndpoint("");
      setCron("");
      
      const newJobData = response.data.endpoint || response.data.data || response.data;
      if (newJobData) {
        onJobAdded(newJobData);
      }
      
      router.refresh(); 
    } catch (err) {
      alert("Cron could not be created: " + err);
    }
  }

  return (
    <div className="mt-8 bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-xl">
      {/* Fixed heading token lookup rule */}
      <h3 className="text-base text-white font-semibold mb-6 text-center tracking-tight">
        Register Core Endpoint
      </h3>
      
      <form
        className="flex flex-col space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(name, endpoint, cron);
        }}
      >
        {/* Input Block 1: System Identification */}
        <div className="flex flex-col space-y-1.5">
          <label
            htmlFor="job"
            className="block text-xs font-medium text-slate-400 uppercase tracking-wider"
          >
            Job System Name
          </label>
          <input
            type="text"
            id="job"
            value={name}
            onChange={handleName}
            className="bg-slate-950 border border-slate-800 focus:border-slate-700 outline-none px-4 h-10 rounded-lg w-full text-sm text-white placeholder-slate-600 transition-all"
            placeholder="e.g., core-api-heartbeat"
            required
          />
        </div>

        {/* Input Block 2: Network Destination URL */}
        <div className="flex flex-col space-y-1.5">
          <label
            htmlFor="endpoint"
            className="block text-xs font-medium text-slate-400 uppercase tracking-wider"
          >
            Target Webhook / API URL
          </label>
          <input
            type="url"
            id="endpoint"
            value={endpoint}
            onChange={handleEndpoint}
            className="bg-slate-950 border border-slate-800 focus:border-slate-700 outline-none px-4 h-10 rounded-lg w-full font-mono text-xs text-slate-300 placeholder-slate-600 transition-all"
            placeholder="https://api.domain.com/v1/health"
            required
          />
        </div>

        {/* Input Block 3: Scheduling Ruleset Expression */}
        <div className="flex flex-col space-y-1.5">
          <label
            htmlFor="cron"
            className="block text-xs font-medium text-slate-400 uppercase tracking-wider"
          >
            Cron Expression Intervals
          </label>
          <input
            type="text"
            id="cron"
            value={cron}
            onChange={handleCron}
            className="bg-slate-950 border border-slate-800 focus:border-slate-700 outline-none px-4 h-10 rounded-lg w-full font-mono text-xs text-slate-300 placeholder-slate-600 transition-all"
            placeholder="*/5 * * * *"
            required
          />
        </div>

        {/* Deploy Action Button */}
        <button
          type="submit"
          className="w-full h-10 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-sm rounded-lg shadow-md transition-all duration-150 mt-2"
        >
          Deploy Job Configuration
        </button>
      </form>
    </div>
  );
}