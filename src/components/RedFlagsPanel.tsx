import type { RiskResult, Scenario } from '../types';

export function RedFlagsPanel({ scenario, risk }: { scenario: Scenario; risk: RiskResult }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Red Flags</h2>

      {risk.redFlags.length === 0 ? (
        <p className="mt-4 text-sm text-emerald-400">No red flags detected — all verification checks passed.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {risk.redFlags.map((flag, i) => (
            <li key={i} className="flex gap-3 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-slate-200">
              <span className="mt-0.5 text-red-400">&#9888;</span>
              <span>{flag}</span>
            </li>
          ))}
        </ul>
      )}

      {scenario.sanctionsHits.length > 0 && (
        <div className="mt-5 border-t border-slate-800 pt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sanctions / Maritime Watchlist Hits (Tavily)</h3>
          <ul className="mt-2 space-y-2">
            {scenario.sanctionsHits.map((hit, i) => (
              <li key={i} className="text-xs text-slate-400">
                <span className="font-medium text-slate-200">{hit.entityName}</span> — {hit.listName} ({Math.round(hit.matchConfidence * 100)}% confidence)
                <div className="text-slate-500">{hit.detail}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
