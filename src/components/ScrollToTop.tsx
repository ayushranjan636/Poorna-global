import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* ---------------------------------------------------------------------------
 * ScrollToTop
 * Resets scroll on route change so every page opens at the top. Replaces the
 * previous pattern of `window.location.href = ...` on links, which forced a
 * full document reload on internal navigation.
 *
 * Hash links are left alone so in-page anchors still work.
 * ------------------------------------------------------------------------- */

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, left: 0, behavior: reduced ? 'auto' : 'auto' });
  }, [pathname, hash]);

  return null;
}
