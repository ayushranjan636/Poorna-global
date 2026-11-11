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

Deployed on Vercel.

`vercel.json` rewrites client-side routes to `index.html` so the SPA survives a
refresh. The pattern is `/((?!api/).*)` — the negative lookahead matters: a
plain `/(.*)` catch-all also captures `/api/*`, so a form POST would receive
`index.html` with a `200` and be indistinguishable from a delivered enquiry.

Note that `vercel.json` permits no extra properties (not even a `comment` key)
and JSON has no comment syntax, so the reasoning lives here instead. `npm test`
validates the file against the keys Vercel accepts.

### Environment variables

Set the keys from `.env.example` in the Vercel project. Values in `.env.local`
are for local development only and are not deployed.

## Testing

```bash
npm test             # 44 tests, hermetic: no network, no email sent
npm run test:webhook # also appends a real row to the live Google Sheet
```

The default run stubs SMTP and the sheet webhook locally, so it is safe to run
repeatedly. `test:webhook` is opt-in because it writes to the real sheet.
