import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "content", "reports");
const files = fs.readdirSync(dir).filter((name) => name.endsWith(".md"));
const FILENAME_RE = /^(.+)-(\d{8})(?:_[a-z0-9]+)?\.md$/i;

function first(source, patterns) {
  for (const pattern of patterns) {
    const match = source.match(pattern);
    if (match?.[1]?.trim()) return match[1].trim();
  }
  return null;
}

const rows = files.map((filename) => {
  const md = fs.readFileSync(path.join(dir, filename), "utf8");
  const name = filename.match(FILENAME_RE);
  const handle = first(md, [/@([A-Za-z0-9_]+)/]);
  const date = first(md, [/報告日期：(\d{4}-\d{2}-\d{2})/, /定稿日期：(\d{4}-\d{2}-\d{2})/]);
  const followers = first(md, [
    /\|\s*粉絲\s*\|\s*[約~～]?\s*\**([0-9,]+)/,
    /\|\s*粉／[^\n|]*\|\s*[約~～]?\s*\**([0-9,]+)/,
  ]);
  const display = first(md, [/@[\w]+`?（([^）]+)）/, /\|\s*顯示名\s*\|\s*([^|]+)\|/]);
  const head = md.slice(0, 1200);
  const completeness = /部分報告|【部分/.test(head)
    ? "部分"
    : /完整報告/.test(head)
      ? "完整"
      : "—";
  const conclusion = first(md, [
    /\*\*人設一句\*\*[：:]?\s*(.+)/,
    /\*\*定位一句\*\*[：:]?\s*(.+)/,
    /## 0\.\s*一句結論\s*\n+(.+)/,
    /成長機制摘要[：:]\s*(.+)/,
    /人設[：:]\s*\*\*(.+?)\*\*/,
  ]);
  return {
    filename,
    parsedName: Boolean(name),
    handle,
    display: display?.replace(/\*\*/g, "").trim(),
    date: date ?? (name ? `${name[2].slice(0, 4)}-${name[2].slice(4, 6)}-${name[2].slice(6, 8)}` : null),
    followers,
    completeness,
    conclusion: conclusion ? conclusion.replace(/\*\*/g, "").slice(0, 40) : "—",
  };
});

console.table(rows);
if (files.length !== 11) {
  console.error(`expected 11 reports, got ${files.length}`);
  process.exit(1);
}
if (rows.some((row) => !row.parsedName || !row.handle || !row.date)) {
  console.error("missing handle or date");
  process.exit(1);
}
console.log("ok", files.length, "reports");
