export type TocItem = {
  id: string;
  title: string;
  shortTitle: string;
};

export type ReportSection = {
  id: string;
  title: string | null;
  markdown: string;
  kind: "lead" | "normal" | "learnable" | "appendix" | "research";
};

export type ReportStructure = {
  learnablePoints: string[];
  hardMetricLines: string[];
  toc: TocItem[];
  sections: ReportSection[];
};

const H2_RE = /^##\s+(.+)$/gm;

function headingId(title: string, used: Map<string, number>): string {
  const base =
    title
      .normalize()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "section";
  const seen = used.get(base) ?? 0;
  used.set(base, seen + 1);
  return seen === 0 ? base : `${base}-${seen + 1}`;
}

export function shortenHeading(title: string): string {
  const withoutParen = title.replace(/[（(][^）)]*[）)]/g, "").trim();
  const clipped = withoutParen.length > 16 ? `${withoutParen.slice(0, 15)}…` : withoutParen;
  return clipped || title;
}

export function isLearnableTitle(title: string): boolean {
  return /可學|可執行建議/.test(title);
}

export function isAppendixTitle(title: string): boolean {
  return /^附[：:]/.test(title) || /硬數摘要/.test(title);
}

export function isResearchTitle(title: string): boolean {
  return /資料缺口|^來源$|^\d+\.\s*來源$|^檔案$/.test(title);
}

export function stripMdMarks(value: string): string {
  return value
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractListItems(section: string): string[] {
  const items: string[] = [];
  let current: string | null = null;

  for (const rawLine of section.split("\n")) {
    const line = rawLine.replace(/\s+$/, "");
    const start = line.match(/^(?:\d+\.|[-*])\s+(.+)$/);
    if (start) {
      if (current) items.push(current.trim());
      current = start[1].trim();
      continue;
    }
    if (current && /^\s{2,}\S/.test(line)) {
      current = `${current} ${line.trim()}`;
      continue;
    }
    if (current && line.trim() === "") {
      continue;
    }
  }

  if (current) items.push(current.trim());
  return items.filter(Boolean);
}

function extractMetricLines(section: string): string[] {
  return extractListItems(section)
    .filter((line) => !/\/workspace\//.test(line))
    .filter((line) => !/^來源[：:]/.test(stripMdMarks(line)))
    .map(stripMdMarks)
    .filter(Boolean)
    .slice(0, 6);
}

function kindForTitle(title: string): ReportSection["kind"] {
  if (isLearnableTitle(title)) return "learnable";
  if (isAppendixTitle(title)) return "appendix";
  if (isResearchTitle(title)) return "research";
  return "normal";
}

export function parseReportStructure(markdown: string): ReportStructure {
  const used = new Map<string, number>();
  const matches = [...markdown.matchAll(H2_RE)];

  if (matches.length === 0) {
    return {
      learnablePoints: [],
      hardMetricLines: [],
      toc: [],
      sections: [{ id: "body", title: null, markdown, kind: "lead" }],
    };
  }

  const sections: ReportSection[] = [];
  const firstIndex = matches[0].index ?? 0;
  const lead = markdown.slice(0, firstIndex).trim();
  if (lead) {
    sections.push({ id: "lead", title: null, markdown: lead, kind: "lead" });
  }

  for (let i = 0; i < matches.length; i += 1) {
    const match = matches[i];
    const title = match[1]?.trim() ?? "";
    const start = (match.index ?? 0) + match[0].length;
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? markdown.length) : markdown.length;
    const body = markdown.slice(start, end).replace(/^\n+/, "").replace(/\n+$/, "");
    sections.push({
      id: headingId(title, used),
      title,
      markdown: body,
      kind: kindForTitle(title),
    });
  }

  const learnable = sections.find((section) => section.kind === "learnable");
  const appendix = sections.find((section) => section.kind === "appendix");

  return {
    learnablePoints: learnable ? extractListItems(learnable.markdown) : [],
    hardMetricLines: appendix ? extractMetricLines(appendix.markdown) : [],
    toc: sections
      .filter((section): section is ReportSection & { title: string } => Boolean(section.title))
      .map((section) => ({
        id: section.id,
        title: section.title,
        shortTitle: shortenHeading(section.title),
      })),
    sections,
  };
}
