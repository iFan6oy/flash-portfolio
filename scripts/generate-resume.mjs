import fs from 'node:fs';
import path from 'node:path';

const out = process.argv[2] || 'public/JaylonMalone_Resume.pdf';
fs.mkdirSync(path.dirname(out), { recursive: true });

const PAGE_W = 612, PAGE_H = 792;
const M = 42;                    // page margin, fixed; type scales, margins do not
const TOP = 754;                 // first baseline
const COL = PAGE_W - M * 2;      // usable text column, 528pt
const BLUE = '0.12 0.31 0.47';

// Adobe core-14 advance widths (1/1000 em) for ASCII 32..126. Helvetica-Oblique
// shares Helvetica's widths, so F1 and F3 measure identically. These let us
// place text by its real rendered width instead of guessing from character
// count, which is what right-aligned dates need to sit flush on the margin.
const W_REG = [278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584];
const W_BOLD = [278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584];

/** Rendered width of `str` in points. */
function measure(str, size, font = 'F1') {
  const table = font === 'F2' ? W_BOLD : W_REG;
  let w = 0;
  for (const ch of str) {
    const c = ch.charCodeAt(0);
    w += (c >= 32 && c <= 126) ? table[c - 32] : 556;
  }
  return w * size / 1000;
}

// ---- layout state, reset on every layout() pass ----
let S = 1;      // global type scale, chosen by the auto-fit search below
let y = TOP;
let ops = [];
const s = (n) => n * S;   // scale a size or a vertical gap

function esc(str) { return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)'); }
function text(x, yy, size, str, font='F1', color='0 0 0') {
  ops.push(`BT /${font} ${size.toFixed(2)} Tf ${color} rg 1 0 0 1 ${x.toFixed(1)} ${yy.toFixed(1)} Tm (${esc(str)}) Tj ET`);
}
function line(x1, yy, x2, width=0.7, color=BLUE) {
  ops.push(`${color} RG ${width} w ${x1} ${yy.toFixed(1)} m ${x2} ${yy.toFixed(1)} l S`);
}
/** Greedy word wrap against a real width budget in points. */
function wrap(str, maxWidth, size, font='F1') {
  const words = str.split(/\s+/); const lines=[]; let cur='';
  for (const w of words) {
    const n = cur ? `${cur} ${w}` : w;
    if (measure(n, size, font) > maxWidth && cur) { lines.push(cur); cur=w; } else cur=n;
  }
  if (cur) lines.push(cur); return lines;
}
function centered(str, size, font='F1', color='0 0 0') {
  text((PAGE_W - measure(str, s(size), font)) / 2, y, s(size), str, font, color);
}
function section(title) {
  y -= s(13);
  text(M, y, s(10), title.toUpperCase(), 'F2', BLUE);
  y -= s(3); line(M, y, PAGE_W-M, 0.65); y -= s(10);
}
function para(str, size=8.8, leading=10.4) {
  for (const l of wrap(str, COL, s(size))) { text(M, y, s(size), l); y -= s(leading); }
  y -= s(1);
}
function skill(label, value) {
  const size = s(8.6);
  const indent = measure(`${label}: `, size, 'F2');
  const lines = wrap(value, COL - indent, size);
  for (let i=0; i<lines.length; i++) {
    if (i === 0) text(M, y, size, `${label}:`, 'F2');
    text(M + indent, y, size, lines[i]);
    y -= s(9.8);
  }
}
function entry(left, right) {
  const size = s(8.9);
  text(M, y, size, left, 'F2');
  text(PAGE_W - M - measure(right, size, 'F3'), y, size, right, 'F3');
  y -= s(10.8);
}
function bullet(str) {
  const size = s(8.4);
  const indent = s(14);
  text(M + s(4), y, size, '-');
  for (const l of wrap(str, COL - indent, size)) { text(M + indent, y, size, l); y -= s(9.6); }
  y -= s(0.7);
}

/**
 * Draw the whole document at a given type scale and report the last baseline.
 * Called repeatedly by the auto-fit search, so it must be pure: reset all
 * layout state up front and touch nothing outside it.
 */
