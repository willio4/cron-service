export default function Header() {
  return (
    <div className="h-20 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex justify-between items-center px-8 z-10">
      
      {/* Elevated Title Cluster */}
      <div className="flex flex-col">
        <span className="text-base font-semibold text-white tracking-tight">
          System Overview
        </span>
        <span className="text-[11px] font-mono text-slate-400 mt-0.5">
          Cluster: nv-las-vegas-01
        </span>
      </div>

      {/* Interactive Environment Elements */}
      <div className="flex items-center space-x-4">
        {/* Secondary Context Badge */}
        <div className="hidden sm:flex text-[11px] font-mono bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 text-slate-400">
          API: v1.0.4
        </div>

        {/* Upgraded Engine Status Pill */}
        <div className="border px-3 py-1 text-[11px] font-mono tracking-wider border-emerald-500/20 rounded-lg text-emerald-400 flex items-center bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
          <span className="relative flex h-1.5 w-1.5 me-2">
            {/* Pulsing ring halo trace effect */}
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          ENGINE RUNNING
        </div>
      </div>
    </div>
  );
}