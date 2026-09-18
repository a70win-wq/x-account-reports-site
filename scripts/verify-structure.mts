import fs from "node:fs";
import path from "node:path";
import {
  metricChips,
  parseReportStructure,
  shortLearnablePoints,
} from "../src/lib/structure.ts";

const dir = path.join(process.cwd(), "content", "reports");
const files = fs.readdirSync(dir).filter((name) => name.endsWith(".md"));

let failed = 0;

for (const filename of files) {
  const markdown = fs.readFileSync(path.join(dir, filename), "utf8");
  const body = markdown.replace(/^#\s+.+\n+/, "");
  const structure = parseReportStructure(body);
  const hasLearnableHeading = /^##\s+.*(?:可學|可執行建議)/m.test(body);
  const hasAppendix = /^##\s+附[：:]/m.test(body) || /^##\s+.*硬數摘要/m.test(body);

  if (hasLearnableHeading && structure.learnablePoints.length < 3) {
    console.error(`${filename}: expected 可學／建議 points, got ${structure.learnablePoints.length}`);
    failed += 1;
  }
  if (hasAppendix && structure.hardMetricLines.length < 3) {
    console.error(`${filename}: expected 附硬數, got ${structure.hardMetricLines.length}`);
    failed += 1;
  }
  if (structure.hardMetricLines.some((line) => line.includes("/workspace/"))) {
    console.error(`${filename}: hard metric leaked /workspace/ path`);
    failed += 1;
  }
  if (structure.toc.length === 0) {
    console.error(`${filename}: missing TOC headings`);
    failed += 1;
  }

  console.log(
    filename,
    `toc=${structure.toc.length}`,
    `learn=${structure.learnablePoints.length}`,
    `metrics=${structure.hardMetricLines.length}`,
    `research=${structure.sections.filter((section) => section.kind === "research").length}`,
  );
}

const ryrenz = parseReportStructure(
  fs.readFileSync(path.join(dir, "Ryrenz-20260918.md"), "utf8").replace(/^#\s+.+\n+/, ""),
);
if (ryrenz.learnablePoints.length !== 5) {
  console.error(`Ryrenz 可學 should be 5, got ${ryrenz.learnablePoints.length}`);
  failed += 1;
}
if (ryrenz.hardMetricLines.length < 5) {
  console.error(`Ryrenz 附 should have 5+ lines, got ${ryrenz.hardMetricLines.length}`);
  failed += 1;
}
if (!ryrenz.hardMetricLines[0]?.includes("10316")) {
  console.error("Ryrenz first metric should keep 10316 from the file");
  failed += 1;
}

const takeaways = shortLearnablePoints(ryrenz.learnablePoints, 3);
if (takeaways.length !== 3 || takeaways.some((point) => point.includes("一天約"))) {
  console.error("Ryrenz 今日學咩 should be 3 short existing titles", takeaways);
  failed += 1;
}
if (!takeaways.includes("日更工廠 × 固定版式")) {
  console.error("Ryrenz first takeaway should reuse the existing bold title");
  failed += 1;
}

const chips = metricChips(ryrenz.hardMetricLines, 4);
if (chips.length !== 4) {
  console.error(`Ryrenz chips should be 4, got ${chips.length}`, chips);
  failed += 1;
}
if (!chips[0]?.includes("10316") || chips.some((chip) => chip.includes("/workspace/"))) {
  console.error("Ryrenz chips must reuse 原文硬數 text only", chips);
  failed += 1;
}

if (failed > 0) {
  process.exit(1);
}
console.log("ok", files.length, "reports");
