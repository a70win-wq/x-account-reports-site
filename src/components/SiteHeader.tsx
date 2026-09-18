import Link from "next/link";

const links = [
  { href: "/", label: "目錄" },
  { href: "/about", label: "關於" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 px-5 py-5 sm:px-8">
        <Link href="/" className="group block min-w-0">
          <p className="font-mono text-[11px] tracking-[0.28em] text-amber uppercase">
            X帳號研究
          </p>
          <p className="mt-1 font-serif text-xl text-cream sm:text-2xl">
            每日自找全析
          </p>
        </Link>
        <nav className="flex shrink-0 items-center gap-5 pb-1 font-sans text-sm text-muted">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
