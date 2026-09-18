import { ReportGallery } from "@/components/ReportGallery";
import { getReportSummaries } from "@/lib/reports";

export default function Home() {
  const reports = getReportSummaries();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <section className="max-w-2xl">
        <p className="font-mono text-[11px] tracking-[0.28em] text-seal">
          ARCHIVE
        </p>
        <h1 className="mt-3 font-serif text-[2.15rem] leading-tight text-cream sm:text-5xl">
          過往每日拆號
        </h1>
        <p className="mt-5 text-base leading-8 text-muted sm:text-lg">
          每日自找 X 帳號全析 · 只讀公開資料。卡片上的粉絲、日期與一句判斷皆從原文抽出，不另估算。
        </p>
      </section>

      <section className="mt-10">
        <ReportGallery reports={reports} />
      </section>
    </main>
  );
}
