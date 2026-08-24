import fs from 'node:fs';
import path from 'node:path';

const out = process.argv[2] || 'public/JaylonMalone_Resume.pdf';
fs.mkdirSync(path.dirname(out), { recursive: true });

const PAGE_W = 612, PAGE_H = 792;
const M = 42;
const BLUE = '0.12 0.31 0.47';
let y = 754;
const ops = [];

function esc(s) { return s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)'); }
function text(x, yy, size, str, font='F1', color='0 0 0') {
  ops.push(`BT /${font} ${size} Tf ${color} rg 1 0 0 1 ${x.toFixed(1)} ${yy.toFixed(1)} Tm (${esc(str)}) Tj ET`);
}
function line(x1, yy, x2, width=0.7, color=BLUE) {
  ops.push(`${color} RG ${width} w ${x1} ${yy} m ${x2} ${yy} l S`);
}
function wrap(str, max=96) {
  const words = str.split(/\s+/); const lines=[]; let cur='';
  for (const w of words) {
    const n = cur ? `${cur} ${w}` : w;
    if (n.length > max && cur) { lines.push(cur); cur=w; } else cur=n;
  }
  if (cur) lines.push(cur); return lines;
}
function centered(str, size, font='F1', color='0 0 0', factor=0.50) {
  const width = str.length * size * factor;
  text((PAGE_W-width)/2, y, size, str, font, color);
}
function section(title) {
  y -= 13;
  text(M, y, 10, title.toUpperCase(), 'F2', BLUE);
  y -= 3; line(M, y, PAGE_W-M, 0.65); y -= 10;
}
function para(str, size=8.8, max=103, leading=10.4) {
  for (const l of wrap(str,max)) { text(M, y, size, l); y -= leading; }
  y -= 1;
}
function skill(label, value) {
  const prefix = `${label}: `;
  const max = 105;
  const lines = wrap(prefix + value, max);
  for (let i=0; i<lines.length; i++) {
    if (i === 0 && lines[i].startsWith(prefix)) {
      text(M, y, 8.6, `${label}:`, 'F2');
      text(M + label.length*4.45 + 9, y, 8.6, lines[i].slice(prefix.length));
    } else {
      text(M + 10, y, 8.6, lines[i]);
    }
    y -= 9.8;
  }
}
function entry(left, right) {
  text(M, y, 8.9, left, 'F2');
  const rw = right.length * 8.9 * 0.47;
  text(PAGE_W-M-rw, y, 8.9, right, 'F3');
  y -= 10.8;
}
function bullet(str) {
  text(M+4, y, 8.4, '-');
  const lines = wrap(str, 101);
  for (let i=0;i<lines.length;i++) { text(M+14, y, 8.4, lines[i]); y -= 9.6; }
  y -= 0.7;
}

centered('JAYLON MALONE', 17, 'F2', BLUE, 0.54); y -= 18;
centered('Software Engineer | Application Developer | AI & Systems Engineering', 9.6, 'F2', '0 0 0', 0.49); y -= 14;
centered('Mobile, AL | (251) 391-5222 | jaylon@flashaisolutions.org', 8.2, 'F1', '0 0 0', 0.48); y -= 11;
centered('flashaisolutions.org/work | github.com/iFan6oy | linkedin.com/in/jaylon-malone', 8.2, 'F1', BLUE, 0.47); y -= 5;

section('Professional Summary');
para('Application developer and systems builder with a B.S. in Computer Science and professional experience shipping enterprise automation, cross-device applications, APIs/data products, AI workflows, and Linux-hosted production systems. Works end to end across TypeScript, Python, Kotlin, C#, SQL, React/React Native, Power Platform, PostgreSQL/SQLite, and modern API tooling.', 8.7, 105, 10.2);

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
text(M, y, 8.9, 'Bachelor of Science in Computer Science | University of South Alabama | 2023');
y -= 10;

if (y < 28) throw new Error(`Resume overflowed page: y=${y}`);

const stream = ops.join('\n') + '\n';
const objects = [];
objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
objects[2] = '<< /Type /Pages /Kids [3 0 R] /Count 1 >>';
objects[3] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> /Contents 4 0 R >>';
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
console.log(`Generated ${out} (${fs.statSync(out).size} bytes), final y=${y}`);
