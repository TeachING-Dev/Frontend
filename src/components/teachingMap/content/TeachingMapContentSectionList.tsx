import type { TeachingMapContentSection } from "../../../pages/TeachingMapContentPage";
import TeachingMapContentSectionItem from "./TeachingMapContentSectionItem";

interface TeachingMapContentSectionListProps {
  sections: TeachingMapContentSection[];
  onHighlightClick: (sectionId: number) => void;
}

const TeachingMapContentSectionList = ({
  sections,
  onHighlightClick,
}: TeachingMapContentSectionListProps) => {
  return (
    <div className="flex w-full flex-col items-start px-[30px] py-[10px]">
      {sections.map((section, index) => (
        <TeachingMapContentSectionItem
          key={section.id}
          section={section}
          isLast={index === sections.length - 1}
          onHighlightClick={onHighlightClick}
        />
      ))}
    </div>
  );
};

export default TeachingMapContentSectionList;
