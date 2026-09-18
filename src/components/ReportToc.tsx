import type { TocItem } from "@/lib/structure";

export function ReportToc({ items }: { items: TocItem[] }) {
  if (items.length < 4) return null;

  return (
    <nav
      className="sticky top-0 z-20 -mx-5 mt-8 border-y border-rule bg-ink/95 px-5 py-3 backdrop-blur-sm sm:mx-0 sm:border sm:bg-card/95"
      aria-label="跳到章節"
    >
      <p className="text-[13px] text-faint">跳到</p>
      <div className="mt-2 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="shrink-0 border border-rule bg-paper px-3 py-1.5 text-[13px] text-muted hover:border-amber hover:text-cream"
          >
            {item.shortTitle}
          </a>
        ))}
      </div>
    </nav>
  );
}
