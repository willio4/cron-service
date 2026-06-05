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
    console.log(e.target.value);
  }

  function handleEndpoint(e: React.ChangeEvent<HTMLInputElement>) {
    setEndpoint(e.target.value);
    console.log(e.target.value);
  }

  function handleCron(e: React.ChangeEvent<HTMLInputElement>) {
    setCron(e.target.value);
    console.log(e.target.value);
  }

  async function handleSubmit(cronName: string, cronUrl: string, cronExpression: string) {
    try {
      const date = new Date().toISOString();
      const response = await axios.post(`http://localhost:3000/api/endpoints`, {
        name: `${cronName}`,
        target_url: `${cronUrl}`,
        cron_expression: `${cronExpression}`,
        status: "Active",
        next_run_time: `${date}`,
      });

      setName("");
      setEndpoint("");
      setCron("");
      
      // 🟢 Send the server's clean response object straight up to the dashboard state array
      if (response.data.endpoint) {
        onJobAdded(response.data.endpoint);
      }
      
      router.refresh(); // Keeps server component cache completely warm in the background
    } catch (err) {
      alert("Cron could not be created: " + err);
    }
  }

  return (
    <div className="mt-8 bg-slate-900 rounded-xl border border-slate-800 p-6">
      <div className="text-base text-heading font-semibold mb-5 text-center">
        Register Core Endpoint
      </div>
      <form
        className="flex flex-col space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(name, endpoint, cron);
        }}
      >
        <div className="mb-5">
          <label
            htmlFor="job"
            className="block mb-1 text-xs font-medium text-slate-400"
          >
            Job System Name
          </label>
          <input
            type="text"
            id="job"
            value={name}
            onChange={handleName}
            className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-md w-full"
            placeholder="e.g., core-api-heartbeat"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="endpoint"
            className="block mb-1 text-xs font-medium text-slate-400"
          >
            Target Webhook / API URL
          </label>
          <input
            type="url"
            id="endpoint"
            value={endpoint}
            onChange={handleEndpoint}
            className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-md w-full font-mono"
            placeholder="https://api.domain.com/v1/health"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="cron"
            className="block mb-1 text-xs font-medium text-slate-400"
          >
            Cron Expression Intervals
          </label>
          <input
            type="text"
            id="cron"
            value={cron}
            onChange={handleCron}
            className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-md w-full font-mono"
            placeholder="*/5 * * * *"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full h-10 bg-indigo-600 font-semibold text-sm rounded-md"
        >
          Deploy Job Configuration
        </button>
      </form>
    </div>
  );
}
