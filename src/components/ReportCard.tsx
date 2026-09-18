import Link from "next/link";
import { CompletenessBadge } from "@/components/CompletenessBadge";
import { formatFollowers } from "@/lib/format";
import type { ReportSummary } from "@/lib/types";

export function ReportCard({ report }: { report: ReportSummary }) {
  const name = report.displayName ?? `@${report.handle}`;

  return (
    <article className="group relative flex h-full flex-col py-2">
      <h2 className="font-serif text-[2rem] leading-tight text-cream sm:text-[2.25rem]">
        <Link href={`/reports/${report.slug}`} className="after:absolute after:inset-0">
          {name}
        </Link>
      </h2>

      <p className="mt-2 text-lg text-amber">{`@${report.handle}`}</p>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] text-cream/85">
        {report.followers != null ? <span>{formatFollowers(report.followers)}</span> : null}
        <time dateTime={report.date}>{report.dateLabel}</time>
        <CompletenessBadge value={report.completeness} />
      </div>

      {report.conclusion ? (
        <p className="mt-6 line-clamp-2 max-w-xl text-[1.05rem] leading-8 text-cream/80">
          {report.conclusion}
        </p>
      ) : null}
    </article>
  );
}
