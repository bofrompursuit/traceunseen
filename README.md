# Supply Sentinel Solutions.ORG

Single-page prototype built for **TRACE THE UNSEEN: Climate Intelligence Build Day** (Climate Week NYC).

Analyzes suspicious critical mineral shipments (Nickel, Cobalt, Lithium) for sanctions evasion, dark fleet vessel-to-vessel (STS) transfers, and shell company re-labeling under **EO 14415 / EO 14411**.

## Run it

```bash
npm install
npm run dev
```

## Architecture

React + TypeScript (Vite) + Tailwind CSS, dark mode. No backend server — the orchestration layer runs client-side and calls tool wrappers named after the intended integrations.

- `src/lib/mcpTools.ts` — `search_entities` / `get_network` (Sayari), `get_manifest` / `get_bom_tier` (Tradeverifyd), and a Tavily sanctions/maritime search wrapper. Each function is the seam a real MCP `tools/call` would occupy; today they resolve against the scenario fixtures in `src/data/mockScenarios.ts` so the demo never stalls on a rate limit or a missing credential. `runOrchestration()` fires all five in parallel, per the spec's orchestration requirement.
- `src/lib/riskEngine.ts` — computes the **Multi-Tier Origin Divergence Score** (0–100) from five weighted factors: sanctioned/FOCI UBO match, STS/dark-fleet vessel anomaly, shell/shared-address clustering, declared-volume-vs-mine-capacity divergence, and BOM tier completeness.
- `src/lib/fabricExport.ts` — builds a Medallion-shaped (`bronze`/`silver`/`gold`) `fabric_payload.json` for Microsoft Fabric Lakehouse/DirectLake ingestion.
- `src/lib/briefGenerator.ts` — renders a 1-page Executive Enforcement Brief from the same risk result.

## Demo scenarios

- **Scenario A — `SH-NI-88214`** (high risk): Nickel powder, STS transfer in the Malacca Strait with a 46h AIS gap, UBO chain resolving to a sanctions-adjacent Russian metals group through a UAE holding shell, and an unverifiable Tier 3 origin whose implied volume is 3.4x the declared mine's registered capacity.
- **Scenario B — `SH-LI-40967`** (compliant): Battery-grade lithium carbonate, direct Australia → South Korea routing, fully resolved public UBO, all three BOM tiers independently verified.

## Wiring in the real integrations

Swap the body of each function in `mcpTools.ts` for an actual MCP `tools/call` against the Sayari, Tradeverifyd, and Tavily servers — the risk engine, UI, and exports are unaffected since they only consume the typed return shapes in `src/types.ts`.
