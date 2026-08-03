import type { TeachingMapContentSection } from "../../../pages/TeachingMapContentPage";
import MarkdownContent from "../../common/MarkdownContent";

interface TeachingMapContentSectionItemProps {
  title: string;
  summary: string;
  sections: TeachingMapContentSection[];
  onHighlightClick: (sectionId: number) => void;
}

const TeachingMapContentSectionItem = ({
  title,
  summary,
  sections,
  onHighlightClick,
}: TeachingMapContentSectionItemProps) => {
  const renderHighlightedLine = (line: string) => {
    const parts: Array<{ text: string; section?: TeachingMapContentSection }> =
      [];
    let cursor = 0;

    sections
      .map((section) => ({
        section,
        index: line.indexOf(section.highlightText),
      }))
      .filter(({ index }) => index >= 0)
      .sort((first, second) => first.index - second.index)
      .forEach(({ section, index }) => {
        if (index < cursor) return;
        if (index > cursor) parts.push({ text: line.slice(cursor, index) });
        parts.push({ text: section.highlightText, section });
        cursor = index + section.highlightText.length;
      });

    if (cursor < line.length) parts.push({ text: line.slice(cursor) });
    if (parts.length === 0) return line;

    return parts.map((part, index) =>
      part.section ? (
        <button
          key={`${part.section.highlightId}-${index}`}
          type="button"
          onClick={() => onHighlightClick(part.section!.id)}
          className={`underline ${
            part.section.highlightType === "core"
              ? "text-[#83E2FF] decoration-[#83E2FF]"
              : "text-[#FAC3A5] decoration-[#FAC3A5]"
          }`}
        >
          {part.text}
        </button>
      ) : (
        <span key={`text-${index}`}>{part.text}</span>
      ),
    );
  };

  return (
    <article className="pb-[40px]">
      <div className="flex items-center gap-[16px]">
        <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[5px] bg-[#917DEC] px-[9px] text-[20px] font-bold leading-[32px] text-white">
          1
        </span>

        <h2 className="text-[20px] font-medium leading-[160%] text-[#F5F2FF]">
          {title}
        </h2>
      </div>

      <MarkdownContent
        content={summary}
        renderInline={renderHighlightedLine}
        className="mt-[16px] text-[15px] font-normal leading-[160%] tracking-[-0.15px] text-[#A1A1A5]"
      />
    </article>
  );
};

export default TeachingMapContentSectionItem;