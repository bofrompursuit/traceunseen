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
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Risk Scorecard</h2>
      <div className="mt-4 flex items-center gap-6">
        <svg width="120" height="120" viewBox="0 0 120 120" className="shrink-0">
          <circle cx="60" cy="60" r="52" fill="none" stroke="#1e293b" strokeWidth="12" />
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
          <text x="60" y="56" textAnchor="middle" className="fill-slate-100 text-2xl font-bold" style={{ fontSize: 28 }}>
            {risk.score}
          </text>
          <text x="60" y="76" textAnchor="middle" className="fill-slate-500" style={{ fontSize: 11 }}>
            / 100
          </text>
        </svg>
        <div>
          <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${colors.chip}`}>
            {risk.verdict}
          </span>
          <p className="mt-2 text-sm text-slate-400">Multi-Tier Origin Divergence Score</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {risk.factors.map((f) => (
          <div key={f.key}>
            <div className="flex items-center justify-between text-xs">
              <span className={f.triggered ? 'text-slate-200' : 'text-slate-500'}>{f.label}</span>
              <span className={f.triggered ? colors.text : 'text-slate-600'}>{f.points}/{f.weight}</span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-slate-800">
              <div
                className={`h-1.5 rounded-full ${f.triggered ? 'bg-current ' + colors.text : 'bg-slate-700'}`}
                style={{ width: `${(f.points / f.weight) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
