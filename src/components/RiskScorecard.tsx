import type { RiskResult } from '../types';

function verdictColor(verdict: RiskResult['verdict']) {
  if (verdict.startsWith('HIGH')) return { ring: 'stroke-red-500', text: 'text-red-400', chip: 'bg-red-500/15 text-red-400 border-red-500/30' };
  if (verdict.startsWith('ELEVATED')) return { ring: 'stroke-amber-500', text: 'text-amber-400', chip: 'bg-amber-500/15 text-amber-400 border-amber-500/30' };
  return { ring: 'stroke-emerald-500', text: 'text-emerald-400', chip: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' };
}

export function RiskScorecard({ risk }: { risk: RiskResult }) {
  const colors = verdictColor(risk.verdict);
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (risk.score / 100) * circumference;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-[#a3b8ad]">Risk Scorecard</h2>
      <div className="mt-4 flex items-center gap-6">
        <svg width="120" height="120" viewBox="0 0 120 120" className="shrink-0">
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            strokeWidth="12"
            strokeLinecap="round"
            className={colors.ring}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 60 60)"
          />
          <text x="60" y="56" textAnchor="middle" className="fill-white text-2xl font-bold" style={{ fontSize: 28 }}>
            {risk.score}
          </text>
          <text x="60" y="76" textAnchor="middle" className="fill-[#a3b8ad]" style={{ fontSize: 11 }}>
            / 100
          </text>
        </svg>
        <div>
          <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${colors.chip}`}>
            {risk.verdict}
          </span>
          <p className="mt-2 text-sm text-[#a3b8ad]">Multi-Tier Origin Divergence Score</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {risk.factors.map((f) => (
          <div key={f.key}>
            <div className="flex items-center justify-between text-xs">
              <span className={f.triggered ? 'text-white' : 'text-[#a3b8ad]/70'}>{f.label}</span>
              <span className={f.triggered ? colors.text : 'text-[#a3b8ad]/50'}>{f.points}/{f.weight}</span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-white/10">
              <div
                className={`h-1.5 rounded-full ${f.triggered ? 'bg-current ' + colors.text : 'bg-white/15'}`}
                style={{ width: `${(f.points / f.weight) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
