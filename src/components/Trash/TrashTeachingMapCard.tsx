import TeachingMapCard, {
  type TeachingMapCardData,
} from "../teachingMap/main/TeachingMapCard";
import formatDeletedAt from "../../utils/formatDeletedAt";
import type { TrashTeachingMapItem } from "./trashTypes";

interface TrashTeachingMapCardProps {
  teachingMap: TrashTeachingMapItem;
  isRestoreMode: boolean;
  isSelected: boolean;
  onSelect: (teachingMapId: number) => void;
}

const TrashTeachingMapCard = ({
  teachingMap,
  isRestoreMode,
  isSelected,
  onSelect,
}: TrashTeachingMapCardProps) => {
  const cardData: TeachingMapCardData = {
    id: teachingMap.id,
    title: teachingMap.title,
    description: teachingMap.description,
    type: teachingMap.type,
    status: teachingMap.status === "FINISHED" ? "completed" : "inProgress",
    currentStep: teachingMap.currentStep,
    totalStep: teachingMap.totalStep,
    thumbnailSrc: teachingMap.thumbnails[0] ?? "/icons.svg",
    thumbnailSrcs: teachingMap.thumbnails.slice(0, 3),
    extraThumbnailCount: teachingMap.extraThumbnailCount,
    deletedAtLabel: formatDeletedAt(teachingMap.deletedAt),
  };

  return (
    <TeachingMapCard
      teachingMap={cardData}
      isDeleteMode={isRestoreMode}
      isSelected={isSelected}
      onSelect={onSelect}
    />
  );
};

export default TrashTeachingMapCard;