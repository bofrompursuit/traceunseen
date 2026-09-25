import { Nav } from '../landing/Nav';
import { ScrollIndicator } from '../landing/ScrollIndicator';
import { TemplateHero } from '../landing/TemplateHero';
import { EcosystemSection } from '../landing/EcosystemSection';
import { ContactSection } from '../landing/ContactSection';

export default function Landing() {
  return (
    <div className="bg-[#06120b] text-[#a3b8ad]">
      <Nav />
      <ScrollIndicator />
      <TemplateHero />
      <EcosystemSection />
      <ContactSection />
      <footer className="border-t border-white/5 bg-[#06120b] px-6 py-8 text-center text-xs text-[#a3b8ad]/60">
        MineralShield AI — built for TRACE THE UNSEEN, Climate Week NYC. Demo mode — mock/fallback data throughout.
      </footer>
    </div>
  );
}
