/* ---------------------------------------------------------------------------
 * Poorna Global Strategies — enquiry sheet webhook
 *
 * Receives enquiries from /api/enquiry and appends each one as a row.
 *
 * The shared secret is read from Script Properties, NOT hardcoded here, so
 * this file can live in the repository without carrying a credential.
 *
 * SETUP
 * -----
 *  1. Open the target Google Sheet → Extensions → Apps Script.
 *  2. Delete the stub and paste this whole file in. Save.
 *
 *  3. Set the secret:
 *       Project Settings (gear, left sidebar)
 *         → Script Properties → Add script property
 *       Property:  SHEET_WEBHOOK_SECRET
 *       Value:     the value of SHEET_WEBHOOK_SECRET from .env.local
 *     It must match EXACTLY. Nothing else needs editing in this file.
 *
 *  4. Deploy → New deployment → type "Web app"
 *       Execute as:      Me
 *       Who has access:  Anyone          <-- must be "Anyone", not
 *                                            "Anyone with Google account"
 *
 *  5. Copy the /exec URL into SHEET_WEBHOOK_URL in .env.local and in Vercel.
 *
 * REDEPLOYING AFTER AN EDIT
 * -------------------------
 * Saving this script does NOT change what the /exec URL serves. You must do
 * Deploy → Manage deployments → (pencil) → Version: "New version" → Deploy.
 * This is the most common reason a fix appears to have no effect.
 *
 * CHECKING IT WORKS
 * -----------------
 * Open the /exec URL in a browser. A healthy deployment replies with a short
 * status line telling you whether the secret has been set.
 * ------------------------------------------------------------------------- */

/** Worksheet (tab) rows are appended to. Created automatically if missing. */
const TAB_NAME = 'Enquiries';

const HEADERS = ['Received', 'Name', 'Email', 'Organisation', 'Message', 'IP'];

function reply(text) {
  return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.TEXT);
}

function configuredSecret() {
  var value = PropertiesService.getScriptProperties().getProperty('SHEET_WEBHOOK_SECRET');
  return value === null ? '' : String(value).trim();
}

function doPost(e) {
  try {
    var expected = configuredSecret();

    /* Distinguish "nobody configured a secret" from "the secret is wrong".
       A single generic 'forbidden' makes this impossible to diagnose. */
    if (!expected) {
      return reply('misconfigured: SHEET_WEBHOOK_SECRET script property is not set');
    }

    if (!e || !e.postData || !e.postData.contents) {
      return reply('bad request: no body');
    }

    var payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return reply('bad request: invalid JSON');
    }

    var provided = payload.secret === undefined ? '' : String(payload.secret).trim();

    if (!provided) {
      return reply('forbidden: no secret supplied');
    }
    if (provided !== expected) {
      return reply('forbidden: secret mismatch');
    }

    getSheet().appendRow([
      payload.at || new Date().toISOString(),
      payload.name || '',
      payload.email || '',
      payload.organisation || '',
      payload.message || '',
      payload.ip || '',
    ]);

    return reply('ok');
  } catch (error) {
    return reply('error: ' + (error && error.message ? error.message : String(error)));
  }
}

/** Health check. Visiting the /exec URL in a browser hits this. */
function doGet() {
  var expected = configuredSecret();
  return reply(
    'poorna enquiry webhook: alive; secret ' +
      (expected ? 'is set (' + expected.length + ' chars)' : 'IS NOT SET') +
      '; tab "' +
      TAB_NAME +
      '"',
  );
}

function getSheet() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(TAB_NAME);

  if (!sheet) {
    sheet = book.insertSheet(TAB_NAME);
  }

  /* Write the header row once, then freeze it. */
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}
