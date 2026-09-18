import { ReportGallery } from "@/components/ReportGallery";
import { getReportSummaries } from "@/lib/reports";

export default function Home() {
  const reports = getReportSummaries();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <section className="max-w-2xl">
        <h1 className="font-serif text-[2.15rem] leading-tight text-cream sm:text-5xl">
          過往每日拆號
        </h1>
        <p className="mt-5 text-[1.15rem] leading-8 text-muted">
          每日自找的 X 帳號拆解，點卡片看完整報告
        </p>
      </section>

      <section className="mt-10">
        <ReportGallery reports={reports} />
      </section>
    </main>
  );
}
