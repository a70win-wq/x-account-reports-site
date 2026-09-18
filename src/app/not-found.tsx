import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-5 py-20">
      <p className="font-mono text-[11px] tracking-[0.28em] text-seal">404</p>
      <h1 className="mt-3 font-serif text-4xl text-cream">找不到這篇報告</h1>
      <p className="mt-4 leading-8 text-muted">也許檔名改了，或這則還沒放進目錄。</p>
      <Link href="/" className="mt-8 text-amber hover:text-cream">
        回到目錄
      </Link>
    </main>
  );
}
