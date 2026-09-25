import type { RiskResult, Scenario } from '../types';

export function generateBrief(scenario: Scenario, risk: RiskResult): string {
  const date = new Date().toISOString().slice(0, 10);
  const ubo = scenario.entities.find((e) => e.role === 'ubo' || e.role === 'sanctioned_match');

  const lines = [
    'EXECUTIVE ENFORCEMENT BRIEF',
    'MineralShield AI — Climate Intelligence Build Day',
    `Generated ${date}  |  Legal basis: ${scenario.eoBasis}`,
    '='.repeat(60),
    '',
    `SHIPMENT: ${scenario.shipment.shipmentId} — ${scenario.shipment.commodity} (HS ${scenario.shipment.hsCode})`,
    `ROUTE: ${scenario.shipment.originPort} -> ${scenario.shipment.destinationPort} aboard ${scenario.shipment.vesselName} (${scenario.shipment.vesselFlag})`,
    `DECLARED VOLUME: ${scenario.shipment.declaredVolumeTons.toLocaleString()}t (loaded ${scenario.shipment.loadDate})`,
    '',
    `MULTI-TIER ORIGIN DIVERGENCE SCORE: ${risk.score}/100`,
    `VERDICT: ${risk.verdict}`,
    '',
    'RISK FACTOR BREAKDOWN:',
    ...risk.factors.map((f) => `  [${f.triggered ? 'X' : ' '}] (${f.points}/${f.weight}) ${f.label} — ${f.detail}`),
    '',
    'BENEFICIAL OWNERSHIP:',
    ubo
      ? `  Ultimate beneficial owner resolved: ${ubo.name} (${ubo.jurisdiction})${ubo.sanctioned ? ` — SANCTIONS MATCH: ${ubo.sanctionsList}, confidence ${(ubo.matchConfidence ?? 0) * 100}%` : ' — no adverse match'}`
      : '  No UBO entity flagged.',
    '',
    'SUPPLY CHAIN VERIFICATION (Tier 1 -> Tier 3):',
    ...scenario.bomTiers.map((t) => `  ${t.label}: ${t.entityName} (${t.location}) — ${t.verified ? 'VERIFIED' : 'UNVERIFIED'} — ${t.note}`),
    '',
    risk.redFlags.length ? 'RED FLAGS:' : 'RED FLAGS: none',
    ...risk.redFlags.map((r) => `  - ${r}`),
    '',
    'SOURCES CONSULTED:',
    ...scenario.sourcesChecked.map((s) => `  - ${s}`),
    '',
    '-'.repeat(60),
    risk.score >= 60
      ? 'RECOMMENDATION: Suspend clearance pending OFAC/BIS referral and manual UBO re-verification. Hold buyer notification per compliance protocol.'
      : risk.score >= 30
        ? 'RECOMMENDATION: Route to secondary compliance review before clearance; request supplemental Tier 3 documentation.'
        : 'RECOMMENDATION: Clear for standard processing. No further action required.',
  ];

  return lines.join('\n');
}

export function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
