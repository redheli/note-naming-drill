// Google Apps Script backend for the Note Naming Drill practice log.
//
// Setup (once):
//   1. Create a Google Sheet (sheets.new), any name.
//   2. Extensions → Apps Script. Replace the editor contents with this file. Save.
//   3. Deploy → New deployment → type "Web app".
//        Execute as: Me.   Who has access: Anyone.
//      Authorize when asked (Advanced → Go to … → Allow).
//   4. Copy the Web app URL (ends in /exec) into SYNC_URL in index.html.
//
// The page sends GET to list every record and POST {entries:[...]} to add new
// ones. Rows are deduplicated by id, so re-sending is harmless. Every record
// is one row in the "log" sheet; delete rows there to remove them.

const SHEET = 'log';
const HEAD = ['id', 'who', 'time', 'clef', 'level', 'acc', 'seed', 'score', 'total', 'secs', 'timeout'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET);
  if (!sh) {
    sh = ss.insertSheet(SHEET);
    sh.appendRow(HEAD);
    sh.setFrozenRows(1);
    sh.getRange('C:C').setNumberFormat('yyyy-mm-dd hh:mm');
  }
  return sh;
}

function rows_() {
  const sh = sheet_();
  if (sh.getLastRow() < 2) return [];
  const v = sh.getRange(2, 1, sh.getLastRow() - 1, HEAD.length).getValues();
  return v.filter(r => r[0] !== '').map(r => ({
    id: String(r[0]), who: String(r[1]), t: new Date(r[2]).getTime(),
    clef: String(r[3]), levelId: String(r[4]), acc: r[5] === true || r[5] === 'TRUE',
    seed: Number(r[6]), score: Number(r[7]), total: Number(r[8]), secs: Number(r[9]),
    timeout: r[10] === true || r[10] === 'TRUE',
  }));
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return out_({ ok: true, entries: rows_() });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const body = JSON.parse((e.postData && e.postData.contents) || '{}');
    const list = Array.isArray(body.entries) ? body.entries : [];
    const sh = sheet_();
    const have = new Set(sh.getLastRow() < 2 ? [] : sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().flat().map(String));
    const add = list.filter(x => x && x.id && !have.has(String(x.id)) && isFinite(x.t));
    if (add.length) {
      const rows = add.map(x => [String(x.id), String(x.who || ''), new Date(x.t), String(x.clef || ''), String(x.levelId || ''),
        !!x.acc, Number(x.seed) || 0, Number(x.score) || 0, Number(x.total) || 0, Number(x.secs) || 0, !!x.timeout]);
      sh.getRange(sh.getLastRow() + 1, 1, rows.length, HEAD.length).setValues(rows);
    }
    return out_({ ok: true, added: add.length, entries: rows_() });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
