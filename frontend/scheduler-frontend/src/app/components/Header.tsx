export default function Header() {
  return (
    <div className="h-20 bg-slate-900 border-b border-slate-800 flex justify-between items-center px-8">
      <div className="text-xl font-semibold">System Overview</div>
      <div className="border px-3 py-1 text-xs font-md border-emerald-400 rounded-full text-white flex items-center bg-slate-800/50">
        <div className="h-1.5 w-1.5 rounded-full me-1 bg-emerald-400 animate-pulse"></div>
        ENGINE RUNNING
      </div>
    </div>
  );
}
