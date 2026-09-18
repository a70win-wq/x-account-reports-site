"use client";

import { useMemo, useState } from "react";
import { ReportCard } from "@/components/ReportCard";
import type { ReportSummary } from "@/lib/types";

export function ReportGallery({ reports }: { reports: ReportSummary[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return reports;

    return reports.filter((report) => {
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
  }, [query, reports]);

  return (
    <div>
      <label className="sr-only" htmlFor="report-search">
        搜尋帳號或關鍵字
      </label>
      <input
        id="report-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="搜尋帳號"
        className="w-full max-w-md border-b border-rule bg-transparent py-3 text-[16px] text-cream placeholder:text-faint/80"
      />

      {filtered.length === 0 ? (
        <p className="mt-16 text-muted">沒有符合的報告。</p>
      ) : (
        <div className="mt-14 grid grid-cols-1 gap-x-16 gap-y-16 md:grid-cols-2">
          {filtered.map((report) => (
            <ReportCard key={report.slug} report={report} />
          ))}
        </div>
      )}
    </div>
  );
}
