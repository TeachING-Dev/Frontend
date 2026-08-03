import type { ReactNode } from "react";

type MarkdownContentProps = {
  content: string;
  renderInline?: (text: string, lineIndex: number) => ReactNode;
  className?: string;
};

const MarkdownContent = ({
  content,
  renderInline = (text) => text,
  className = "",
}: MarkdownContentProps) => {
  const lines = content.split("\n");

  return (
    <div className={`space-y-3 ${className}`}>
      {lines.map((line, index) => {
        const heading = /^(#{1,3})\s+(.+)$/.exec(line);
        if (heading) {
          const level = heading[1].length;
          const headingClass =
            level === 1
              ? "text-[24px] font-bold text-[#F5F2FF]"
              : level === 2
                ? "text-[20px] font-semibold text-[#F5F2FF]"
                : "text-[17px] font-semibold text-[#D0D0D2]";
          return (
            <h3 key={index} className={headingClass}>
              {renderInline(heading[2], index)}
            </h3>
          );
        }

        const listItem = /^[-*]\s+(.+)$/.exec(line);
        if (listItem) {
          return (
            <div key={index} className="flex gap-2">
              <span aria-hidden="true">•</span>
              <p>{renderInline(listItem[1], index)}</p>
            </div>
          );
        }

        if (!line.trim()) return <div key={index} className="h-2" />;

        return <p key={index}>{renderInline(line, index)}</p>;
      })}
    </div>
  );
};

export default MarkdownContent;