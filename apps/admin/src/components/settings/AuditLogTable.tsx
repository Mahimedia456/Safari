import type {
  AuditLog,
} from "../../types/settings";

export default function AuditLogTable({
  logs,
}: {
  logs: AuditLog[];
}) {
  return (
    <div className="safari-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-100 bg-slate-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <tr>
              {[
                "Date",
                "Actor",
                "Action",
                "Module",
                "Description",
                "IP Address",
              ].map(
                (label) => (
                  <th
                    key={label}
                    className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400"
                  >
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {logs.map(
              (log) => (
                <tr
                  key={log.id}
                  className="border-b border-slate-100 last:border-0 dark:border-white/[0.05]"
                >
                  <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-400">
                    {new Date(
                      log.createdAt,
                    ).toLocaleString()}
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {log.actorName}
                    </div>

                    <div className="mt-1 text-xs text-slate-400">
                      {log.actorEmail}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-safari-50 px-2.5 py-1 text-xs font-semibold text-safari-700 dark:bg-safari-500/10 dark:text-safari-400">
                      {log.action.replaceAll(
                        "_",
                        " ",
                      )}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {log.module}
                  </td>

                  <td className="max-w-lg px-5 py-4 text-sm text-slate-500">
                    {
                      log.description
                    }
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-slate-400">
                    {
                      log.ipAddress
                    }
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}