import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/* ---------------------------------------------------------------------------
 * devApi
 *
 * Vite does not run Vercel Serverless Functions, so in `npm run dev` a POST to
 * /api/enquiry would fall through to the SPA and return index.html. That makes
 * the contact form untestable locally.
 *
 * This plugin mounts the same handler on the dev server so local behaviour
 * matches production.
 *
 * Note: Vite only exposes VITE_-prefixed variables, and only on
 * `import.meta.env`. The handler reads unprefixed secrets from `process.env`
 * (as it will on Vercel), so we load the .env files ourselves and copy them
 * across.
 *
 * Refreshing this correctly is subtle. Vite restarts in the *same process*, so
 * `process.env` survives a restart. Snapshotting "the shell environment" lazily
 * does not work: by the time a restart happens, values injected on the previous
 * start are already present and get mistaken for real shell variables, freezing
 * them forever. Instead we remember exactly which keys *we* injected, and own
 * those keys outright — overwriting them when the file changes and deleting
 * them when they are removed from it. Genuine shell variables are never
 * touched, so `SMTP_HOST=… npm run dev` still wins.
 * ------------------------------------------------------------------------- */
function devApi(mode: string): Plugin {
  return {
    name: 'poorna-dev-api',
    apply: 'serve',
    configureServer(server) {
      const g = globalThis as { __poornaInjectedEnv?: Set<string> };
      const injected = (g.__poornaInjectedEnv ??= new Set<string>());
      const fileEnv = loadEnv(mode, process.cwd(), '');

      for (const [key, value] of Object.entries(fileEnv)) {
        /* Set it if nothing else owns it, or if we own it already. */
        if (process.env[key] === undefined || injected.has(key)) {
          process.env[key] = value;
          injected.add(key);
        }
      }

      /* Anything we injected that has since left the file must go, so deleted
         credentials cannot linger in the running process. */
      for (const key of [...injected]) {
        if (fileEnv[key] === undefined) {
          delete process.env[key];
          injected.delete(key);
        }
      }

      server.middlewares.use('/api/enquiry', async (req, res) => {
        /* Buffer the body: Vercel parses JSON for us, Vite does not. */
        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);
        const raw = Buffer.concat(chunks).toString('utf8');

        let body: unknown = {};
        if (raw) {
          try {
            body = JSON.parse(raw);
          } catch {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ error: 'Invalid JSON body.' }));
            return;
          }
        }

        /* Load through Vite so TypeScript and .env.local are both honoured. */
        const module = await server.ssrLoadModule('/api/enquiry.ts');
        const handler = module.default as (
          request: unknown,
          response: unknown,
        ) => Promise<unknown>;

        const shim = {
          setHeader: (name: string, value: string) => res.setHeader(name, value),
          status(code: number) {
            res.statusCode = code;
            return this;
          },
          json(payload: unknown) {
            if (!res.getHeader('Content-Type')) {
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
            }
            res.end(JSON.stringify(payload));
            return this;
          },
        };

        try {
          await handler({ method: req.method, headers: req.headers, body }, shim);
        } catch (error) {
          server.config.logger.error(`[dev-api] ${String(error)}`);
          if (!res.writableEnded) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ error: 'The enquiry handler threw.' }));
          }
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), devApi(mode)],
}));
