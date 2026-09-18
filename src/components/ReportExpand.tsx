"use client";

import { useState, type ReactNode } from "react";
import { ReportToc } from "@/components/ReportToc";
import type { TocItem } from "@/lib/structure";

export function ReportExpand({
  toc,
  children,
}: {
  toc: TocItem[];
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-10">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="full-report"
        onClick={() => setOpen((value) => !value)}
        className="w-full border border-rule bg-transparent px-5 py-4 text-center text-[16px] text-muted transition-colors hover:border-amber hover:text-cream"
      >
        {open ? "收起完整報告" : "展開完整報告"}
      </button>

      {open ? (
        <div id="full-report" className="mt-8">
          <ReportToc items={toc} />
          {children}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="mt-12 w-full border border-rule px-5 py-3 text-center text-[15px] text-faint hover:border-amber hover:text-cream"
          >
            收起完整報告
          </button>
        </div>
      ) : null}
    </section>
  );
}
