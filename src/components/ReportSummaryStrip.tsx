import { CompletenessBadge } from "@/components/CompletenessBadge";
import { formatFollowers } from "@/lib/format";
import type { Report } from "@/lib/types";

export function ReportSummaryStrip({ report }: { report: Report }) {
  const name = report.displayName ?? `@${report.handle}`;

  return (
    <header className="mt-6 border border-rule-strong/80 bg-card px-5 py-6 sm:px-7 sm:py-7">
      <div className="flex flex-wrap items-center gap-2.5">
        <CompletenessBadge value={report.completeness} />
        <time dateTime={report.date} className="text-[15px] text-muted">
          {report.dateLabel}
        </time>
      </div>

      <h1 className="mt-4 font-serif text-[2rem] leading-tight text-cream sm:text-[2.6rem]">
        {name}
      </h1>
      <p className="mt-2 text-lg text-amber">
        <a href={report.xUrl} target="_blank" rel="noreferrer" className="hover:text-cream">
          {`@${report.handle}`}
        </a>
      </p>

      {report.followers != null ? (
        <p className="mt-3 text-[17px] text-cream/90">{formatFollowers(report.followers)}</p>
      ) : null}

      {report.conclusion ? (
        <p className="mt-5 max-w-xl border-t border-rule pt-5 text-[17px] leading-8 text-cream">
          {report.conclusion}
        </p>
      ) : null}
    </header>
  );
}
