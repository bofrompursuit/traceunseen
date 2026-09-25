import { useState } from 'react';
import type { RiskResult, Scenario } from '../types';
import { buildFabricPayload, downloadJson } from '../lib/fabricExport';
import { downloadText, generateBrief } from '../lib/briefGenerator';

export function ExportPanel({ scenario, risk }: { scenario: Scenario; risk: RiskResult }) {
  const [brief, setBrief] = useState<string | null>(null);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-[#a3b8ad]">Export</h2>
      <p className="mt-1 text-xs text-[#a3b8ad]/70">Structured for Microsoft Fabric (Medallion schema) ingestion and for enforcement handoff.</p>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={() => downloadJson('fabric_payload.json', buildFabricPayload(scenario, risk))}
          className="rounded-lg bg-[#eab308] px-4 py-2 text-sm font-semibold text-[#06120b] transition hover:brightness-110"
        >
          Download fabric_payload.json
        </button>
        <button
          onClick={() => setBrief(generateBrief(scenario, risk))}
          className="rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
        >
          Generate Executive Enforcement Brief
        </button>
      </div>

      {brief && (
        <div className="mt-4">
          <div className="max-h-72 overflow-y-auto rounded-lg border border-white/10 bg-[#06120b] p-4">
            <pre className="whitespace-pre-wrap font-mono text-xs text-[#a3b8ad]">{brief}</pre>
          </div>
          <button
            onClick={() => downloadText(`enforcement_brief_${scenario.shipment.shipmentId}.txt`, brief)}
            className="mt-2 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-[#a3b8ad] transition hover:bg-white/10"
          >
            Download brief (.txt)
          </button>
        </div>
      )}
    </div>
  );
}
