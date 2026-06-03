import Image from "next/image";

export default function Nav() {
    return (
        <div className="h-dvh w-55 bg-slate-900 border-r border-slate-800">
        <div className="h-20 font-bold text-lg flex items-center justify-center">
          <Image
            src="/favicon.ico"
            alt="logo"
            width={32}
            height={32}
            className="me-2"
          />
          Cron - OS
        </div>
        <div className="space-y-1 px-3 mt-1">
          <button className="h-11 px-4 rounded-md bg-slate-800/50 text-white flex items-center w-full text-left">
            Dashboard
          </button>
          <button className="h-11 px-4 rounded-md text-slate-400 transition hover:bg-slate-800/30 hover:text-white flex items-center w-full text-left">
            History Logs
          </button>
          <button className="h-11 px-4 rounded-md text-slate-400 transition hover:bg-slate-800/30 hover:text-white flex items-center w-full text-left">
            Archived Jobs
          </button>
        </div>
      </div>
    );
}