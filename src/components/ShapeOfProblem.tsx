const SHAPE_OF_PROBLEM_URL =
  'https://dashboard.alexmong.com/trace-the-unseen/materials/~tlygk0.Z4kxMAkZifmnYkXZMz-gxsByHdZldfmP/shape-of-the-problem/index.html';

export function ShapeOfProblem() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#a3b8ad]">Shape of the Problem</h2>
        <a
          href={SHAPE_OF_PROBLEM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-[#eab308] transition hover:brightness-110"
        >
          Open full view &#8599;
        </a>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-white/10 bg-[#06120b]">
        <iframe
          src={SHAPE_OF_PROBLEM_URL}
          title="Shape of the Problem"
          loading="lazy"
          className="h-[420px] w-full sm:h-[520px] lg:h-[600px]"
        />
      </div>
    </div>
  );
}
