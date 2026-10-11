import { useEffect, useRef, useState } from 'react';

/* ---------------------------------------------------------------------------
 * useReveal
 * Adds a one-shot fade-and-rise when an element scrolls into view.
 *
 * Returns a ref plus the class string to spread onto the element. Elements
 * start visible for users who prefer reduced motion and when
 * IntersectionObserver is unavailable, so content is never gated by JS.
 * ------------------------------------------------------------------------- */

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node || typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    className: visible ? 'reveal reveal-visible' : 'reveal',
    style: delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined,
  };
}
