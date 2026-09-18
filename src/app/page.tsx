import { ReportGallery } from "@/components/ReportGallery";
import { getReportSummaries } from "@/lib/reports";

export default function Home() {
  const reports = getReportSummaries();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-16 sm:px-8 sm:py-24">
      <section className="max-w-xl">
        <h1 className="font-serif text-[2.4rem] leading-tight text-cream sm:text-5xl">
          每日自找的 X 帳號拆解
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          只讀公開資料。先看一句打法，再決定要不要展開。
        </p>
      </section>

      <section className="mt-16">
        <ReportGallery reports={reports} />
      </section>
    </main>
  );
}
