import { MarkdownBody } from "@/components/MarkdownBody";
import { looksLikeMetaNote } from "@/lib/markdown-text";
import type { ReportSection } from "@/lib/structure";

function isMetaLead(markdown: string): boolean {
  return looksLikeMetaNote(markdown) || /\/workspace\//.test(markdown);
}

function ResearchFold({
  id,
  title,
  note,
  markdown,
}: {
  id?: string;
  title: string;
  note: string;
  markdown: string;
}) {
  return (
    <details id={id} className="research-fold mt-10 scroll-mt-24">
      <summary className="cursor-pointer text-[16px] leading-7 text-faint">
        <span className="font-serif text-cream/70">{title}</span>
        <span className="ml-2 text-[13px]">{note}</span>
      </summary>
      <div className="mt-4">
        <MarkdownBody markdown={markdown} className="is-muted" />
      </div>
    </details>
  );
}

export function ReportBody({ sections }: { sections: ReportSection[] }) {
  const leadMeta = sections.find(
    (section) => section.kind === "lead" && isMetaLead(section.markdown),
  );
  const visible = sections.filter(
    (section) => !(section.kind === "lead" && isMetaLead(section.markdown)),
  );

  return (
    <div className="report-body pt-2">
      {visible.map((section) => {
        if (section.kind === "learnable") {
          return null;
        }

        if (section.kind === "research" && section.title) {
          return (
            <ResearchFold
              key={section.id}
              id={section.id}
              title={section.title}
              note="（研究備註，可略過）"
              markdown={section.markdown}
            />
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

      {leadMeta ? (
        <ResearchFold
          key="lead-meta"
          title="研究備註"
          note="（來源與路徑，可略過）"
          markdown={leadMeta.markdown}
        />
      ) : null}
    </div>
  );
}
