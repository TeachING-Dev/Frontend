import MarkdownContent from "../../common/MarkdownContent";
import type { TeachingMapContentSection } from "./teachingMapContentTypes";

interface TeachingMapContentSectionItemProps {
  title: string;
  summary: string;
  sections: TeachingMapContentSection[];
  onHighlightClick: (sectionId: number) => void;
}

const TeachingMapContentSectionItem = ({
  summary,
  sections,
  onHighlightClick,
}: TeachingMapContentSectionItemProps) => (
  <article className="min-w-0 max-w-full pb-[40px]">
    <MarkdownContent
      content={summary}
      highlights={sections.map((section) => ({
        id: section.id,
        text: section.highlightText,
        type: section.highlightType,
      }))}
      onHighlightClick={onHighlightClick}
      className="mt-[10px] text-[20px] font-light leading-[180%] tracking-[-0.15px] text-[#A1A1A5] max-lg:mt-0 max-lg:text-[13px] max-lg:leading-[150%]"
      imageClassName="mx-auto block max-h-full w-auto max-w-[500px] rounded-[8px] object-contain"
    />
  </article>
);

export default TeachingMapContentSectionItem;
