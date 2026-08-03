import type { TeachingMapContentSection } from "../../../pages/TeachingMapContentPage";
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
    <div className="flex w-full flex-col items-start px-[30px] py-[10px]">
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