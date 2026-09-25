const ENABLER_DATA = {
  targetVessel: 'MT Kestrel Horizon',
  imo: 'IMO 9123841',
  flag: 'Panama (Flag of Convenience)',
  shipManager: 'Apex Maritime Management FZE',
  jurisdiction: 'Dubai, UAE',
  registeredFleetSize: 18,
  crossTradeRiskScore: 96,
  crossTradeVerdict: 'CRITICAL RISK',
  indicators: [
    {
      type: 'Dual Cargo Facilitator',
      detail: 'Manages 4 tankers carrying Russian ESPO oil and 3 tankers handling Iranian light crude.',
    },
    {
      type: 'STS Service Provider',
      detail: 'Coordinates unflagged STS tugs & bunkering in Malacca Strait and Fujairah anchorage.',
    },
  ],
  networkOverlap: [
    {
      entity: 'Aura Marine Services India Pvt',
      role: 'Tug & Bunkering Provider',
      touchpoints: ['EU July 2026 List', 'OFAC Iranian Fleet Annex'],
    },
  ],
};

export function EnablerNetworkPanel() {
  const d = ENABLER_DATA;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#a3b8ad]">Enabler Network Analysis</h2>
          <p className="mt-1 text-sm text-white">
            {d.targetVessel} <span className="text-[#a3b8ad]">({d.imo})</span>
          </p>
          <p className="text-xs text-[#a3b8ad]/70">Flag: {d.flag}</p>
        </div>
        <span className="rounded-full border border-red-500/30 bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-400">
          {d.crossTradeRiskScore}/100 ({d.crossTradeVerdict})
        </span>
      </div>

      <div className="mt-5 grid gap-3 rounded-lg border border-white/10 bg-[#06120b]/60 p-4 sm:grid-cols-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#a3b8ad]/70">Ship Manager</p>
          <p className="mt-0.5 text-sm text-white">{d.shipManager}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#a3b8ad]/70">Jurisdiction</p>
          <p className="mt-0.5 text-sm text-white">{d.jurisdiction}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#a3b8ad]/70">Registered Fleet</p>
          <p className="mt-0.5 text-sm text-white">{d.registeredFleetSize} vessels</p>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#a3b8ad]/70">Indicators</h3>
        <ul className="mt-2 space-y-2">
          {d.indicators.map((ind) => (
            <li key={ind.type} className="flex gap-3 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-white">
              <span className="mt-0.5 text-red-400">&#9888;</span>
              <span>
                <span className="font-medium">{ind.type}</span> — <span className="text-[#a3b8ad]">{ind.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 border-t border-white/10 pt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#a3b8ad]/70">Network Overlap Matches</h3>
        <ul className="mt-2 space-y-2">
          {d.networkOverlap.map((m) => (
            <li key={m.entity} className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-medium text-white">{m.entity}</span>
                <span className="text-xs text-[#a3b8ad]">{m.role}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {m.touchpoints.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-medium text-red-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
