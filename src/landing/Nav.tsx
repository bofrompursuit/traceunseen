import { Link } from 'react-router-dom';

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#06120b]/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-wide text-[#a3b8ad]">
          <iconify-icon icon="solar:shield-check-linear" width="22" className="text-[#eab308]" />
          <span className="text-white">SupplySentinel</span><span className="text-[#eab308]">+</span><span className="text-white"> Solutions</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-[#a3b8ad] md:flex">
          <a href="#ecosystem" className="transition hover:text-white">Ecosystem</a>
          <a href="#contact" className="transition hover:text-white">Contact</a>
          <Link
            to="/app"
            className="rounded-full border border-[#eab308]/40 bg-[#eab308]/10 px-4 py-1.5 font-medium text-[#eab308] transition hover:bg-[#eab308]/20"
          >
            Launch Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
