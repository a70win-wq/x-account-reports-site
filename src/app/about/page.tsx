import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "關於",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:px-8 sm:py-16">
      <p className="font-mono text-[11px] tracking-[0.28em] text-seal">ABOUT</p>
      <h1 className="mt-3 font-serif text-4xl text-cream">關於這份目錄</h1>
      <div className="mt-8 space-y-6 text-[17px] leading-8 text-muted">
        <p>每日自找 X 帳號全析 · 只讀公開資料。</p>
        <p>
          這裡只陳列 Chris「X帳號研究」工作流產出的日更報告。每篇對應
          <code className="mx-1 border border-rule bg-ink px-1.5 py-0.5 font-mono text-[13px] text-cream">
            content/reports/
          </code>
          裡的一篇 Markdown，建置時靜態讀入，沒有資料庫，也不連 X API。
        </p>
        <p>
          報告裡的數字、缺口與「看不到」都保留原文。本站不 follow、不按讚、不發帖，也不補算未寫明的數據。
        </p>
        <p>
          標了「完整」或「部分」的，才顯示印章；沒寫就不加。搜尋可對 handle、顯示名與一句結論。
        </p>
      </div>
    </main>
  );
}
