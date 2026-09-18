import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { flattenNodeText, looksLikeMetaNote } from "@/lib/markdown-text";

const components: Components = {
  a: ({ href, children }) => {
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
      >
        {children}
      </a>
    );
  },
  table: ({ children }) => (
    <div className="table-wrap">
      <table>{children}</table>
    </div>
  ),
  blockquote: ({ children }) => {
    const isMeta = looksLikeMetaNote(flattenNodeText(children));
    return <blockquote className={isMeta ? "is-meta" : undefined}>{children}</blockquote>;
  },
  p: ({ children }) => {
    const text = flattenNodeText(children);
    if (/\/workspace\//.test(text)) {
      return <p className="is-source-path">{children}</p>;
    }
    return <p>{children}</p>;
  },
  li: ({ children }) => {
    const text = flattenNodeText(children);
    if (/\/workspace\//.test(text)) {
      return <li className="is-source-path">{children}</li>;
    }
    return <li>{children}</li>;
  },
};

export function MarkdownBody({
  markdown,
  className,
}: {
  markdown: string;
  className?: string;
}) {
  return (
    <div className={className ? `prose-report ${className}` : "prose-report"}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
