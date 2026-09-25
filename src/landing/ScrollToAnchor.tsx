import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToAnchor() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, [hash]);

  return null;
}
