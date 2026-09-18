import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Completeness, Report, ReportSummary } from "./types";

const REPORTS_DIR = path.join(process.cwd(), "content", "reports");
const FILENAME_RE = /^(.+)-(\d{8})(?:_[a-z0-9]+)?\.md$/i;

function ymdToIso(ymd: string): string {
  return `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`;
}

function formatDateLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${y}年${m}月${d}日`;
}

function parseFilename(filename: string): { stem: string; isoDate: string } | null {
  const match = filename.match(FILENAME_RE);
  if (!match) return null;
  return { stem: match[1], isoDate: ymdToIso(match[2]) };
}

function firstCapture(source: string, patterns: RegExp[]): string | null {
  for (const pattern of patterns) {
    const match = source.match(pattern);
    const value = match?.[1]?.trim();
    if (value) return value;
  }
  return null;
}

function stripMd(value: string): string {
  return value
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseHandle(title: string, markdown: string, stem: string): string {
  const fromTitle = firstCapture(title, [
    /@([A-Za-z0-9_]+)/,
  ]);
  if (fromTitle) return fromTitle;

  const fromBody = firstCapture(markdown, [
    /\|\s*Handle\s*\|\s*`?@?([A-Za-z0-9_]+)`?/,
    /對象：https:\/\/x\.com\/([A-Za-z0-9_]+)/,
  ]);
  if (fromBody) return fromBody;

  const stemHandle = stem.split("-")[0];
  return stemHandle || stem;
}

function parseDisplayName(title: string, markdown: string): string | null {
  const fromTitle = firstCapture(title, [
    /@[\w]+`?（([^）]+)）/,
    /@[\w]+\s+（([^）]+)）/,
  ]);
  if (fromTitle) return stripMd(fromTitle);

  const fromTable = firstCapture(markdown, [
    /\|\s*顯示名\s*\|\s*([^|]+)\|/,
    /\|\s*Handle／顯示名\s*\|\s*@[\w]+／([^|]+)\|/,
    /Handle[^\n]*@[\w]+`?（([^）]+)）/,
  ]);
  if (fromTable) return stripMd(fromTable);

  return null;
}

function parseDate(markdown: string, fallbackIso: string): string {
  const found = firstCapture(markdown, [
    /報告日期：(\d{4}-\d{2}-\d{2})/,
    /定稿日期：(\d{4}-\d{2}-\d{2})/,
  ]);
  return found ?? fallbackIso;
}

function parseFollowers(markdown: string): number | null {
  const raw = firstCapture(markdown, [
    /\|\s*粉絲\s*\|\s*[約~～]?\s*\**([0-9,]+)/,
    /\|\s*粉／[^\n|]*\|\s*[約~～]?\s*\**([0-9,]+)/,
    /粉約\s*\**([0-9,]+)/,
  ]);
  if (!raw) return null;
  const n = Number(raw.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

function parseCompleteness(markdown: string): Completeness | null {
  const head = markdown.slice(0, 1200);
  if (/部分報告|【部分/.test(head)) return "partial";
  if (/完整報告/.test(head)) return "full";
  return null;
}

function parseConclusion(markdown: string): string | null {
  const found = firstCapture(markdown, [
    /\*\*人設一句\*\*[：:]?\s*(.+)/,
    /\*\*定位一句\*\*[：:]?\s*(.+)/,
    /## 0\.\s*一句結論\s*\n+(.+)/,
    /\*\*節奏一句\*\*[：:]?\s*(.+)/,
    /成長機制摘要[：:]\s*(.+)/,
    /人設[：:]\s*\*\*(.+?)\*\*/,
    /\*\*節奏判斷\*\*\s*\n+(?:-\s*)?(.+)/,
  ]);
  if (!found) return null;
  const oneLine = stripMd(found).replace(/^[:：]\s*/, "");
  return oneLine.length > 160 ? `${oneLine.slice(0, 159)}…` : oneLine;
}

function parseTitle(markdown: string, handle: string): string {
  const heading = markdown.match(/^#\s+(.+)$/m)?.[1];
  return heading ? stripMd(heading) : `@${handle} 帳號報告`;
}

function stripFirstHeading(markdown: string): string {
  return markdown.replace(/^#\s+.+\n+/, "");
}

function toSummary(report: Omit<Report, "markdown" | "body">): ReportSummary {
  const { slug, filename, handle, displayName, date, dateLabel, followers, completeness, conclusion, title, xUrl } =
    report;
  return {
    slug,
    filename,
    handle,
    displayName,
    date,
    dateLabel,
    followers,
    completeness,
    conclusion,
    title,
    xUrl,
  };
}

function parseReportFile(filename: string): Report | null {
  const parsedName = parseFilename(filename);
  if (!parsedName) return null;

  const raw = fs.readFileSync(path.join(REPORTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const markdown = content.trim();
  const handle =
    (typeof data.handle === "string" && data.handle.replace(/^@/, "")) ||
    parseHandle(markdown.split("\n")[0] ?? "", markdown, parsedName.stem);
  const date =
    (typeof data.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(data.date) && data.date) ||
    parseDate(markdown, parsedName.isoDate);
  const displayName =
    (typeof data.displayName === "string" && data.displayName) ||
    parseDisplayName(markdown.split("\n")[0] ?? "", markdown);
  const followers =
    (typeof data.followers === "number" && data.followers) || parseFollowers(markdown);
  const completeness = parseCompleteness(markdown);
  const conclusion =
    (typeof data.conclusion === "string" && data.conclusion) || parseConclusion(markdown);
  const title = parseTitle(markdown, handle);
  const slug = filename.replace(/\.md$/i, "");

  return {
    slug,
    filename,
    handle,
    displayName,
    date,
    dateLabel: formatDateLabel(date),
    followers: typeof followers === "number" ? followers : null,
    completeness,
    conclusion,
    title,
    xUrl: `https://x.com/${handle}`,
    markdown,
    body: stripFirstHeading(markdown),
  };
}

function readAllReports(): Report[] {
  if (!fs.existsSync(REPORTS_DIR)) return [];
  return fs
    .readdirSync(REPORTS_DIR)
    .filter((name) => name.endsWith(".md"))
    .map(parseReportFile)
    .filter((report): report is Report => report !== null)
    .sort((a, b) => b.date.localeCompare(a.date) || a.handle.localeCompare(b.handle));
}

let cache: Report[] | null = null;

export function getAllReports(): Report[] {
  if (process.env.NODE_ENV === "development") {
    return readAllReports();
  }
  cache ??= readAllReports();
  return cache;
}

export function getReportSummaries(): ReportSummary[] {
  return getAllReports().map(toSummary);
}

export function getReport(slug: string): Report | null {
  return getAllReports().find((report) => report.slug === slug) ?? null;
}

export function getAdjacentReports(slug: string): {
  previous: ReportSummary | null;
  next: ReportSummary | null;
} {
  const reports = getAllReports();
  const index = reports.findIndex((report) => report.slug === slug);
  if (index < 0) return { previous: null, next: null };
  return {
    next: reports[index - 1] ? toSummary(reports[index - 1]) : null,
    previous: reports[index + 1] ? toSummary(reports[index + 1]) : null,
  };
}
