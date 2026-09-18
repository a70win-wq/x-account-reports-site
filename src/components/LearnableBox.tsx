import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const inlineComponents: Components = {
  p: ({ children }) => <span>{children}</span>,
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
};

export function LearnableBox({
  id,
  points,
}: {
  id?: string;
  points: string[];
}) {
  if (points.length === 0) return null;

  return (
    <section
      id={id}
      className="learnable-box mt-8 scroll-mt-24 border border-amber/40 bg-amber/10 px-5 py-5 sm:px-6"
    >
      <h2 className="font-serif text-xl text-cream sm:text-[1.35rem]">先看這幾點</h2>
      <ol className="mt-4 space-y-3 text-[17px] leading-7 text-cream/95">
        {points.map((point) => (
          <li key={point} className="pl-1">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={inlineComponents}>
              {point}
            </ReactMarkdown>
          </li>
        ))}
      </ol>
    </section>
  );
}