function layout(scale) {
  S = scale; y = TOP; ops = [];

  centered('JAYLON MALONE', 17, 'F2', BLUE); y -= s(18);
  centered('Software Engineer | Application Developer | AI & Systems Engineering', 9.6, 'F2', '0 0 0'); y -= s(14);
  centered('Mobile, AL | (251) 391-5222 | jaylon@flashaisolutions.org', 8.2, 'F1', '0 0 0'); y -= s(11);
  centered('flashaisolutions.org/work | github.com/iFan6oy | linkedin.com/in/jaylon-malone-3b306b37', 8.2, 'F1', BLUE); y -= s(5);

  section('Professional Summary');
  para('Application developer and systems builder with a B.S. in Computer Science and professional experience shipping enterprise automation, cross-device applications, APIs/data products, AI workflows, and Linux-hosted production systems. Works end to end across TypeScript, Python, Kotlin, C#, SQL, React/React Native, Power Platform, PostgreSQL/SQLite, and modern API tooling.', 8.7, 10.2);

  section('Technical Skills');
  skill('Languages', 'TypeScript, Python, JavaScript, Kotlin, C#, SQL');
  skill('Application', 'React, React Native/Expo, Next.js, Preact, Electron, Jetpack Compose, Astro, Power Apps');
  skill('Backend & Data', 'Node.js, Hono, Express, FastAPI, REST/OpenAPI, MCP, PostgreSQL, SQLite, Prisma, Drizzle, Zod, JSON Schema');
  skill('AI & Systems', 'LLM pipelines, tool calling, grounding/verification, Linux, Docker, PM2, Caddy/Nginx, GitHub Actions, Power Automate, SharePoint, Power BI');

  section('Professional Experience');
  entry('Flash AI Solutions | Founder & Engineer | Remote', 'Jan 2026 - Present');
  bullet('Build and operate production software across AI systems, APIs/data products, automation, and cross-device applications, owning architecture, implementation, deployment, monitoring, and iteration.');
  bullet('Shipped Flash Props, a commercial sports/esports API whose OpenAPI REST surface and 12-tool MCP interface share normalized typed models, with HMAC-hashed API keys, tiered rate limits, Stripe billing, and evidence-backed data flows.');
  bullet('Built Flashpoint across Electron, React Native, Kotlin/Jetpack Compose for Fire TV, and Preact for Samsung Tizen; four clients share one session authority with language-aware source ranking, server-side continuation, and cross-device playback state.');
  bullet('Operate roughly 30 supervised services on a Linux/Hetzner VPS behind Caddy TLS and publish reusable engineering components extracted from shipped systems, including TV focus navigation, continuity patterns, schemas, and monitoring infrastructure.');

  entry('Mobile County Public Schools | Application Developer | Mobile, AL', 'Apr 2024 - Jan 2026');
  bullet('Owned the district travel reimbursement and voucher platform across Power Apps, Power Automate, SharePoint, and Microsoft 365, consolidating three applications into one approval pipeline.');
  bullet('Implemented GL processing, audit trails, role-based routing, mileage calculations, dynamic approvals, notifications, and production error handling; also built discipline referral and district asset-tracking applications.');
  bullet('Automated HTML-to-PDF compliance documents, optimized OData queries with batching, and built Power BI reporting from SharePoint and SQL data sources.');

  entry('Keesler Federal Credit Union | Software Development Intern | Mobile, AL', 'May 2022 - Mar 2023');
  bullet('Built process automation with UiPath and Power Platform, wrote SQL reporting, created Power BI dashboards, and wrote PowerShell/VB scripts for internal support automation.');

  section('Selected Engineering Work');
  entry('Chalkline | TypeScript, Next.js 16, React 19, Zod, PostgreSQL, Vitest', '2026');
  bullet('Built an AI-assisted teaching-materials studio where typed validation, automated tests, and a verification harness check printable worksheet output before it reaches users.');
  entry('TV Focus Navigation Kit | Kotlin, Jetpack Compose for TV, Gradle', '2026');
  bullet('Extracted hard D-pad behavior from a shipped Fire TV client into a reusable library/demo covering bring-into-view, hero scroll-race protection, cross-zone focus resolution, and restore-on-back.');
  entry('FirstApply | TypeScript, Node.js, Supabase/PostgreSQL, LLM Matching', '2026');
  bullet('Built a job discovery pipeline that rejects matches until it verifies the role is genuinely remote and the application path is free, combining deterministic checks with LLM-assisted matching.');

  section('Education');
  text(M, y, s(8.9), 'Bachelor of Science in Computer Science | University of South Alabama | 2023');
  y -= s(10);

  return y;
}

/**
 * Auto-fit: find the largest type scale whose last baseline still clears the
 * bottom margin. Bigger scale always consumes more height (bigger type plus
 * more wrapped lines), so the predicate is monotonic and a bisection converges.
 * This is why adding a bullet can never silently push the resume to two pages:
 * the type shrinks to absorb it, and MIN_SCALE fails loudly if it cannot.
 */
const FLOOR = M + 14;       // last baseline must clear the margin by a line
const MIN_SCALE = 0.75, MAX_SCALE = 1.35;

let lo = MIN_SCALE, hi = MAX_SCALE;
if (layout(MAX_SCALE) >= FLOOR) {
  lo = MAX_SCALE;           // everything fits even at the ceiling
} else {
  if (layout(MIN_SCALE) < FLOOR) {
    throw new Error(`Resume cannot fit one page even at ${MIN_SCALE}x. Cut content.`);
  }
  for (let i = 0; i < 32; i++) {
    const mid = (lo + hi) / 2;
    if (layout(mid) >= FLOOR) lo = mid; else hi = mid;
  }
}
const finalY = layout(lo);

const stream = ops.join('\n') + '\n';
const objects = [];
objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
objects[2] = '<< /Type /Pages /Kids [3 0 R] /Count 1 >>';
objects[3] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> /Contents 4 0 R >>`;
objects[4] = `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}endstream`;
objects[5] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
objects[6] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';
objects[7] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>';
objects[8] = '<< /Title (Jaylon Malone Resume) /Author (Jaylon Malone) /Subject (Software Engineering Resume) >>';

let pdf = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
const offsets = [0];
for (let i=1;i<objects.length;i++) {
  offsets[i] = Buffer.byteLength(pdf, 'binary');
  pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
}
const xref = Buffer.byteLength(pdf, 'binary');
pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
for (let i=1;i<objects.length;i++) pdf += `${String(offsets[i]).padStart(10,'0')} 00000 n \n`;
pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R /Info 8 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
fs.writeFileSync(out, Buffer.from(pdf, 'binary'));
console.log(`Generated ${out} (${fs.statSync(out).size} bytes) at ${lo.toFixed(3)}x, body ${(8.4*lo).toFixed(1)}pt, last baseline y=${finalY.toFixed(1)}`);
