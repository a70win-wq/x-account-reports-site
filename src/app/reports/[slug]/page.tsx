import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HardMetrics } from "@/components/HardMetrics";
import { LearnableBox } from "@/components/LearnableBox";
import { ReportBody } from "@/components/ReportBody";
import { ReportSummaryStrip } from "@/components/ReportSummaryStrip";
import { ReportToc } from "@/components/ReportToc";
import { getAdjacentReports, getAllReports, getReport } from "@/lib/reports";
import { parseReportStructure } from "@/lib/structure";

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
  const learnableSection = structure.sections.find((section) => section.kind === "learnable");

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

      <ReportSummaryStrip report={report} />
      <HardMetrics lines={structure.hardMetricLines} />
      <LearnableBox id={learnableSection?.id} points={structure.learnablePoints} />
      <ReportToc items={structure.toc} />

      <article className="mt-2">
        <ReportBody sections={structure.sections} />
      </article>

      <nav className="mt-14 flex flex-col gap-4 border-t border-rule pt-8 text-[15px] sm:flex-row sm:justify-between">
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
