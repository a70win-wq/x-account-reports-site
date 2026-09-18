import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-5 py-20">
      <h1 className="font-serif text-4xl text-cream">找不到這篇報告</h1>
      <p className="mt-4 leading-8 text-muted">也許檔名改了，或這則還沒放進目錄。</p>
      <Link href="/" className="mt-8 text-amber hover:text-cream">
        ← 返回全部報告
      </Link>
    </main>
  );
}
