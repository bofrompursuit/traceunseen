export type RiskLevel = 'high' | 'compliant';

export interface Entity {
  id: string;
  name: string;
  role: 'exporter' | 'intermediary_holding' | 'ubo' | 'sanctioned_match' | 'buyer';
  jurisdiction: string;
  formedMonthsAgo?: number;
  sharedAddressEntityCount?: number;
  sanctioned?: boolean;
  sanctionsList?: string;
  matchConfidence?: number;
  note?: string;
}

export interface OwnershipEdge {
  from: string;
  to: string;
  relation: string;
  pctOwnership?: number;
}

export interface BomTier {
  tier: 1 | 2 | 3;
  label: string;
  entityName: string;
  location: string;
  verified: boolean;
  note: string;
}

export interface Manifest {
  shipmentId: string;
  commodity: string;
  hsCode: string;
  vesselName: string;
  vesselFlag: string;
  originPort: string;
  destinationPort: string;
  declaredVolumeTons: number;
  loadDate: string;
  stsTransfer: boolean;
  stsLocation?: string;
  aisGapHours?: number;
  darkFleetIndicator?: boolean;
}

export interface SanctionsHit {
  source: string;
  entityName: string;
  listName: string;
  matchConfidence: number;
  detail: string;
}

export interface Scenario {
  id: string;
  label: string;
  riskLevel: RiskLevel;
  commodityFamily: 'Nickel' | 'Cobalt' | 'Lithium';
  eoBasis: string;
  shipment: Manifest;
  entities: Entity[];
  ownershipEdges: OwnershipEdge[];
  bomTiers: BomTier[];
  sanctionsHits: SanctionsHit[];
  declaredMineCapacityTonsPerYear: number;
  impliedAnnualVolumeTons: number;
  sourcesChecked: string[];
}

export interface RiskFactor {
  key: string;
  label: string;
  weight: number;
  points: number;
  triggered: boolean;
  detail: string;
}

export interface RiskResult {
  score: number;
  factors: RiskFactor[];
  redFlags: string[];
  verdict: 'HIGH RISK — ESCALATE' | 'ELEVATED — REVIEW' | 'LOW RISK — CLEARED';
}
