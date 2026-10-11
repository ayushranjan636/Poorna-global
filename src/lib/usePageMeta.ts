import { useEffect } from 'react';

/* ---------------------------------------------------------------------------
 * usePageMeta
 * Sets the document title and description per route. Keeps SEO metadata
 * correct in a client-rendered SPA without adding a dependency.
 * ------------------------------------------------------------------------- */

function setMeta(selector: string, attribute: string, value: string) {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) element.setAttribute(attribute, value);
}

export function usePageMeta({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[name="twitter:title"]', 'content', title);

    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', description);
      setMeta('meta[name="twitter:description"]', 'content', description);
    }
  }, [title, description]);
}
