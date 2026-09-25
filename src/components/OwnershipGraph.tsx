import type { Scenario } from '../types';

const roleStyle: Record<string, string> = {
  exporter: 'border-[#00A8E8]/40 bg-[#00A8E8]/10 text-[#00A8E8]',
  intermediary_holding: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
  ubo: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  sanctioned_match: 'border-red-500/50 bg-red-500/15 text-red-300',
  buyer: 'border-white/15 bg-white/10 text-[#a3b8ad]',
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
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-[#a3b8ad]">Beneficial Ownership Graph</h2>

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

      <div className="mt-4 border-t border-white/10 pt-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#a3b8ad]/70">Resolved Chain</h3>
        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-[#a3b8ad]">
          {scenario.ownershipEdges.map((edge, i) => {
            const from = scenario.entities.find((e) => e.id === edge.from);
            const to = scenario.entities.find((e) => e.id === edge.to);
            return (
              <span key={i} className="inline-flex items-center gap-1.5">
                <span className="rounded bg-white/10 px-2 py-0.5 text-white">{from?.name.split(' ')[0]}</span>
                <span className="text-[#a3b8ad]/50">
                  → {edge.relation}
                  {edge.pctOwnership ? ` (${edge.pctOwnership}%)` : ''} →
                </span>
                <span className="rounded bg-white/10 px-2 py-0.5 text-white">{to?.name.split(' ')[0]}</span>
                {i < scenario.ownershipEdges.length - 1 && <span className="text-[#a3b8ad]/30">|</span>}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
