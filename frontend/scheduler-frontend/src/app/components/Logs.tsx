export default function Logs() {
    return (
        <div className="mt-8 w-full bg-slate-900 rounded-xl border border-slate-800 p-6">
            <h3 className="text-left text-base font-semibold text-white">
              System Execution Logs
            </h3>
            <h4 className="text-xs text-slate-400 font-mono mb-2">
              Showing historical traces for: core-api-heartbeat
            </h4>
            <table className="w-full min-w-full table-auto border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/40 text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                  <th className="px-4 py-3">Timestamp (UTC)</th>
                  <th className="px-4 py-3">Execution Window</th>
                  <th className="px-4 py-3">Response Status</th>
                  <th className="px-4 py-3">
                    Incident Details / Payload traces
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* SUCCESS ROW EXAMPLE */}
                <tr className="border-b border-slate-800/40 hover:bg-slate-800/10 transition-colors duration-150">
                  {/* Column 1 */}
                  <td className="px-4 py-3.5 text-left text-xs text-white font-mono whitespace-nowrap">
                    2026-06-04 13:31:49
                  </td>
                  {/* Column 2 */}
                  <td className="px-4 py-3.5 text-left font-mono text-xs text-slate-400 whitespace-nowrap">
                    42ms
                  </td>
                  {/* Column 3 */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      200
                    </span>
                  </td>
                  {/* Column 4 */}
                  <td className="px-4 py-3.5 text-left font-mono text-xs text-slate-400 max-w-xl truncate">
                    OK - Request completed successfully
                  </td>
                </tr>

                {/* FAILURE ROW EXAMPLE */}
                <tr className="border-b border-slate-800/40 hover:bg-slate-800/10 transition-colors duration-150">
                  {/* Column 1 */}
                  <td className="px-4 py-3.5 text-left text-xs text-white font-mono whitespace-nowrap">
                    2026-06-04 13:32:10
                  </td>
                  {/* Column 2 */}
                  <td className="px-4 py-3.5 text-left font-mono text-xs text-slate-400 whitespace-nowrap">
                    0ms
                  </td>
                  {/* Column 3 */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      500
                    </span>
                  </td>
                  {/* Column 4 */}
                  <td className="px-4 py-3.5 text-left font-mono text-xs text-rose-400 max-w-xl truncate">
                    Status Code 500: Internal Server Error
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
    )
}