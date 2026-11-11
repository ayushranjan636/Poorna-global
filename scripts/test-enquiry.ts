/* ---------------------------------------------------------------------------
 * Test suite for the enquiry pipeline.
 *
 *   npm test                 run everything with mocks (no network, no email)
 *   npm run test:webhook     additionally probe the REAL Google Sheet webhook
 *
 * The default run is hermetic: SMTP points at a local sink and the sheet
 * webhook at a local stub, so nothing leaves the machine and no live email is
 * sent. `test:webhook` is opt-in because it writes a row to the real sheet.
 * ------------------------------------------------------------------------- */

import { createServer, type Server } from 'node:http';
import { createServer as createTcpServer } from 'node:net';
import { AddressInfo } from 'node:net';

/* --- Tiny assertion harness ---------------------------------------------- */

let passed = 0;
let failed = 0;
const failures: string[] = [];

function check(name: string, condition: boolean, detail = '') {
  if (condition) {
    passed += 1;
    console.log(`  \x1b[32m✓\x1b[0m ${name}`);
  } else {
    failed += 1;
    failures.push(name);
    console.log(`  \x1b[31m✗ ${name}\x1b[0m${detail ? `\n      ${detail}` : ''}`);
  }
}

function eq(name: string, actual: unknown, expected: unknown) {
  const a = JSON.stringify(actual);
  const b = JSON.stringify(expected);
  check(name, a === b, a === b ? '' : `expected ${b}\n      received ${a}`);
}

function group(title: string) {
  console.log(`\n\x1b[1m${title}\x1b[0m`);
}

/* --- Test doubles --------------------------------------------------------- */

/** HTTP stub standing in for the Apps Script web app. */
function sheetStub(respond: () => { status?: number; body: string }) {
  return new Promise<{ server: Server; url: string; received: unknown[] }>((resolve) => {
    const received: unknown[] = [];
    const server = createServer((req, res) => {
      let raw = '';
      req.on('data', (c) => (raw += c));
      req.on('end', () => {
        try {
          received.push(JSON.parse(raw));
        } catch {
          received.push(raw);
        }
        const { status = 200, body } = respond();
        res.writeHead(status, { 'Content-Type': 'text/plain' });
        res.end(body);
      });
    });
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address() as AddressInfo;
      resolve({ server, url: `http://127.0.0.1:${port}/exec`, received });
    });
  });
}

/** Minimal SMTP server that accepts one message and records the session. */
function smtpSink() {
  return new Promise<{ close: () => void; port: number; log: () => string }>((resolve) => {
    let session = '';
    const server = createTcpServer((sock) => {
      let inData = false;
      sock.write('220 localhost ESMTP sink\r\n');
      sock.on('data', (chunk) => {
        const s = chunk.toString();
        if (inData) {
          session += s;
          if (s.includes('\r\n.\r\n')) {
            inData = false;
            sock.write('250 OK queued\r\n');
          }
          return;
        }
        for (const line of s.split('\r\n').filter(Boolean)) {
          const u = line.toUpperCase();
          if (u.startsWith('EHLO') || u.startsWith('HELO'))
            sock.write('250-localhost\r\n250 AUTH PLAIN LOGIN\r\n');
          else if (u.startsWith('AUTH')) sock.write('235 OK\r\n');
          else if (u.startsWith('MAIL FROM') || u.startsWith('RCPT TO')) {
            session += line + '\n';
            sock.write('250 OK\r\n');
          } else if (u === 'DATA') {
            inData = true;
            sock.write('354 Go ahead\r\n');
          } else if (u === 'QUIT') {
            sock.write('221 Bye\r\n');
            sock.end();
          } else sock.write('250 OK\r\n');
        }
      });
    });
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address() as AddressInfo;
      resolve({ close: () => server.close(), port, log: () => session });
    });
  });
}

