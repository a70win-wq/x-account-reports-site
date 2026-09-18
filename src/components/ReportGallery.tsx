"use client";

import { useMemo, useState } from "react";
import { ReportCard } from "@/components/ReportCard";
import type { ReportSummary } from "@/lib/types";

type SortKey = "newest" | "oldest";
type CompletenessFilter = "all" | "full" | "partial";

export function ReportGallery({ reports }: { reports: ReportSummary[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [completeness, setCompleteness] = useState<CompletenessFilter>("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const next = reports.filter((report) => {
      if (completeness !== "all" && report.completeness !== completeness) {
        return false;
      }
      if (!needle) return true;
      const haystack = [
        report.handle,
        report.displayName ?? "",
        report.conclusion ?? "",
        report.title,
        report.date,
        report.dateLabel,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle) || `@${report.handle}`.toLowerCase().includes(needle);
    });

    next.sort((a, b) =>
      sort === "newest"
        ? b.date.localeCompare(a.date) || a.handle.localeCompare(b.handle)
        : a.date.localeCompare(b.date) || a.handle.localeCompare(b.handle),
    );
    return next;
  }, [completeness, query, reports, sort]);

  return (
    <div>
      <div className="flex flex-col gap-3 border border-rule bg-card/50 p-3 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="report-search">
          搜尋帳號或關鍵字
        </label>
        <input
          id="report-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜尋帳號、顯示名或關鍵字"
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-[15px] text-cream placeholder:text-faint"
        />
        <div className="flex flex-wrap items-center gap-2 border-t border-rule pt-3 sm:border-l sm:border-t-0 sm:pt-0 sm:pl-3">
          <label className="sr-only" htmlFor="report-sort">
            排序
          </label>
          <select
            id="report-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="bg-ink px-2 py-2 text-sm text-cream"
          >
            <option value="newest">日期：最新在前</option>
            <option value="oldest">日期：最舊在前</option>
          </select>
          <select
            aria-label="完整或部分"
            value={completeness}
            onChange={(event) =>
              setCompleteness(event.target.value as CompletenessFilter)
            }
            className="bg-ink px-2 py-2 text-sm text-cream"
          >
            <option value="all">全部標籤</option>
            <option value="full">只看完整</option>
            <option value="partial">只看部分</option>
          </select>
        </div>
      </div>

      <p className="mt-4 font-mono text-[12px] tracking-wide text-faint">
        {filtered.length}／{reports.length} 篇
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 border border-dashed border-rule px-5 py-12 text-center text-muted">
          沒有符合的報告。試試其他帳號或關鍵字。
        </p>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((report) => (
            <ReportCard key={report.slug} report={report} />
          ))}
        </div>
      )}
    </div>
  );
}
