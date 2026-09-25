import { useEffect, useRef, useState } from 'react';

const HERO_IMG = 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=2000&auto=format&fit=crop';
const COLLAGE = [
  { src: 'https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?w=800&q=80', direction: 'left', pos: { left: '4%', top: '10%', width: '25%', height: '32%' } },
  { src: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80', direction: 'right', pos: { right: '4%', top: '10%', width: '25%', height: '32%' } },
  { src: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80', direction: 'left', pos: { left: '4%', bottom: '10%', width: '25%', height: '32%' } },
  { src: 'https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?w=800&q=80', direction: 'right', pos: { right: '4%', bottom: '10%', width: '25%', height: '32%' } },
] as const;

export function TemplateHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const p = scrollable > 0 ? -rect.top / scrollable : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const imgStyle: React.CSSProperties = {
    width: `${100 - 70 * progress}%`,
    height: `${100 - 30 * progress}%`,
    left: `${35 * progress}%`,
    top: `${15 * progress}%`,
    borderRadius: `${16 * progress}px`,
    willChange: 'transform',
  };

  return (
    <div ref={containerRef} className="relative bg-[#06120b]" style={{ height: '250vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Layer 0: shrinking hero image */}
        <div className="absolute overflow-hidden" style={imgStyle}>
          <img
            src={HERO_IMG}
            alt="Industrial port and refinery at dusk"
            className="animate-breathe h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-[#06120b]"
            style={{ opacity: 0.6 * (1 - progress) }}
          />
        </div>

        {/* Layer 1: collage cards, expand around the shrunk image */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {COLLAGE.map((card, i) => (
            <div
              key={i}
              data-direction={card.direction}
              className="absolute overflow-hidden rounded-2xl"
              style={{
                ...card.pos,
                opacity: progress,
                transform: `translateX(${(1 - progress) * (card.direction === 'left' ? -60 : 60)}px)`,
                transition: 'opacity 0.1s linear',
              }}
            >
              <img src={card.src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        {/* Layer 2: content */}
        <div className="pointer-events-auto absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <span
            className="mb-4 rounded-full border border-[#eab308]/30 bg-[#eab308]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#eab308]"
            style={{ opacity: 1 - progress }}
          >
            TRACE THE UNSEEN — Climate Week NYC
          </span>
          <h1
            className="mix-blend-overlay max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl"
            style={{ opacity: 1 - progress }}
          >
            See the supply chain everyone else missed.
          </h1>
          <p
            className="mt-6 max-w-xl text-base text-[#a3b8ad] sm:text-lg"
            style={{ opacity: 1 - progress }}
          >
            MineralShield AI traces critical mineral shipments — nickel, cobalt, lithium — through shell companies,
            dark-fleet transfers, and sanctioned ownership back to the raw material origin.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4" style={{ opacity: 1 - progress }}>
            <a
              href="/app"
              className="rounded-full bg-[#eab308] px-6 py-3 text-sm font-semibold text-[#06120b] transition hover:bg-[#eab308]/90"
            >
              Launch the Dashboard
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Request a Briefing
            </a>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="absolute inset-x-0 bottom-0 z-20 grid grid-cols-3 divide-x divide-white/5 border-t border-white/5 bg-[#06120b]/60 backdrop-blur-sm">
          {[
            { stat: '250+', label: 'Entities Resolved' },
            { stat: '15+', label: 'Watchlists Cross-Checked' },
            { stat: '100%', label: 'Tier-3 Coverage Goal' },
          ].map((s) => (
            <div key={s.label} className="px-6 py-5 text-center">
              <div className="text-2xl font-bold text-white sm:text-3xl">{s.stat}</div>
              <div className="mt-1 text-xs text-[#a3b8ad]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
