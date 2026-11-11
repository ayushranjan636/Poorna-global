/* ---------------------------------------------------------------------------
 * POST /api/enquiry
 *
 * Handles a contact-form submission in two steps:
 *
 *   1. Append the enquiry as a row to a Google Sheet.
 *   2. Email it to the team over SMTP — To: Raghunandan, Bcc: Ayush.
 *
 * Both steps are attempted independently. If the sheet write fails we still
 * try to send the email, and vice versa; the request only fails if BOTH fail,
 * so a single misconfigured integration never silently loses an enquiry.
 *
 * Runs as a Vercel Serverless Function (Node runtime).
 *
 * Required environment variables
 * ------------------------------
 *   SMTP_HOST            e.g. smtp.gmail.com
 *   SMTP_PORT            465 (secure) or 587 (STARTTLS)
 *   SMTP_USER            mailbox the message is sent from
 *   SMTP_PASS            app password, not the account password
 *   ENQUIRY_TO           raghunandan.ar@poornaglobalstrategies.com
 *   ENQUIRY_BCC          ayush@poornaglobalstrategies.com
 *
 * Optional (Google Sheets, via an Apps Script web app bound to the sheet)
 *   SHEET_WEBHOOK_URL     the deployed web app's /exec URL
 *   SHEET_WEBHOOK_SECRET  must match SECRET in the Apps Script
 * ------------------------------------------------------------------------- */

import nodemailer from 'nodemailer';

/* Minimal request/response shapes. Declared locally rather than importing
   `@vercel/node`, whose current release pulls in a large dependency tree with
   known advisories — and we only ever needed the types. */
type VercelRequest = {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): VercelResponse;
  json(body: unknown): VercelResponse;
};

type Enquiry = {
  name: string;
  email: string;
  organisation: string;
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Guard against oversized payloads being written to the sheet or email. */
const LIMITS: Record<keyof Enquiry, number> = {
  name: 200,
  email: 320,
  organisation: 300,
  message: 5000,
};

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/** Validate and normalise the submitted body. */
function parse(body: unknown): { ok: true; data: Enquiry } | { ok: false; error: string } {
  if (typeof body !== 'object' || body === null) {
    return { ok: false, error: 'Expected a JSON object.' };
  }

  const raw = body as Record<string, unknown>;
  const data: Enquiry = {
    name: asString(raw.name),
    email: asString(raw.email),
    organisation: asString(raw.organisation),
    message: asString(raw.message),
  };

  if (!data.name) return { ok: false, error: 'Please enter your name.' };
  if (!EMAIL_PATTERN.test(data.email)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }
  if (data.message.length < 20) {
    return { ok: false, error: 'Please tell us a little more about your project.' };
  }

  for (const key of Object.keys(LIMITS) as (keyof Enquiry)[]) {
    if (data[key].length > LIMITS[key]) {
      return { ok: false, error: `The ${key} field is too long.` };
    }
  }

  return { ok: true, data };
}

/* --- Google Sheets -------------------------------------------------------- */

async function appendToSheet(enquiry: Enquiry, meta: { at: string; ip: string }) {
  const url = process.env.SHEET_WEBHOOK_URL?.trim();
  /* Trim the secret: a trailing space or newline in the environment is a
     common cause of a mismatch that is otherwise invisible. */
  const secret = process.env.SHEET_WEBHOOK_SECRET?.trim();

  if (!url || !secret) {
    throw new Error('Sheet webhook is not configured.');
  }

  /* Apps Script answers with a 302 to googleusercontent.com; fetch follows it
     and the final body is the script's plain-text reply. */
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, ...enquiry, ...meta }),
    signal: AbortSignal.timeout(15000),
  });

  const reply = (await res.text()).trim();

  if (res.ok && reply === 'ok') return;

  /* Apps Script returns 200 with an HTML error page for a range of
     deployment problems, so the body matters more than the status. Translate
     the common ones into something actionable in the log. */
  let hint = '';
  if (reply.includes('Script function not found: doPost')) {
    hint =
      ' — the deployed version has no doPost. Paste scripts/enquiry-apps-script.gs,' +
      ' then Deploy → Manage deployments → Version: New version.';
  } else if (/accounts\.google\.com|ServiceLogin/.test(reply)) {
    hint =
      ' — the deployment is asking for sign-in. Set "Who has access" to "Anyone".';
  } else if (reply.startsWith('forbidden')) {
    hint =
      ` — SHEET_WEBHOOK_SECRET (${secret.length} chars) does not match the` +
      ' SHEET_WEBHOOK_SECRET script property in Apps Script.';
  } else if (reply.startsWith('misconfigured')) {
    hint =
      ' — set the SHEET_WEBHOOK_SECRET script property under Apps Script' +
      ' Project Settings → Script Properties.';
  }

  /* HTML bodies are long and useless in a log; say so rather than dumping. */
  const body = reply.startsWith('<') ? `<html page, ${reply.length} bytes>` : reply.slice(0, 200);

  throw new Error(`Sheet webhook replied ${res.status}: ${body}${hint}`);
}

