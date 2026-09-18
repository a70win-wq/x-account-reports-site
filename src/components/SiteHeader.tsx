import Link from "next/link";

const links = [
  { href: "/", label: "全部報告" },
  { href: "/about", label: "關於" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link href="/" className="group block min-w-0 text-[15px] text-muted hover:text-cream">
          X帳號研究
        </Link>
        <nav className="flex shrink-0 items-center gap-5 font-sans text-sm text-muted">
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