function mockRes() {
  const r = {
    statusCode: 200,
    payload: null as unknown,
    headers: {} as Record<string, string>,
    setHeader(k: string, v: string) {
      this.headers[k.toLowerCase()] = v;
    },
    status(c: number) {
      this.statusCode = c;
      return this;
    },
    json(b: unknown) {
      this.payload = b;
      return this;
    },
  };
  return r;
}

const VALID = {
  name: 'Asha Menon',
  email: 'asha@example.com',
  organisation: 'Agastya H2',
  message: 'We are evaluating a 50 MW electrolyser project and need offtake advice.',
};

/* ------------------------------------------------------------------------- */

async function main() {
  /* Point everything at local doubles BEFORE importing the handler, and strip
     any real credentials the shell or .env may have provided. */
  for (const key of [
    'SHEET_WEBHOOK_URL',
    'SHEET_WEBHOOK_SECRET',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'ENQUIRY_TO',
    'ENQUIRY_BCC',
  ]) {
    delete process.env[key];
  }

  const mod = await import('../api/enquiry.ts');
  const handler = mod.default;
  const { parse, escapeHtml, appendToSheet } = mod.__test;

  /* The handler logs every integration failure to stderr, which is correct in
     production but drowns the test output — most of these tests induce a
     failure deliberately. Capture the logs instead and only replay them if a
     test actually fails. */
  const captured: string[] = [];
  const realError = console.error;
  console.error = (...args: unknown[]) => {
    captured.push(args.map((a) => (a instanceof Error ? a.message : String(a))).join(' '));
  };

  /* --- Validation ------------------------------------------------------- */
  group('Validation');

  eq('rejects a null body', parse(null), { ok: false, error: 'Expected a JSON object.' });
  eq('rejects a string body', parse('hello'), {
    ok: false,
    error: 'Expected a JSON object.',
  });
  eq('requires a name', parse({ ...VALID, name: '   ' }), {
    ok: false,
    error: 'Please enter your name.',
  });
  eq('rejects a malformed email', parse({ ...VALID, email: 'asha@example' }), {
    ok: false,
    error: 'Please enter a valid email address.',
  });
  eq('rejects a one-word message', parse({ ...VALID, message: 'hello' }), {
    ok: false,
    error: 'Please tell us a little more about your project.',
  });
  eq('rejects an oversized message', parse({ ...VALID, message: 'x'.repeat(5001) }), {
    ok: false,
    error: 'The message field is too long.',
  });

  const ok = parse({ ...VALID, name: '  Asha Menon  ' });
  check('accepts a valid enquiry', ok.ok === true);
  check('trims surrounding whitespace', ok.ok === true && ok.data.name === 'Asha Menon');
  check(
    'treats organisation as optional',
    parse({ ...VALID, organisation: '' }).ok === true,
  );

  /* --- HTML escaping ---------------------------------------------------- */
  group('HTML escaping');

  eq(
    'escapes angle brackets and quotes',
    escapeHtml(`<script>alert("x")</script>`),
    '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;',
  );
  check('escapes ampersands first', escapeHtml('&lt;') === '&amp;lt;');

  /* --- Method handling -------------------------------------------------- */
  group('HTTP method handling');

  const getRes = mockRes();
  await handler({ method: 'GET', headers: {}, body: {} }, getRes);
  eq('GET is rejected with 405', getRes.statusCode, 405);
  eq('405 advertises Allow: POST', getRes.headers['allow'], 'POST');
  check(
    'always answers as JSON',
    String(getRes.headers['content-type']).includes('application/json'),
  );

  /* --- Sheet webhook error translation ---------------------------------- */
  group('Sheet webhook diagnostics');

  process.env.SHEET_WEBHOOK_SECRET = 'test-secret-value';
  const meta = { at: new Date().toISOString(), ip: '203.0.113.9' };

  const cases: Array<[string, { status?: number; body: string }, string]> = [
    ['secret mismatch names the cause', { body: 'forbidden: secret mismatch' }, 'does not match'],
    [
      'unset script property is explained',
      { body: 'misconfigured: SHEET_WEBHOOK_SECRET script property is not set' },
      'Script Properties',
    ],
    [
      'missing doPost suggests redeploying',
      { body: 'Script function not found: doPost' },
      'New version',
    ],
    [
      'sign-in page suggests access setting',
      { body: '<html><a href="https://accounts.google.com/ServiceLogin">x</a></html>' },
      'Anyone',
    ],
  ];

  for (const [label, response, expected] of cases) {
    const stub = await sheetStub(() => response);
    process.env.SHEET_WEBHOOK_URL = stub.url;
    let message = '';
    try {
      await appendToSheet(VALID, meta);
    } catch (error) {
      message = error instanceof Error ? error.message : String(error);
    }
    check(label, message.includes(expected), `got: ${message.slice(0, 160)}`);
    stub.server.close();
  }

  /* An HTML body should be summarised, never dumped into the log. */
  const htmlStub = await sheetStub(() => ({ body: '<html>' + 'x'.repeat(5000) + '</html>' }));
  process.env.SHEET_WEBHOOK_URL = htmlStub.url;
  let htmlMessage = '';
  try {
    await appendToSheet(VALID, meta);
  } catch (error) {
    htmlMessage = error instanceof Error ? error.message : String(error);
  }
  check('summarises HTML bodies instead of dumping them', htmlMessage.includes('<html page,'));
  check('keeps the error message short', htmlMessage.length < 300);
  htmlStub.server.close();

  /* Whitespace around the secret must not break the match. */
  const echoStub = await sheetStub(() => ({ body: 'ok' }));
  process.env.SHEET_WEBHOOK_URL = echoStub.url;
  process.env.SHEET_WEBHOOK_SECRET = '  test-secret-value\n';
  await appendToSheet(VALID, meta);
  eq(
    'trims the secret before sending',
    (echoStub.received[0] as { secret: string }).secret,
    'test-secret-value',
  );
  eq(
    'forwards every field to the sheet',
    Object.keys(echoStub.received[0] as object).sort(),
    ['at', 'email', 'ip', 'message', 'name', 'organisation', 'secret'],
  );
  echoStub.server.close();

  /* --- Full handler: partial and total failure -------------------------- */
  group('Resilience');

  /* Sheet succeeds, email not configured -> still a success. */
  const sheetOnly = await sheetStub(() => ({ body: 'ok' }));
  process.env.SHEET_WEBHOOK_URL = sheetOnly.url;
  process.env.SHEET_WEBHOOK_SECRET = 'test-secret-value';
  const r1 = mockRes();
  await handler({ method: 'POST', headers: {}, body: VALID }, r1);
  eq('sheet-only success returns 200', r1.statusCode, 200);
  eq('reports saved but not emailed', r1.payload, { ok: true, saved: true, emailed: false });
  sheetOnly.server.close();

  /* Email succeeds, sheet broken -> still a success. */
  const sink = await smtpSink();
  process.env.SMTP_HOST = '127.0.0.1';
  process.env.SMTP_PORT = String(sink.port);
  process.env.SMTP_USER = 'noreply@poornaglobalstrategies.com';
  process.env.SMTP_PASS = 'test-only';
  process.env.ENQUIRY_TO = 'raghunandan.ar@poornaglobalstrategies.com';
  process.env.ENQUIRY_BCC = 'ayush@poornaglobalstrategies.com';

  const brokenSheet = await sheetStub(() => ({ body: 'forbidden: secret mismatch' }));
  process.env.SHEET_WEBHOOK_URL = brokenSheet.url;
  const r2 = mockRes();
  await handler(
    { method: 'POST', headers: { 'x-forwarded-for': '203.0.113.9, 10.0.0.1' }, body: VALID },
    r2,
  );
  eq('email-only success returns 200', r2.statusCode, 200);
  eq('reports emailed but not saved', r2.payload, { ok: true, saved: false, emailed: true });
  brokenSheet.server.close();

  group('Email envelope');

  const session = sink.log();
  check(
    'addresses the primary recipient',
    session.includes('RCPT TO:<raghunandan.ar@poornaglobalstrategies.com>'),
  );
  check(
    'includes the bcc recipient in the envelope',
    session.includes('RCPT TO:<ayush@poornaglobalstrategies.com>'),
  );
  check(
    'does not leak Bcc into the headers',
    !/^Bcc:/im.test(session),
    'a Bcc header would reveal the hidden recipient',
  );
  check('sets Reply-To to the enquirer', session.includes('Reply-To: Asha Menon'));
  check('carries the message body', session.includes('electrolyser'));

  /* Both integrations down -> a single clear failure. */
  const deadSheet = await sheetStub(() => ({ body: 'forbidden: secret mismatch' }));
  process.env.SHEET_WEBHOOK_URL = deadSheet.url;
  sink.close();
  process.env.SMTP_PORT = '1'; // nothing listening
  const r3 = mockRes();
  await handler({ method: 'POST', headers: {}, body: VALID }, r3);
  eq('total failure returns 502', r3.statusCode, 502);
  eq('502 carries an actionable message', r3.payload, {
    error: 'We could not record that enquiry.',
  });
  deadSheet.server.close();

  /* --- XSS end to end --------------------------------------------------- */
  group('Injection safety');

  const xssSink = await smtpSink();
  process.env.SMTP_PORT = String(xssSink.port);
  delete process.env.SHEET_WEBHOOK_URL;
  const r4 = mockRes();
  await handler(
    {
      method: 'POST',
      headers: {},
      body: { ...VALID, message: 'Project update <script>alert(1)</script> please advise.' },
    },
    r4,
  );
  const xssSession = xssSink.log();
  xssSink.close();

  /* The message must be escaped in the text/html part, where a raw tag would
     execute. The text/plain part is a different matter: it is never parsed as
     HTML, and escaping there would show the reader a literal "&lt;script&gt;".
     So assert per part rather than across the whole MIME body. */
  const htmlPart = (() => {
    const at = xssSession.search(/Content-Type:\s*text\/html/i);
    return at === -1 ? '' : xssSession.slice(at);
  })();
  const plainPart = (() => {
    const at = xssSession.search(/Content-Type:\s*text\/plain/i);
    if (at === -1) return '';
    const rest = xssSession.slice(at);
    const end = rest.search(/Content-Type:\s*text\/html/i);
    return end === -1 ? rest : rest.slice(0, end);
  })();

  check('sends a multipart message with an HTML part', htmlPart.length > 0);
  check('escapes script tags in the HTML part', htmlPart.includes('&lt;script&gt;'));
  check(
    'the HTML part carries no raw script tag',
    !htmlPart.includes('<script>'),
    'a raw <script> in the HTML part would execute in the reader',
  );
  check(
    'the plain-text part is left unescaped',
    plainPart.includes('<script>'),
    'text/plain should not be HTML-escaped; readers would see &lt;script&gt;',
  );

  /* --- Deployment config ------------------------------------------------ */
  group('vercel.json');

  const { readFileSync } = await import('node:fs');
  let vercel: Record<string, unknown> = {};
  try {
    vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
    check('is valid JSON', true);
  } catch (error) {
    check('is valid JSON', false, String(error));
  }

  /* Vercel rejects unknown properties outright and the whole build fails, so
     validate the keys here rather than discovering it in a deploy log. */
  const ALLOWED_REWRITE_KEYS = ['source', 'destination', 'has', 'missing', 'statusCode'];
  const rewrites = (vercel.rewrites ?? []) as Array<Record<string, unknown>>;

  check('declares at least one rewrite', rewrites.length > 0);
  for (const [i, rule] of rewrites.entries()) {
    const unknown = Object.keys(rule).filter((k) => !ALLOWED_REWRITE_KEYS.includes(k));
    check(
      `rewrites[${i}] uses only properties Vercel accepts`,
      unknown.length === 0,
      unknown.length ? `unsupported: ${unknown.join(', ')} — the build will fail` : '',
    );
  }

  /* The SPA catch-all must not swallow the serverless function: a POST would
     then receive index.html with a 200 and look like a delivered enquiry. */
  const spaRule = rewrites.find((r) => r.destination === '/index.html');
  check('has a SPA catch-all to /index.html', Boolean(spaRule));
  if (spaRule) {
    const pattern = new RegExp(`^${String(spaRule.source)}$`);
    check('rewrites / to the SPA', pattern.test('/'));
    check('rewrites deep links to the SPA', pattern.test('/projects/example'));
    check(
      'does NOT rewrite /api/enquiry',
      !pattern.test('/api/enquiry'),
      'the enquiry function would be shadowed by index.html in production',
    );
  }

  /* --- Optional: the real webhook --------------------------------------- */
  if (process.argv.includes('--webhook')) {
    group('Live Google Sheet webhook');

    /* Vite's loadEnv gives precedence to variables already in process.env, so
       the fixtures set by the tests above would shadow the real values from
       .env.local. Clear them first, or this probe silently tests the wrong
       secret and reports a mismatch that does not exist. */
    delete process.env.SHEET_WEBHOOK_URL;
    delete process.env.SHEET_WEBHOOK_SECRET;

    const { loadEnv } = await import('vite');
    const fileEnv = loadEnv('development', process.cwd(), '');
    const url = fileEnv.SHEET_WEBHOOK_URL?.trim();
    const secret = fileEnv.SHEET_WEBHOOK_SECRET?.trim();

    if (!url || !secret) {
      check('SHEET_WEBHOOK_URL and SECRET are present in .env.local', false);
    } else {
      /* Health check first: tells us whether the script property is set. */
      try {
        const health = await fetch(url, { signal: AbortSignal.timeout(20000) });
        const body = (await health.text()).trim();
        const alive = body.includes('poorna enquiry webhook');
        check('GET /exec responds with the health line', alive, `got: ${body.slice(0, 160)}`);
        if (alive) {
          check(
            'the script property SHEET_WEBHOOK_SECRET is set',
            !body.includes('IS NOT SET'),
            body,
          );
        }
      } catch (error) {
        check('GET /exec is reachable', false, String(error));
      }

      /* Then a real append. Guard against the fixture value leaking in: a
         22-char file secret quietly replaced by a 17-char fixture would
         report a mismatch that does not exist. */
      process.env.SHEET_WEBHOOK_URL = url;
      process.env.SHEET_WEBHOOK_SECRET = secret;
      check(
        'the live probe reads the secret from .env.local, not a fixture',
        secret !== 'test-secret-value',
        'loadEnv returned the test fixture — process.env was not cleared first',
      );
      try {
        await appendToSheet(
          { ...VALID, name: 'Automated test', organisation: 'test suite' },
          { at: new Date().toISOString(), ip: '0.0.0.0' },
        );
        check('appends a row to the live sheet', true);
        console.log('      note: a test row was written — delete it from the sheet');
      } catch (error) {
        check(
          'appends a row to the live sheet',
          false,
          error instanceof Error ? error.message : String(error),
        );
      }
    }
  }

  /* --- Summary ---------------------------------------------------------- */
  console.error = realError;

  console.log(
    `\n\x1b[1m${passed} passed, ${failed} failed\x1b[0m` +
      (process.argv.includes('--webhook') ? '' : '  (run `npm run test:webhook` to include the live sheet)'),
  );
  if (failed > 0) {
    console.log(`\nFailing:\n${failures.map((f) => `  - ${f}`).join('\n')}`);
    if (captured.length) {
      console.log(`\nCaptured handler logs:\n${captured.map((l) => `  ${l}`).join('\n')}`);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('\nTest suite crashed:', error);
  process.exit(1);
});
