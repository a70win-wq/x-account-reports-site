import Link from "next/link";
import { CompletenessBadge } from "@/components/CompletenessBadge";
import { formatFollowers } from "@/lib/format";
import type { ReportSummary } from "@/lib/types";

export function ReportCard({ report }: { report: ReportSummary }) {
  return (
    <article className="group relative flex h-full flex-col border border-rule-strong/70 bg-card p-6 shadow-[0_12px_32px_rgba(0,0,0,0.28)] transition-colors hover:border-amber">
      <h2 className="font-serif text-[1.85rem] leading-tight text-cream sm:text-[2rem]">
        <Link href={`/reports/${report.slug}`} className="after:absolute after:inset-0">
          {report.displayName ?? `@${report.handle}`}
        </Link>
      </h2>

      <p className="mt-2 text-[17px] text-amber">{`@${report.handle}`}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] text-cream/90">
        <span>{report.followers != null ? formatFollowers(report.followers) : "粉絲未標"}</span>
        <time dateTime={report.date}>{report.dateLabel}</time>
        <CompletenessBadge value={report.completeness} />
      </div>

      {report.conclusion ? (
        <p className="mt-5 text-[16px] leading-7 text-muted">{report.conclusion}</p>
      ) : null}

      <p className="mt-auto pt-6 text-[15px] text-amber group-hover:text-cream">看完整報告</p>
    </article>
  );
}
