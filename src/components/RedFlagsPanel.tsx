import type { RiskResult, Scenario } from '../types';

export function RedFlagsPanel({ scenario, risk }: { scenario: Scenario; risk: RiskResult }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-[#a3b8ad]">Red Flags</h2>

      {risk.redFlags.length === 0 ? (
        <p className="mt-4 text-sm text-emerald-400">No red flags detected — all verification checks passed.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {risk.redFlags.map((flag, i) => (
            <li key={i} className="flex gap-3 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-white">
              <span className="mt-0.5 text-red-400">&#9888;</span>
              <span>{flag}</span>
            </li>
          ))}
        </ul>
      )}

      {scenario.sanctionsHits.length > 0 && (
        <div className="mt-5 border-t border-white/10 pt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#a3b8ad]/70">Sanctions / Maritime Watchlist Hits (Tavily)</h3>
          <ul className="mt-2 space-y-2">
            {scenario.sanctionsHits.map((hit, i) => (
              <li key={i} className="text-xs text-[#a3b8ad]">
                <span className="font-medium text-white">{hit.entityName}</span> — {hit.listName} ({Math.round(hit.matchConfidence * 100)}% confidence)
                <div className="text-[#a3b8ad]/70">{hit.detail}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
