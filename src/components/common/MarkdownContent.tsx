import type { ComponentPropsWithoutRef, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface MarkdownHighlight {
  id: number;
  text: string;
  type: "MAIN" | "CAUTION";
}

interface MarkdownContentProps {
  content: string;
  highlights?: MarkdownHighlight[];
  onHighlightClick?: (highlightId: number) => void;
  className?: string;
  imageClassName?: string;
}

const MarkdownContent = ({
  content,
  highlights = [],
  onHighlightClick,
  className = "",
  imageClassName = "",
}: MarkdownContentProps) => {
  const renderText = (value: string): ReactNode => {
    if (highlights.length === 0) return value;

    const matches = highlights
      .flatMap((highlight) => {
        const result: Array<{ index: number; highlight: MarkdownHighlight }> = [];
        let start = 0;
        while (highlight.text && start < value.length) {
          const index = value.indexOf(highlight.text, start);
          if (index < 0) break;
          result.push({ index, highlight });
          start = index + highlight.text.length;
        }
        return result;
      })
      .sort((a, b) => a.index - b.index || b.highlight.text.length - a.highlight.text.length);

    if (matches.length === 0) return value;

    const nodes: ReactNode[] = [];
    let cursor = 0;
    matches.forEach(({ index, highlight }) => {
      if (index < cursor) return;
      if (index > cursor) nodes.push(value.slice(cursor, index));
      nodes.push(
        <button
          key={`${highlight.id}-${index}`}
          type="button"
          onClick={() => onHighlightClick?.(highlight.id)}
          className={`inline cursor-pointer break-words [overflow-wrap:anywhere] underline underline-offset-[3px] ${
            highlight.type === "MAIN"
              ? "text-[#83E2FF] decoration-[#83E2FF]"
              : "text-[#FAC3A5] decoration-[#FAC3A5]"
          }`}
        >
          {highlight.text}
        </button>,
      );
      cursor = index + highlight.text.length;
    });
    if (cursor < value.length) nodes.push(value.slice(cursor));
    return nodes;
  };

  const renderChildren = (children: ReactNode): ReactNode => {
    if (typeof children === "string") return renderText(children);
    if (Array.isArray(children)) return children.map((child) => renderChildren(child));
    return children;
  };

  const paragraph = ({ children, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p {...props}>{renderChildren(children)}</p>
  );

  return (
    <div className={`min-w-0 max-w-full space-y-[12px] break-words [overflow-wrap:anywhere] ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        p: paragraph,
        h1: ({ children, ...props }) => <h1 className="text-[24px] font-bold text-[#F5F2FF]" {...props}>{renderChildren(children)}</h1>,
        h2: ({ children, ...props }) => <h2 className="text-[20px] font-semibold text-[#F5F2FF]" {...props}>{renderChildren(children)}</h2>,
        h3: ({ children, ...props }) => <h3 className="text-[17px] font-semibold text-[#D0D0D2]" {...props}>{renderChildren(children)}</h3>,
        ul: ({ ...props }) => <ul className="ml-[22px] list-disc space-y-[6px]" {...props} />,
        ol: ({ ...props }) => <ol className="ml-[22px] list-decimal space-y-[6px]" {...props} />,
        li: ({ children, ...props }) => <li {...props}>{renderChildren(children)}</li>,
        blockquote: ({ ...props }) => <blockquote className="border-l-[3px] border-[#917DEC] pl-[14px] text-[#B9BAC0]" {...props} />,
        strong: ({ children, ...props }) => <strong {...props}>{renderChildren(children)}</strong>,
        em: ({ children, ...props }) => <em {...props}>{renderChildren(children)}</em>,
        del: ({ children, ...props }) => <del {...props}>{renderChildren(children)}</del>,
        a: ({ children, ...props }) => <a className="break-words [overflow-wrap:anywhere] text-[#A99AF2] underline underline-offset-2" target="_blank" rel="noreferrer" {...props}>{renderChildren(children)}</a>,
        code: ({ ...props }) => <code className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] rounded bg-[#242630] px-[5px] py-[2px] text-[#F5F2FF]" {...props} />,
        img: ({ ...props }) => <img className={`max-w-full ${imageClassName}`} {...props} />,
        hr: ({ ...props }) => <hr className="border-[#42444C]" {...props} />,
        table: ({ ...props }) => <div className="overflow-x-auto"><table className="w-full border-collapse" {...props} /></div>,
        th: ({ ...props }) => <th className="border border-[#42444C] bg-[#242630] px-[10px] py-[8px] text-left" {...props} />,
        td: ({ ...props }) => <td className="border border-[#42444C] px-[10px] py-[8px]" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
