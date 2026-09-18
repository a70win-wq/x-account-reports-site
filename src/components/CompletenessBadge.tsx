import { completenessLabel } from "@/lib/format";
import type { Completeness } from "@/lib/types";

export function CompletenessBadge({
  value,
}: {
  value: Completeness | null;
}) {
  if (!value) return null;

  const isFull = value === "full";
  return (
    <span
      className={`inline-flex items-center border px-1.5 py-0.5 font-mono text-[10px] tracking-[0.18em] ${
        isFull
          ? "border-seal/70 bg-seal/10 text-seal"
          : "border-olive/70 bg-olive/10 text-olive"
      }`}
    >
      {completenessLabel(value)}
    </span>
  );
}
