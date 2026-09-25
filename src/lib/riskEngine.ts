import type { RiskFactor, RiskResult, Scenario } from '../types';

/**
 * Multi-Tier Origin Divergence Score (0-100).
 * Weighted sum of five factors pulled from the orchestrated tool calls:
 *   - Sanctioned / FOCI beneficial ownership match       (30 pts)
 *   - Vessel anomaly: STS transfer + dark fleet / AIS gap (20 pts)
 *   - Shell / shared-address entity clustering             (15 pts)
 *   - Declared export volume vs. registered mine capacity  (20 pts)
 *   - Incomplete or unverified upstream BOM tiers           (15 pts)
 */
export function computeRisk(scenario: Scenario): RiskResult {
  const factors: RiskFactor[] = [];

  const sanctionedMatch = scenario.entities.some((e) => e.sanctioned) || scenario.sanctionsHits.some((h) => h.matchConfidence >= 0.6);
  factors.push({
    key: 'foci_ubo',
    label: 'Sanctioned / FOCI beneficial ownership match',
    weight: 30,
    points: sanctionedMatch ? 30 : 0,
    triggered: sanctionedMatch,
    detail: sanctionedMatch
      ? `UBO resolution surfaced a sanctions-list match: ${scenario.entities.find((e) => e.sanctioned)?.name ?? 'flagged entity'}.`
      : 'No sanctioned or foreign-owned-and-controlled entities found in the resolved ownership chain.',
  });

  const vesselAnomaly = scenario.shipment.stsTransfer || !!scenario.shipment.darkFleetIndicator;
  factors.push({
    key: 'vessel_anomaly',
    label: 'Vessel-to-vessel (STS) transfer / dark fleet indicator',
    weight: 20,
    points: vesselAnomaly ? 20 : 0,
    triggered: vesselAnomaly,
    detail: vesselAnomaly
      ? `STS transfer at ${scenario.shipment.stsLocation ?? 'undisclosed location'}${scenario.shipment.aisGapHours ? `, ${scenario.shipment.aisGapHours}h AIS gap` : ''}.`
      : 'Direct port-to-port routing with continuous AIS tracking.',
  });

  const shellCluster = scenario.entities.some((e) => (e.sharedAddressEntityCount ?? 0) > 5 || (e.formedMonthsAgo ?? 999) < 12);
  factors.push({
    key: 'shell_cluster',
    label: 'Shell entity / shared-address clustering',
    weight: 15,
    points: shellCluster ? 15 : 0,
    triggered: shellCluster,
    detail: shellCluster
      ? 'Exporter or intermediary entity shows shell-company characteristics (recent formation and/or high-density shared registered address).'
      : 'All entities show established formation history and no shared-address clustering.',
  });

  const volumeRatio = scenario.impliedAnnualVolumeTons / scenario.declaredMineCapacityTonsPerYear;
  const volumeDivergence = Math.max(0, volumeRatio - 1);
  const volumePoints = Math.min(20, Math.round(volumeDivergence * 20));
  factors.push({
    key: 'volume_divergence',
    label: 'Declared export volume vs. registered mine capacity',
    weight: 20,
    points: volumePoints,
    triggered: volumePoints > 0,
    detail: `Implied annual volume is ${volumeRatio.toFixed(2)}x the declared mine's registered capacity (${scenario.impliedAnnualVolumeTons.toLocaleString()}t vs. ${scenario.declaredMineCapacityTonsPerYear.toLocaleString()}t).`,
  });

  const unverifiedTiers = scenario.bomTiers.filter((t) => !t.verified).length;
  const bomPoints = Math.min(15, unverifiedTiers * 5 + (unverifiedTiers > 0 ? 5 : 0));
  factors.push({
    key: 'bom_completeness',
    label: 'Incomplete upstream BOM / tier verification',
    weight: 15,
    points: bomPoints,
    triggered: unverifiedTiers > 0,
    detail: unverifiedTiers > 0
      ? `${unverifiedTiers} of ${scenario.bomTiers.length} BOM tiers could not be verified against physical capacity or registration records.`
      : 'All tiers (finished goods, refined intermediate, raw origin) independently verified.',
  });

  const score = Math.min(100, factors.reduce((sum, f) => sum + f.points, 0));

  const redFlags = factors.filter((f) => f.triggered).map((f) => f.detail);

  const verdict: RiskResult['verdict'] =
    score >= 60 ? 'HIGH RISK — ESCALATE' : score >= 30 ? 'ELEVATED — REVIEW' : 'LOW RISK — CLEARED';

  return { score, factors, redFlags, verdict };
}
