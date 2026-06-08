"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Nav from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import GlobalLogs from "./components/GlobalLogs";
import ArchivedJobs from "./components/ArchivedJobs";

interface Job {
  id: number;
  name: string;
  target_url: string;
  cron_expression: string;
  status: "Active" | "Paused" | "Failing" | "Retired" | null;
}

export default function Home() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [activeView, setActiveView] = useState<
    "dashboard" | "logs" | "archived"
  >("dashboard");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getInitialServerData() {
      try {
        const response = await axios.get("http://localhost:3000/api/endpoints");
        setAllJobs(response.data.data || response.data || []);
      } catch (err) {
        console.error("Failed to seed layout telemetry constraints", err);
      } finally {
        setLoading(false);
      }
    }
    getInitialServerData();
  }, []);

  return (
    <div className="h-screen w-screen flex bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar navigation controls with view synchronization mapping hooks */}
      <aside className="h-full w-56 flex-shrink-0">
        <Nav activeView={activeView} onViewChange={setActiveView} />
      </aside>

      <div className="flex-1 flex flex-col h-full min-w-0">
        <Header />

        <main className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-slate-800">
          {loading ? (
            <div className="h-full w-full flex items-center justify-center text-sm font-mono text-slate-400 animate-pulse">
              Connecting to Cluster Node...
            </div>
          ) : (
            <>
              {/* VIEW 1: CENTRAL CONTROL DASHBOARD */}
              {activeView === "dashboard" && (
                <Dashboard initialJobs={allJobs} />
              )}

              {/* VIEW 2: HISTORICAL TELEMETRY LOGS FOCUS PANEL */}
              {activeView === "logs" && (
                <div className="space-y-6">
                  <GlobalLogs />
                </div>
              )}

              {/* VIEW 3: ARCHIVED AND RETIRED JOBS LEDGER */}
              {activeView === "archived" && (
                <div className="space-y-6">
                  <ArchivedJobs
                    allJobs={allJobs}
                    onStatusToggle={(jobId, nextStatus) => {
                      setAllJobs((prevJobs) =>
                        prevJobs.map((job) =>
                          job.id === jobId
                            ? { ...job, status: nextStatus }
                            : job,
                        ),
                      );
                    }}
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
