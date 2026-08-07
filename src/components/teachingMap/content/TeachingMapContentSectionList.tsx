import type { TeachingMapContentSection } from "./teachingMapContentTypes";
import TeachingMapContentSectionItem from "./TeachingMapContentSectionItem";

interface TeachingMapContentSectionListProps {
  title: string;
  summary: string;
  sections: TeachingMapContentSection[];
  onHighlightClick: (sectionId: number) => void;
}

const TeachingMapContentSectionList = ({
  title,
  summary,
  sections,
  onHighlightClick,
}: TeachingMapContentSectionListProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-[54px] px-[30px] pb-[10px] pt-[40px] max-lg:px-[16px] max-lg:pt-[20px]">
      <TeachingMapContentSectionItem
        title={title}
        summary={summary}
        sections={sections}
        onHighlightClick={onHighlightClick}
      />
    </div>
  );
};

export default TeachingMapContentSectionList;
