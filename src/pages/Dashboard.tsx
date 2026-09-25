import { useEffect, useMemo, useState } from 'react';
import { SCENARIOS, SCENARIO_A_HIGH_RISK } from '../data/mockScenarios';
import { runOrchestration } from '../lib/mcpTools';
import { computeRisk } from '../lib/riskEngine';
import { ShipmentSelector } from '../components/ShipmentSelector';
import { RiskScorecard } from '../components/RiskScorecard';
import { RedFlagsPanel } from '../components/RedFlagsPanel';
import { SupplyChainTree } from '../components/SupplyChainTree';
import { OwnershipGraph } from '../components/OwnershipGraph';
import { ExportPanel } from '../components/ExportPanel';
import { ShapeOfProblem } from '../components/ShapeOfProblem';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [scenarioId, setScenarioId] = useState(SCENARIO_A_HIGH_RISK.id);
  const [customQuery, setCustomQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const scenario = useMemo(
    () => SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIO_A_HIGH_RISK,
    [scenarioId],
  );

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    runOrchestration(scenario).then(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [scenario]);

  const risk = useMemo(() => computeRisk(scenario), [scenario]);

  return (
    <div className="min-h-screen bg-[#06120b] text-white">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#06120b]/70 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/" className="text-xs text-[#a3b8ad]/70 transition hover:text-[#eab308]">&larr; Home</Link>
              <h1 className="text-xl font-bold tracking-tight text-white">
                SupplySentinel<span className="text-[#eab308]">+</span> Solutions
              </h1>
              <p className="text-xs text-[#a3b8ad]/70">
                Critical Mineral Sanctions Evasion &amp; Dark Fleet Detection — TRACE THE UNSEEN, Climate Week NYC
              </p>
            </div>
            <span className="rounded-full border border-white/15 bg-[#0d1f15] px-3 py-1 text-xs text-[#a3b8ad]">
              {scenario.eoBasis}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-6 space-y-6">
        <ShipmentSelector
          scenario={scenario}
          onSelect={setScenarioId}
          loading={loading}
          customQuery={customQuery}
          onCustomQueryChange={setCustomQuery}
        />

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-[#a3b8ad]">
          <span className="font-medium text-white">{scenario.shipment.commodity}</span> (HS {scenario.shipment.hsCode}) ·{' '}
          {scenario.shipment.originPort} → {scenario.shipment.destinationPort} · {scenario.shipment.vesselName} (
          {scenario.shipment.vesselFlag}) · loaded {scenario.shipment.loadDate}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <RiskScorecard risk={risk} />
          <RedFlagsPanel scenario={scenario} risk={risk} />
        </div>

        <ShapeOfProblem />

        <div className="grid gap-6 lg:grid-cols-2">
          <SupplyChainTree scenario={scenario} />
          <OwnershipGraph scenario={scenario} />
        </div>

        <ExportPanel scenario={scenario} risk={risk} />

        <footer className="pb-8 pt-2 text-center text-xs text-[#a3b8ad]/50">
          Demo mode — Sayari / Tradeverifyd / Tavily calls are mocked with deterministic fallback data for reliable live demo.
        </footer>
      </main>
    </div>
  );
}
