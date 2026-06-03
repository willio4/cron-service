'use client';
export default function JobForm() {
  return (
    <div className="mt-8 bg-slate-900 rounded-xl border border-slate-800 p-6">
      <div className="text-base text-heading font-semibold mb-5 text-center">
        Register Core Endpoint
      </div>
      <form className="flex flex-col space-y-4">
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
