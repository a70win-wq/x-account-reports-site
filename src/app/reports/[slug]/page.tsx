import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConclusionCard } from "@/components/ConclusionCard";
import { ReportBody } from "@/components/ReportBody";
import { ReportExpand } from "@/components/ReportExpand";
import { getAdjacentReports, getAllReports, getReport } from "@/lib/reports";
import { metricChips, parseReportStructure, shortLearnablePoints } from "@/lib/structure";

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
  const structure = parseReportStructure(report.body);
  const takeaways = shortLearnablePoints(structure.learnablePoints, 3);
  const chips = metricChips(structure.hardMetricLines, 4);

  return (
    <main className="mx-auto w-full max-w-[42rem] flex-1 px-5 py-8 sm:px-8 sm:py-12">
      <p>
        <Link
          href="/"
          className="inline-flex items-center text-[16px] text-amber hover:text-cream"
        >
          ← 返回全部報告
        </Link>
      </p>

      <ConclusionCard report={report} takeaways={takeaways} chips={chips} />

      <ReportExpand toc={structure.toc}>
        <article>
          <ReportBody sections={structure.sections} />
        </article>
      </ReportExpand>

      <nav className="mt-16 flex flex-col gap-4 border-t border-rule pt-8 text-[15px] sm:flex-row sm:justify-between">
        {previous ? (
          <Link href={`/reports/${previous.slug}`} className="text-muted hover:text-cream">
            <span className="block text-[13px] text-faint">上一篇</span>
            {previous.displayName ?? `@${previous.handle}`}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/reports/${next.slug}`} className="text-right text-muted hover:text-cream">
            <span className="block text-[13px] text-faint">下一篇</span>
            {next.displayName ?? `@${next.handle}`}
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
