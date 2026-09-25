import type { RiskResult, Scenario } from '../types';

/**
 * Builds a Medallion-shaped payload (bronze/silver/gold) for Microsoft
 * Fabric Lakehouse / DirectLake ingestion.
 *   bronze -> raw tool-call output, as retrieved
 *   silver -> normalized/joined entity + shipment record
 *   gold   -> scored risk metrics ready for BI consumption
 */
export function buildFabricPayload(scenario: Scenario, risk: RiskResult) {
  return {
    schema: 'mineralshield.fabric.v1',
    generatedAt: new Date().toISOString(),
    eoBasis: scenario.eoBasis,
    bronze: {
      sayari: {
        entities: scenario.entities,
        ownershipEdges: scenario.ownershipEdges,
      },
      tradeverifyd: {
        manifest: scenario.shipment,
        bomTiers: scenario.bomTiers,
      },
      tavily: {
        sanctionsHits: scenario.sanctionsHits,
        sourcesChecked: scenario.sourcesChecked,
      },
    },
    silver: {
      shipmentId: scenario.shipment.shipmentId,
      commodityFamily: scenario.commodityFamily,
      hsCode: scenario.shipment.hsCode,
      declaredVolumeTons: scenario.shipment.declaredVolumeTons,
      declaredMineCapacityTonsPerYear: scenario.declaredMineCapacityTonsPerYear,
      impliedAnnualVolumeTons: scenario.impliedAnnualVolumeTons,
      ultimateBeneficialOwners: scenario.entities.filter((e) => e.role === 'ubo' || e.role === 'sanctioned_match'),
      bomTierCompleteness: `${scenario.bomTiers.filter((t) => t.verified).length}/${scenario.bomTiers.length}`,
    },
    gold: {
      multiTierOriginDivergenceScore: risk.score,
      verdict: risk.verdict,
      riskFactors: risk.factors,
      redFlags: risk.redFlags,
    },
  };
}

export function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
