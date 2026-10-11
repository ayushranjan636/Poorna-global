# Poorna Global Strategies

Marketing site for **Poorna Global Strategies Pvt Ltd** — strategy, partnerships and
delivery across renewables, healthcare, trade policy and technology transfer.

Built with React 19, TypeScript, Vite and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command           | Description                            |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR     |
| `npm run build`   | Type-check and build to `dist/`        |
| `npm run preview` | Serve the production build locally     |
| `npm run lint`    | Run ESLint across `src/`               |

## Project structure

```
src/
  components/      Shared sections and UI primitives
    ui/Logo.tsx    Single source of truth for brand artwork
    Home/          Header and Footer
    visuals/       Decorative glass / water surfaces
  content/         Site copy: services, team, insights
  pages/           One folder per route
  lib/             usePageMeta and other helpers
public/
  brand/           Generated logo, mark, icons and social card
  media/           Photography and press clippings
```

## Brand

Design tokens live in `src/index.css` under `@theme`.

| Token             | Value     | Use                                       |
| ----------------- | --------- | ----------------------------------------- |
| `--color-brand`   | `#094f2f` | The logo's own green — footer, app icons  |
| `--color-accent`  | `#2f6a3d` | Links and small accents on white          |
| `--color-ink`     | `#171a17` | Headings                                  |
| `--color-mist`    | `#f4faf4` | Pale green section backgrounds            |

All logo artwork is rendered through `src/components/ui/Logo.tsx`, which selects the
correct file for each `variant` (`lockup` / `mark`) and `tone` (`dark` / `light`).
Change the artwork there rather than referencing the PNGs directly.

Generated assets in `public/brand/` are raster, derived from the source artwork in
`public/`. A true vector SVG is still needed for print and signage.

## Deployment

Configured for Vercel via `vercel.json`, which rewrites all paths to `index.html`
so client-side routing works on refresh.
