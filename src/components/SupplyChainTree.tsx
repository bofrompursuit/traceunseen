import type { Scenario } from '../types';

export function SupplyChainTree({ scenario }: { scenario: Scenario }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Tiered Supply Chain</h2>
      <p className="mt-1 text-xs text-slate-500">
        Declared volume {scenario.shipment.declaredVolumeTons.toLocaleString()}t · Implied annual{' '}
        {scenario.impliedAnnualVolumeTons.toLocaleString()}t vs. mine capacity{' '}
        {scenario.declaredMineCapacityTonsPerYear.toLocaleString()}t/yr
      </p>

      <div className="mt-5 space-y-3">
        {scenario.bomTiers.map((t, i) => (
          <div key={t.tier} className="relative pl-6">
            {i < scenario.bomTiers.length - 1 && (
              <span className="absolute left-[9px] top-6 h-full w-px bg-slate-700" aria-hidden />
            )}
            <span
              className={`absolute left-0 top-1.5 h-[18px] w-[18px] rounded-full border-2 ${
                t.verified ? 'border-emerald-500 bg-emerald-500/20' : 'border-red-500 bg-red-500/20'
              }`}
              aria-hidden
            />
            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-100">{t.label}</span>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${
                    t.verified
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                      : 'border-red-500/30 bg-red-500/10 text-red-400'
                  }`}
                >
                  {t.verified ? 'Verified' : 'Unverified'}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-300">{t.entityName}</p>
              <p className="text-xs text-slate-500">{t.location}</p>
              <p className="mt-1 text-xs text-slate-400">{t.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
