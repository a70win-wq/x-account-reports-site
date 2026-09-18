export type Completeness = "full" | "partial";

export type ReportSummary = {
  slug: string;
  filename: string;
  handle: string;
  displayName: string | null;
  date: string;
  dateLabel: string;
  followers: number | null;
  completeness: Completeness | null;
  conclusion: string | null;
  title: string;
  xUrl: string;
};

export type Report = ReportSummary & {
  markdown: string;
  body: string;
};
