import type { Scenario } from '../types';
import { SCENARIOS } from '../data/mockScenarios';

interface Props {
  scenario: Scenario;
  onSelect: (id: string) => void;
  loading: boolean;
  customQuery: string;
  onCustomQueryChange: (v: string) => void;
}

export function ShipmentSelector({ scenario, onSelect, loading, customQuery, onCustomQueryChange }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-[#a3b8ad]">Shipment / Supplier Lookup</h2>

      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          type="text"
          value={customQuery}
          onChange={(e) => onCustomQueryChange(e.target.value)}
          placeholder="Shipment ID, supplier name, or HS code (e.g. Battery-Grade Lithium)"
          className="w-full rounded-lg border border-white/15 bg-[#06120b] px-3 py-2 text-sm text-white placeholder:text-[#a3b8ad]/50 focus:border-[#eab308]/50 focus:outline-none"
        />
        <select
          value={scenario.id}
          onChange={(e) => onSelect(e.target.value)}
          className="rounded-lg border border-white/15 bg-[#06120b] px-3 py-2 text-sm text-white focus:border-[#eab308]/50 focus:outline-none"
        >
          {SCENARIOS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-[#a3b8ad]/70">
        <span className={`h-2 w-2 rounded-full ${loading ? 'animate-pulse bg-amber-400' : 'bg-emerald-500'}`} />
        {loading ? 'Orchestrating Sayari + Tradeverifyd + Tavily tool calls…' : 'Analysis complete — mock/fallback data (demo mode)'}
      </div>
    </div>
  );
}
