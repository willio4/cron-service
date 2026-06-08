"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface LogEntry {
  id: string; 
  executed_at: string;
  execution_time_ms: number;
  response_status: string;
  error_message: string | null;
}

interface LogsProps {
  activeJobId: number | null;
}

export default function Logs({ activeJobId }: LogsProps) {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  {/* Pagination State Configuration */}
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    if (!activeJobId) return;

    setCurrentPage(1);

    async function fetchTraces(isPolling = false) {
      if (!isPolling) setLoading(true); 
      try {
        const res = await axios.get(`http://localhost:3000/api/endpoints/logs/${activeJobId}`);
        setLogEntries(res.data.logs || res.data || []);
      } catch (err) {
        console.error("Failed to pull system telemetry logs", err);
      } finally {
        if (!isPolling) setLoading(false);
      }
    }

    fetchTraces(false);

    const pollingInterval = setInterval(() => {
      fetchTraces(true);
    }, 10000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, [activeJobId]);

  if (!activeJobId) {
    return (
      <div className="mt-8 w-full bg-slate-900 rounded-xl border border-slate-800 p-8 text-center text-sm text-slate-500 shadow-xl">
        Select a cron record from the inventory grid above to review historical trace data.
      </div>
    );
  }

  const totalPages = Math.ceil(logEntries.length / ITEMS_PER_PAGE) || 1;
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentPagedRows = logEntries.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="mt-8 w-full bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <div>
          <h3 className="text-left text-base font-semibold text-white">
            System Execution Logs
          </h3>
          <h4 className="text-xs text-slate-400 font-mono">
            Showing historical traces for ID: {activeJobId}
          </h4>
        </div>
        
        {/* Quick Page Indicator Accent */}
        <div className="text-[11px] font-mono bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 text-slate-400 self-start md:self-auto">
          PAGE {currentPage} OF {totalPages}
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-sm font-mono text-slate-400 animate-pulse">
          Fetching system trace buffers...
        </div>
      ) : logEntries.length === 0 ? (
        <div className="py-12 text-center text-sm font-mono text-slate-500">
          No execution logs recorded for this endpoint yet.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-full table-auto border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/40 text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                  <th className="px-4 py-3">Timestamp (UTC)</th>
                  <th className="px-4 py-3">Execution Window</th>
                  <th className="px-4 py-3">Response Status</th>
                  <th className="px-4 py-3">Incident Details / Payload traces</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/40">
                {currentPagedRows.map((log) => {
                  const isSuccess = Number(log.response_status) >= 200 && Number(log.response_status) < 300;
                  
                  return (
                    <tr 
                      key={log.id} 
                      className="hover:bg-slate-800/10 transition-colors duration-150"
                    >
                      {/* Timestamp */}
                      <td className="px-4 py-3.5 text-left text-xs text-white font-mono whitespace-nowrap">
                        {new Date(log.executed_at).toLocaleString()}
                      </td>
                      
                      {/* Latency */}
                      <td className="px-4 py-3.5 text-left font-mono text-xs text-slate-400 whitespace-nowrap">
                        {log.execution_time_ms}ms
                      </td>
                      
                      {/* Status Badge */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium font-mono border ${
                          isSuccess 
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        }`}>
                          {log.response_status}
                        </span>
                      </td>
                      
                      {/* Details / Error Message */}
                      <td className={`px-4 py-3.5 text-left font-mono text-xs max-w-xl truncate ${
                        isSuccess ? "text-slate-400" : "text-rose-400"
                      }`}>
                        {isSuccess ? "OK - Request completed successfully" : log.error_message || "Execution Failed"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Toolbar Footer */}
          <div className="mt-5 pt-4 flex flex-col sm:flex-row items-center justify-between border-t border-slate-800/60 gap-4">
            <div className="text-xs font-medium text-slate-400 order-2 sm:order-1">
              Showing <span className="text-white font-semibold">{indexOfFirstItem + 1}</span> to{" "}
              <span className="text-white font-semibold">{Math.min(indexOfLastItem, logEntries.length)}</span> of{" "}
              <span className="text-white font-semibold">{logEntries.length}</span> historical traces
            </div>

            <div className="flex items-center space-x-2 order-1 sm:order-2 w-full sm:w-auto justify-between sm:justify-end">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="h-8 px-3 text-xs font-medium rounded-md border border-slate-800 bg-slate-950/20 text-slate-300 hover:bg-slate-800/40 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-all duration-150"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="h-8 px-3 text-xs font-medium rounded-md border border-slate-800 bg-slate-950/20 text-slate-300 hover:bg-slate-800/40 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-all duration-150"
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