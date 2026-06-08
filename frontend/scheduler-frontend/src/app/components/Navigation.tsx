import Image from "next/image";

interface NavProps {
  activeView: string;
  onViewChange: (view: "dashboard" | "logs" | "archived") => void;
}

export default function Nav({ activeView, onViewChange }: NavProps) {
  return (
    <div className="h-full w-56 bg-slate-900 border-r border-slate-800 flex flex-col select-none">
      <div className="h-20 font-bold text-lg flex items-center justify-center border-b border-slate-800/40">
        <Image
          src="/favicon.ico"
          alt="logo"
          width={32}
          height={32}
          className="me-2"
        />
        Cron - OS
      </div>
      
      <div className="space-y-1 px-3 mt-4 flex-1">
        {/* DASHBOARD SELECTION BUTTON */}
        <button 
          onClick={() => onViewChange("dashboard")}
          className={`h-10 px-4 rounded-lg font-medium text-sm flex items-center w-full text-left transition-all duration-150 ${
            activeView === "dashboard"
              ? "bg-slate-800/60 text-white border border-slate-700/30 shadow-sm"
              : "text-slate-400 hover:bg-slate-800/30 hover:text-white"
          }`}
        >
          Dashboard
        </button>

        {/* HISTORY LOGS SELECTION BUTTON */}
        <button 
          onClick={() => onViewChange("logs")}
          className={`h-10 px-4 rounded-lg text-sm font-medium flex items-center w-full text-left transition-all duration-150 ${
            activeView === "logs"
              ? "bg-slate-800/60 text-white border border-slate-700/30 shadow-sm"
              : "text-slate-400 hover:bg-slate-800/30 hover:text-white"
          }`}
        >
          History Logs
        </button>

        {/* ARCHIVED JOBS SELECTION BUTTON */}
        <button 
          onClick={() => onViewChange("archived")}
          className={`h-10 px-4 rounded-lg text-sm font-medium flex items-center w-full text-left transition-all duration-150 ${
            activeView === "archived"
              ? "bg-slate-800/60 text-white border border-slate-700/30 shadow-sm"
              : "text-slate-400 hover:bg-slate-800/30 hover:text-white"
          }`}
        >
          Archived Jobs
        </button>
      </div>
    </div>
  );
}