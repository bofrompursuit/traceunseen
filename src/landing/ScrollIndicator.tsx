import { useEffect, useState } from 'react';

export function ScrollIndicator() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    function onScroll() {
      const top = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setPercent(height > 0 ? (top / height) * 100 : 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 z-40 hidden h-40 w-px -translate-y-1/2 bg-white/10 mix-blend-difference md:block">
      <div className="w-full bg-[#eab308] transition-[height]" style={{ height: `${percent}%` }} />
    </div>
  );
}
