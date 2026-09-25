import { motion } from 'framer-motion';

const PILLARS = [
  {
    key: 'maritime',
    title: 'Maritime Intelligence',
    accent: '#00A8E8',
    icon: 'solar:ship-linear',
    description:
      'Cross-references vessel manifests against AIS tracking to surface ship-to-ship transfers, dark-fleet gaps, and non-standard transit points in real time.',
    points: ['STS transfer detection', 'AIS gap analysis', 'Port detention history'],
  },
  {
    key: 'ownership',
    title: 'Ownership Intelligence',
    accent: '#D4AF37',
    icon: 'solar:buildings-3-linear',
    description:
      'Traverses corporate ownership graphs to resolve ultimate beneficial owners, flagging shell entities and sanctioned foreign ownership hidden behind trade hubs.',
    points: ['UBO chain resolution', 'Shared-address clustering', 'Sanctions list matching'],
  },
];

export function EcosystemSection() {
  return (
    <section id="ecosystem" className="grid-overlay bg-[#1B3022] px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#eab308]">The Ecosystem</span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Two signals, one origin trace</h2>
          <p className="mt-4 text-[#a3b8ad]">
            SupplySentinel+ Solutions orchestrates maritime and corporate intelligence in parallel to compute a single
            divergence score for every shipment.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group rounded-2xl border border-white/5 bg-[#06120b]/40 p-8 transition-all duration-300 hover:-translate-y-2"
              style={{ ['--glow' as string]: `${p.accent}66` }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 40px var(--glow)`)}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              <div
                className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${p.accent}1a` }}
              >
                <iconify-icon icon={p.icon} width="24" style={{ color: p.accent }} />
              </div>
              <h3 className="text-xl font-semibold text-white">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#a3b8ad]">{p.description}</p>
              <ul className="mt-5 space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-sm text-[#a3b8ad]">
                    <iconify-icon icon="solar:check-circle-linear" width="16" style={{ color: p.accent }} />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
