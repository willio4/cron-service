"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface GlobalLogEntry {
  id: string;
  executed_at: string;
  execution_time_ms: number;
  response_status: string;
  error_message: string | null;
  job_id: number
  jobs?: {
    name: string;
  };
}

export default function GlobalLogs() {
  const [logEntries, setLogEntries] = useState<GlobalLogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 15;

  async function fetchGlobalTraces(isPolling = false) {
    if (!isPolling) setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/endpoints/logs/all`);
      setLogEntries(res.data.logs || res.data || []);
    } catch (err) {
      console.error("Failed to fetch global trace buffer feed", err);
    } finally {
      if (!isPolling) setLoading(false);
    }
  }

  useEffect(() => {
    fetchGlobalTraces(false);

    const interval = setInterval(() => fetchGlobalTraces(true), 10000);
    return () => clearInterval(interval);
  }, []);

  const totalPages = Math.ceil(logEntries.length / ITEMS_PER_PAGE) || 1;
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentPagedRows = logEntries.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
        <div>
          <h2 className="text-lg font-semibold text-white tracking-tight">Global Live System Feed</h2>
          <p className="text-xs text-slate-400">
            Real-time telemetry streaming from all active operational cluster nodes.
          </p>
        </div>
        <div className="text-[11px] font-mono bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 text-slate-400 self-start sm:self-auto">
          PAGE {currentPage} OF {totalPages}
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm font-mono text-slate-400 animate-pulse">
          Opening global network telemetry stream...
        </div>
      ) : logEntries.length === 0 ? (
        <div className="py-20 text-center text-sm font-mono text-slate-500">
          No pipeline operations have generated trace records yet.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-full table-auto border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/40 text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                  <th className="px-4 py-3">Timestamp (UTC)</th>
                  <th className="px-4 py-3">Service Origin Target</th>
                  <th className="px-4 py-3">Latency Window</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Payload Trace Metrics / Diagnostics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {currentPagedRows.map((log) => {
                  const isSuccess = Number(log.response_status) >= 200 && Number(log.response_status) < 300;
                  return (
                    <tr key={log.id} className="hover:bg-slate-800/10 transition-colors duration-150">
                      {/* Timestamp */}
                      <td className="px-4 py-3.5 text-xs text-white font-mono whitespace-nowrap">
                        {new Date(log.executed_at).toLocaleString()}
                      </td>

                      {/* SERVICE ORIGIN IDENTIFIER IDENTIFICATION */}
                      <td className="px-4 py-3.5 text-xs font-semibold text-indigo-400 font-mono whitespace-nowrap">
                        {log.jobs?.name || `job-id: ${log.job_id}`}
                      </td>

                      {/* Latency */}
                      <td className="px-4 py-3.5 font-mono text-xs text-slate-400 whitespace-nowrap">
                        {log.execution_time_ms}ms
                      </td>

                      {/* Status Tag */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium font-mono border ${
                          isSuccess 
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        }`}>
                          {log.response_status}
                        </span>
                      </td>

                      {/* Messages Logs Details */}
                      <td className={`px-4 py-3.5 font-mono text-xs max-w-md truncate ${
                        isSuccess ? "text-slate-400" : "text-rose-400"
                      }`}>
                        {isSuccess ? "OK - Request completed successfully" : log.error_message || "Execution Error"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer Controls Component Layout */}
          <div className="mt-5 pt-4 flex items-center justify-between border-t border-slate-800/60 text-xs">
            <div className="text-slate-400">
              Showing <span className="text-white font-semibold">{indexOfFirstItem + 1}</span> to{" "}
              <span className="text-white font-semibold">{Math.min(indexOfLastItem, logEntries.length)}</span> of{" "}
              <span className="text-white font-semibold">{logEntries.length}</span> global trace rows
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="h-8 px-3 rounded-md border border-slate-800 bg-slate-950/20 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800/40"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="h-8 px-3 rounded-md border border-slate-800 bg-slate-950/20 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800/40"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}