import MarkdownContent from "../../common/MarkdownContent";
import type { TeachingMapContentSection } from "./teachingMapContentTypes";

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
}: TeachingMapContentSectionItemProps) => (
  <article className="pb-[40px]">
    <div className="flex items-center gap-[16px]">
      <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[5px] bg-[#917DEC] text-[20px] font-bold text-white">
        1
      </span>
      <h2 className="text-[20px] font-medium leading-[160%] text-[#F5F2FF]">
        {title}
      </h2>
    </div>

    <MarkdownContent
      content={summary}
      highlights={sections.map((section) => ({
        id: section.id,
        text: section.highlightText,
        type: section.highlightType,
      }))}
      onHighlightClick={onHighlightClick}
      className="mt-[16px] text-[15px] font-normal leading-[160%] tracking-[-0.15px] text-[#A1A1A5]"
    />
  </article>
);

export default TeachingMapContentSectionItem;
