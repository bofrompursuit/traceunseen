import type { Entity, OwnershipEdge, Manifest, BomTier, SanctionsHit, Scenario } from '../types';

/**
 * Tool-call wrappers for the MCP integrations named in the build spec:
 *   Sayari        -> search_entities, get_network
 *   Tradeverifyd  -> get_manifest, get_bom_tier
 *   Tavily        -> sanctions/maritime web search
 *
 * No live MCP servers are wired into this demo build (Sayari MCP is not
 * published to a reachable registry, and Tradeverifyd/Tavily credentials
 * are not configured here). Each wrapper is written as the seam a real
 * tool call would occupy — swap the body for an actual MCP `tools/call`
 * and the rest of the app is unaffected. Until then it falls back to the
 * scenario fixtures so the demo never stalls on network/rate-limit issues.
 */

const LATENCY_MS = 260;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY_MS));
}

export async function search_entities(scenario: Scenario): Promise<Entity[]> {
  // Live call would be: mcp.call('sayari', 'search_entities', { query })
  return delay(scenario.entities);
}

export async function get_network(scenario: Scenario): Promise<OwnershipEdge[]> {
  // Live call would be: mcp.call('sayari', 'get_network', { entityId })
  return delay(scenario.ownershipEdges);
}

export async function get_manifest(scenario: Scenario): Promise<Manifest> {
  // Live call would be: mcp.call('tradeverifyd', 'get_manifest', { shipmentId })
  return delay(scenario.shipment);
}

export async function get_bom_tier(scenario: Scenario): Promise<BomTier[]> {
  // Live call would be: mcp.call('tradeverifyd', 'get_bom_tier', { shipmentId })
  return delay(scenario.bomTiers);
}

export async function tavily_search(scenario: Scenario): Promise<SanctionsHit[]> {
  // Live call would be: tavily.search({ query: sanctions/detention query })
  return delay(scenario.sanctionsHits);
}

export interface OrchestrationResult {
  entities: Entity[];
  ownershipEdges: OwnershipEdge[];
  manifest: Manifest;
  bomTiers: BomTier[];
  sanctionsHits: SanctionsHit[];
}

/** Runs all MCP tool calls in parallel, per the spec's orchestration requirement. */
export async function runOrchestration(scenario: Scenario): Promise<OrchestrationResult> {
  const [entities, ownershipEdges, manifest, bomTiers, sanctionsHits] = await Promise.all([
    search_entities(scenario),
    get_network(scenario),
    get_manifest(scenario),
    get_bom_tier(scenario),
    tavily_search(scenario),
  ]);
  return { entities, ownershipEdges, manifest, bomTiers, sanctionsHits };
}
