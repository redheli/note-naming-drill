# Note Naming Drill · 五线谱识谱练习

Timed note-naming practice in treble clef, bass clef or both, for young flute and piano students. One HTML file, no build step, works offline.

**Live page:** https://redheli.github.io/note-naming-drill/

## What it does

- Each page is a worksheet of 6 staves × 5 whole notes (30 questions), like a printed "Name the Notes" sheet.
- Countdown timer with a 2-minute default (1:00 / 1:30 / 3:00 / no limit). Time's up auto-submits.
- Treble clef, bass clef, or mixed (three staves of each per page, shuffled).
- Four difficulty levels per clef (treble E4–F5 up to C4–G6, bass G2–A3 up to A1–G4) plus a custom min/max range.
- Optional sharps and flats (answers like F♯, B♭).
- Every page has a number. The same number always produces the same 30 notes, so a page can be redone or assigned.
- Instant grading with the correct name shown under each miss, a per-page score, and a list of missed notes.
- Tap any graded note for a worked explanation: a big staff showing the space notes (treble F-A-C-E, bass A-C-E-G-B) in blue, the note in red, the counted letters in between, and the steps in words (which line or space, nearest space note, count up or down, accidental).
- Practice log with a name per device, a "show all" view and best results per level, plus a "show missed notes more often" option.
- Optional sync of the log across devices through a Google Sheet (see below). Without it the log stays in the browser.
- Chinese / English toggle in the top-right corner.

## How to answer

- Keyboard: `A`–`G` to answer, `#` for sharp, `-` for flat, Backspace to clear, arrow keys to move, Enter to submit.
- Touch: tap the keys at the bottom of the screen. On a tablet, turn it sideways for larger staves.

## Run it

Open `index.html` in any browser, or visit the GitHub Pages link above.

## Shared practice log (optional)

Each device keeps its own log in the browser. To see every device's pages in one list, back the log with a Google Sheet:

1. Create a Google Sheet. In it choose Extensions → Apps Script, replace the editor contents with `sync/Code.gs`, and save.
2. Deploy → New deployment → type "Web app", execute as **Me**, access **Anyone**. Authorize when asked.
3. Copy the web app URL (ends in `/exec`) into `SYNC_URL` near the top of the practice-log code in `index.html`.

After that each finished page is appended as a row in the sheet and every device shows the combined list. Each device enters a name once (for example "Carolyn iPad"), which appears in the Who column. Pages finished offline are uploaded the next time the page can reach the sheet. Delete rows in the sheet to remove records; the page only adds.

The URL is visible in the page source, so treat it as a label rather than a secret: anyone who has it can read or add scores.

## Credits

The treble clef, bass clef, notehead, sharp and flat glyphs are vector outlines taken from the
[Noto Music](https://fonts.google.com/noto/specimen/Noto+Music) font, used under the
[SIL Open Font License 1.1](https://openfontlicense.org/). Everything else is MIT licensed (see LICENSE).
