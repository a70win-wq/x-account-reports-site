import { CompletenessBadge } from "@/components/CompletenessBadge";
import { formatFollowersNumber } from "@/lib/format";
import type { ReportSummary } from "@/lib/types";

export function ConclusionCard({
  report,
  takeaways,
  chips,
}: {
  report: ReportSummary;
  takeaways: string[];
  chips: string[];
}) {
  const name = report.displayName ?? `@${report.handle}`;

  return (
    <header className="mt-8 border border-rule-strong/70 bg-card px-6 py-8 sm:px-9 sm:py-10">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] text-cream/85">
        <CompletenessBadge value={report.completeness} />
        <time dateTime={report.date}>{report.dateLabel}</time>
      </div>

      <h1 className="mt-5 font-serif text-[2.35rem] leading-tight text-cream sm:text-[3rem]">
        {name}
      </h1>
      <p className="mt-2 text-xl text-amber">
        <a href={report.xUrl} target="_blank" rel="noreferrer" className="hover:text-cream">
          {`@${report.handle}`}
        </a>
      </p>

      {report.followers != null ? (
        <p className="mt-8">
          <span className="block font-serif text-5xl leading-none tracking-tight text-cream sm:text-6xl">
            {formatFollowersNumber(report.followers)}
          </span>
          <span className="mt-2 block text-[15px] text-faint">粉絲</span>
        </p>
      ) : null}

      {report.conclusion ? (
        <section className="mt-9 border-t border-rule pt-8">
          <h2 className="text-[13px] tracking-wide text-amber">一句打法</h2>
          <p className="mt-3 font-serif text-[1.35rem] leading-9 text-cream sm:text-[1.5rem] sm:leading-10">
            {report.conclusion}
          </p>
        </section>
      ) : null}

      {takeaways.length > 0 ? (
        <section className="mt-9">
          <h2 className="text-[13px] tracking-wide text-amber">今日學咩</h2>
          <ul className="mt-3 space-y-2.5 text-[1.05rem] leading-8 text-cream/95">
            {takeaways.map((point) => (
              <li key={point} className="flex gap-3">
                <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 bg-amber" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {chips.length > 0 ? (
        <ul className="mt-9 flex flex-wrap gap-2" aria-label="原文硬數">
          {chips.map((chip) => (
            <li
              key={chip}
              className="border border-rule bg-paper/80 px-2.5 py-1 text-[13px] leading-6 text-muted"
            >
              {chip}
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
