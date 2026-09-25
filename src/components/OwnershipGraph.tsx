import type { Scenario } from '../types';

const roleStyle: Record<string, string> = {
  exporter: 'border-sky-500/40 bg-sky-500/10 text-sky-300',
  intermediary_holding: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
  ubo: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  sanctioned_match: 'border-red-500/50 bg-red-500/15 text-red-300',
  buyer: 'border-slate-600/40 bg-slate-700/20 text-slate-300',
};

const roleLabel: Record<string, string> = {
  exporter: 'Exporter',
  intermediary_holding: 'Intermediary',
  ubo: 'UBO',
  sanctioned_match: 'Sanctioned UBO',
  buyer: 'Buyer',
};

export function OwnershipGraph({ scenario }: { scenario: Scenario }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Beneficial Ownership Graph</h2>

      <div className="mt-4 space-y-2">
        {scenario.entities.map((e) => (
          <div key={e.id} className={`rounded-lg border p-3 ${roleStyle[e.role]}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{e.name}</span>
              <span className="rounded-full border border-current/30 px-2 py-0.5 text-[10px] font-semibold uppercase">
                {roleLabel[e.role]}
              </span>
            </div>
            <p className="mt-0.5 text-xs opacity-80">{e.jurisdiction}</p>
            {e.note && <p className="mt-1 text-xs opacity-70">{e.note}</p>}
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-slate-800 pt-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Resolved Chain</h3>
        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
          {scenario.ownershipEdges.map((edge, i) => {
            const from = scenario.entities.find((e) => e.id === edge.from);
            const to = scenario.entities.find((e) => e.id === edge.to);
            return (
              <span key={i} className="inline-flex items-center gap-1.5">
                <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-200">{from?.name.split(' ')[0]}</span>
                <span className="text-slate-600">
                  → {edge.relation}
                  {edge.pctOwnership ? ` (${edge.pctOwnership}%)` : ''} →
                </span>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-200">{to?.name.split(' ')[0]}</span>
                {i < scenario.ownershipEdges.length - 1 && <span className="text-slate-700">|</span>}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
