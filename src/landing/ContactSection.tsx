import { useState } from 'react';
import { CircuitCanvas } from './CircuitCanvas';

export function ContactSection() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden bg-[#06120b] px-6 py-28">
      <CircuitCanvas />
      <div className="relative mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#eab308]">Get in touch</span>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Request an Enforcement Briefing</h2>
        <p className="mt-4 text-[#a3b8ad]">
          Bring us a shipment, supplier, or commodity code — we'll walk you through the divergence score and the
          evidence trail behind it.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mx-auto mt-10 grid max-w-md gap-4 text-left"
        >
          <input
            required
            placeholder="Name"
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-[#a3b8ad] focus:border-[#eab308]/50 focus:outline-none"
          />
          <input
            required
            type="email"
            placeholder="Email"
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-[#a3b8ad] focus:border-[#eab308]/50 focus:outline-none"
          />
          <textarea
            required
            placeholder="Shipment ID, supplier, or commodity code"
            rows={3}
            className="resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-[#a3b8ad] focus:border-[#eab308]/50 focus:outline-none"
          />

          <button
            type="submit"
            className="beam-spin dots-move relative rounded-full bg-[#0a1a10] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {sent ? 'Request queued ✓' : 'Send Request'}
          </button>
          {sent && <p className="text-center text-xs text-[#a3b8ad]">Demo mode — no message was actually sent.</p>}
        </form>
      </div>
    </section>
  );
}
