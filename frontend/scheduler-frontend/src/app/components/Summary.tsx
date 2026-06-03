export default function Summary() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 flex flex-col space-y-1">
        <span className="text-xs font-medium text-slate-400 min-h-1/2 max-h-1/2">Total Active Jobs</span>
        <span className="text-xl text-white font-bold">12</span>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 flex flex-col space-y-1">
        <span className="text-xs font-medium text-slate-400 min-h-1/2 max-h-1/2">Avg Success Rate</span>
        <span className="text-xl text-emerald-400 font-bold">98.4%</span>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 flex flex-col space-y-1">
        <span className="text-xs font-medium text-slate-400 min-h-1/2 max-h-1/2">Failing Tasks</span>
        <span className="text-xl text-rose-400 font-bold">1</span>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 flex flex-col space-y-1 overflow-y-">
        <span className="text-xs font-medium text-slate-400 min-h-1/2 max-h-1/2">Next Execution In</span>
        <span className="text-xl text-amber-400 font-bold">2m 14s</span>
      </div>
    </div>
  );
}
