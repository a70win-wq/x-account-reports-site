import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompletenessBadge } from "@/components/CompletenessBadge";
import { MarkdownBody } from "@/components/MarkdownBody";
import { formatFollowers } from "@/lib/format";
import { getAdjacentReports, getAllReports, getReport } from "@/lib/reports";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllReports().map((report) => ({ slug: report.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const report = getReport(slug);
  if (!report) return { title: "找不到報告" };
  const name = report.displayName ? `${report.displayName}（@${report.handle}）` : `@${report.handle}`;
  return {
    title: name,
    description: report.conclusion ?? `${name} 的 X 帳號全析報告`,
  };
}

export default async function ReportPage({ params }: PageProps) {
  const { slug } = await params;
  const report = getReport(slug);
  if (!report) notFound();

  const { previous, next } = getAdjacentReports(slug);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <p className="font-mono text-[12px] text-muted">
        <Link href="/" className="hover:text-cream">
          目錄
        </Link>
        <span className="mx-2 text-faint">／</span>
        <span>{`@${report.handle}`}</span>
      </p>

      <header className="mt-6 border-b border-rule pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <time dateTime={report.date} className="font-mono text-[12px] tracking-[0.16em] text-muted">
            {report.dateLabel}
          </time>
          <CompletenessBadge value={report.completeness} />
        </div>
        <h1 className="mt-4 font-serif text-[2.1rem] leading-tight text-cream sm:text-5xl">
          {report.displayName ?? `@${report.handle}`}
        </h1>
        <p className="mt-3 font-mono text-amber">
          <a href={report.xUrl} target="_blank" rel="noreferrer" className="hover:text-cream">
            {`@${report.handle}`}
          </a>
        </p>
        {report.conclusion ? (
          <p className="mt-5 max-w-xl text-base leading-8 text-muted">{report.conclusion}</p>
        ) : null}
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-cream/90">
          {report.followers != null ? (
            <div>
              <dt className="font-mono text-[11px] tracking-widest text-faint">粉絲</dt>
              <dd className="mt-1">{formatFollowers(report.followers)}</dd>
            </div>
          ) : null}
          <div>
            <dt className="font-mono text-[11px] tracking-widest text-faint">報告日</dt>
            <dd className="mt-1">{report.dateLabel}</dd>
          </div>
        </dl>
      </header>

      <article className="pt-2">
        <MarkdownBody markdown={report.body} />
      </article>

      <nav className="mt-14 flex flex-col gap-4 border-t border-rule pt-8 text-sm sm:flex-row sm:justify-between">
        {previous ? (
          <Link href={`/reports/${previous.slug}`} className="text-muted hover:text-cream">
            <span className="block font-mono text-[11px] tracking-widest text-faint">較舊</span>
            {`@${previous.handle}`}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/reports/${next.slug}`} className="text-right text-muted hover:text-cream">
            <span className="block font-mono text-[11px] tracking-widest text-faint">較新</span>
            {`@${next.handle}`}
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
