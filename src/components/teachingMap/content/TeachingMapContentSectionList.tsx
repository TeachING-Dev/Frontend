import type { TeachingMapContentSection } from "../../../pages/TeachingMapContentPage";
import TeachingMapContentSectionItem from "./TeachingMapContentSectionItem";

interface TeachingMapContentSectionListProps {
  sections: TeachingMapContentSection[];
}

const TeachingMapContentSectionList = ({
  sections,
}: TeachingMapContentSectionListProps) => {
  return (
    <div className="flex w-full flex-col items-start px-[30px] py-[10px]">
      {sections.map((section, index) => (
        <TeachingMapContentSectionItem
          key={section.id}
          section={section}
          isLast={index === sections.length - 1}
        />
      ))}
    </div>
  );
};

export default TeachingMapContentSectionList;