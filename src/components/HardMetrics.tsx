export function HardMetrics({ lines }: { lines: string[] }) {
  if (lines.length === 0) return null;

  return (
    <section className="mt-6" aria-label="原文硬數">
      <p className="text-[13px] text-faint">原文硬數</p>
      <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {lines.map((line) => (
          <li
            key={line}
            className="border border-rule bg-card/80 px-3.5 py-2.5 text-[15px] leading-6 text-cream/90"
          >
            {line}
          </li>
        ))}
      </ul>
    </section>
  );
}
