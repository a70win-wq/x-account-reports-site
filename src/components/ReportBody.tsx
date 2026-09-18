import { MarkdownBody } from "@/components/MarkdownBody";
import type { ReportSection } from "@/lib/structure";

export function ReportBody({ sections }: { sections: ReportSection[] }) {
  return (
    <div className="report-body pt-2">
      {sections.map((section) => {
        if (section.kind === "learnable") {
          return null;
        }

        if (section.kind === "research" && section.title) {
          return (
            <details
              key={section.id}
              id={section.id}
              className="research-fold mt-10 scroll-mt-24"
            >
              <summary className="cursor-pointer text-[16px] leading-7 text-faint">
                <span className="font-serif text-cream/70">{section.title}</span>
                <span className="ml-2 text-[13px]">（研究備註，可略過）</span>
              </summary>
              <div className="mt-4">
                <MarkdownBody markdown={section.markdown} className="is-muted" />
              </div>
            </details>
          );
        }

        return (
          <section key={section.id} id={section.id || undefined} className="scroll-mt-24">
            {section.title ? (
              <h2 className="report-section-title">{section.title}</h2>
            ) : null}
            <MarkdownBody markdown={section.markdown} />
          </section>
        );
      })}
    </div>
  );
}
