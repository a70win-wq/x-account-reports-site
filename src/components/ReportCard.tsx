import Link from "next/link";
import { CompletenessBadge } from "@/components/CompletenessBadge";
import { formatFollowers } from "@/lib/format";
import type { ReportSummary } from "@/lib/types";

export function ReportCard({ report }: { report: ReportSummary }) {
  return (
    <article className="group relative flex h-full flex-col border border-rule bg-card/80 p-5 transition-colors hover:border-amber/50 hover:bg-card">
      <div className="flex items-start justify-between gap-3">
        <time
          dateTime={report.date}
          className="font-mono text-[11px] tracking-[0.16em] text-muted"
        >
          {report.date.replaceAll("-", ".")}
        </time>
        <CompletenessBadge value={report.completeness} />
      </div>

      <h2 className="mt-5 font-serif text-[1.65rem] leading-snug text-cream">
        <Link
          href={`/reports/${report.slug}`}
          className="after:absolute after:inset-0"
        >
          {report.displayName ?? `@${report.handle}`}
        </Link>
      </h2>

      <p className="mt-1 font-mono text-sm text-amber">@{report.handle}</p>

      {report.conclusion ? (
        <p className="mt-4 line-clamp-2 text-[15px] leading-7 text-muted">
          {report.conclusion}
        </p>
      ) : null}

      <div className="mt-auto flex items-end justify-between gap-3 pt-6 text-sm">
        <span className="text-cream/90">
          {report.followers != null ? formatFollowers(report.followers) : "粉絲未標"}
        </span>
        <span className="font-mono text-[11px] tracking-widest text-faint group-hover:text-amber">
          閱讀全文
        </span>
      </div>
    </article>
  );
}