/* --- Email ---------------------------------------------------------------- */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function sendEmail(enquiry: Enquiry, meta: { at: string }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ENQUIRY_TO, ENQUIRY_BCC } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ENQUIRY_TO) {
    throw new Error('SMTP is not configured.');
  }

  const port = Number(SMTP_PORT || 465);

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const organisation = enquiry.organisation || '—';

  const text = [
    `Name:         ${enquiry.name}`,
    `Email:        ${enquiry.email}`,
    `Organisation: ${organisation}`,
    `Received:     ${meta.at}`,
    '',
    enquiry.message,
  ].join('\n');

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:620px;color:#171a17">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#666d66">
        Website enquiry
      </p>
      <h2 style="margin:0 0 20px;font-size:19px;font-weight:600">${escapeHtml(enquiry.name)}</h2>
      <table style="border-collapse:collapse;font-size:14px;margin-bottom:20px">
        <tr>
          <td style="padding:5px 16px 5px 0;color:#666d66">Email</td>
          <td style="padding:5px 0">
            <a href="mailto:${escapeHtml(enquiry.email)}" style="color:#094f2f">
              ${escapeHtml(enquiry.email)}
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding:5px 16px 5px 0;color:#666d66">Organisation</td>
          <td style="padding:5px 0">${escapeHtml(organisation)}</td>
        </tr>
        <tr>
          <td style="padding:5px 16px 5px 0;color:#666d66">Received</td>
          <td style="padding:5px 0">${escapeHtml(meta.at)}</td>
        </tr>
      </table>
      <div style="border-left:3px solid #094f2f;padding:2px 0 2px 16px;font-size:15px;line-height:1.65;white-space:pre-wrap">${escapeHtml(
        enquiry.message,
      )}</div>
    </div>
  `;

  await transport.sendMail({
    from: `"Poorna Global Strategies" <${SMTP_USER}>`,
    to: ENQUIRY_TO,
    bcc: ENQUIRY_BCC || undefined,
    /* Lets the team reply straight to the enquirer. */
    replyTo: `"${enquiry.name}" <${enquiry.email}>`,
    subject: `Website enquiry — ${enquiry.name}${
      enquiry.organisation ? ` (${enquiry.organisation})` : ''
    }`,
    text,
    html,
  });
}

/* Exported for the test suite in scripts/test-enquiry.ts. Not part of the
   HTTP surface. */
export const __test = { parse, escapeHtml, appendToSheet, LIMITS };

/* --- Handler -------------------------------------------------------------- */

export default async function handler(request: VercelRequest, response: VercelResponse) {
  /* Always answer with JSON. The SPA rewrite serves index.html for unknown
     paths, so the client checks the content type before trusting a 200. */
  response.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const parsed = parse(request.body);
  if (!parsed.ok) {
    return response.status(400).json({ error: parsed.error });
  }

  const forwarded = request.headers['x-forwarded-for'];
  const meta = {
    at: new Date().toISOString(),
    ip: (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0]?.trim() ?? '',
  };

  /* Run both integrations; neither should be able to block the other. */
  const [sheet, email] = await Promise.allSettled([
    appendToSheet(parsed.data, meta),
    sendEmail(parsed.data, meta),
  ]);

  if (sheet.status === 'rejected') {
    console.error('[enquiry] sheet append failed:', sheet.reason);
  }
  if (email.status === 'rejected') {
    console.error('[enquiry] email send failed:', email.reason);
  }

  /* Only report failure if the enquiry was not captured anywhere at all. */
  if (sheet.status === 'rejected' && email.status === 'rejected') {
    return response.status(502).json({
      error: 'We could not record that enquiry.',
    });
  }

  return response.status(200).json({
    ok: true,
    saved: sheet.status === 'fulfilled',
    emailed: email.status === 'fulfilled',
  });
}
