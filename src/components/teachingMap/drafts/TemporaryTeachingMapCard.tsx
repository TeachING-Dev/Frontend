import type { TemporaryTeachingMapData } from "../../../constants/temporaryTeachingMaps";
import TeachingMapCard, {
  type TeachingMapCardData,
} from "../main/TeachingMapCard";

interface TemporaryTeachingMapCardProps {
  teachingMap: TemporaryTeachingMapData;
  isDeleteMode: boolean;
  isSelected: boolean;
  onClick: (teachingMapId: number) => void;
  onSelect: (teachingMapId: number) => void;
}

const TemporaryTeachingMapCard = ({
  teachingMap,
  isDeleteMode,
  isSelected,
  onClick,
  onSelect,
}: TemporaryTeachingMapCardProps) => {
  const cardData: TeachingMapCardData = {
    id: teachingMap.id,
    title: teachingMap.title,
    description: teachingMap.description,
    type: teachingMap.type,
    status: "inProgress",
    currentStep: 0,
    totalStep: 0,
    thumbnailSrc: teachingMap.thumbnailSrc,
    thumbnailSrcs: teachingMap.thumbnailSrcs,
    extraThumbnailCount: teachingMap.extraThumbnailCount,
  };

  return (
    <TeachingMapCard
      teachingMap={cardData}
      variant="temporary"
      ariaLabel={`${teachingMap.title} 임시 티칭맵`}
      isDeleteMode={isDeleteMode}
      isSelected={isSelected}
      onClick={onClick}
      onSelect={onSelect}
    />
  );
};

export default TemporaryTeachingMapCard;
