import formatDeletedAt from "../../utils/formatDeletedAt";
import MaterialCard from "../common/MaterialCard";

import type { TrashDataItem } from "./trashTypes";

interface TrashDataCardProps {
  data: TrashDataItem;
  isRestoreMode: boolean;
  isSelected: boolean;
  onSelect: (dataId: number) => void;
}

const TrashDataCard = ({
  data,
  isRestoreMode,
  isSelected,
  onSelect,
}: TrashDataCardProps) => {
  const handleOpenOriginal = () => {
    if (data.originalUrl) {
      window.open(data.originalUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <MaterialCard
      variant="archive"
      tag={data.tag}
      date={data.createdAt.split("T")[0]}
      extraMeta={formatDeletedAt(data.deletedAt)}
      title={data.title}
      description={data.description}
      platformType={data.platformType}
      platformImageUrl={data.platformImageUrl}
      sourceImageClassName="h-[36px] w-[36px] shrink-0 object-contain"
      selectable={isRestoreMode}
      selected={isSelected}
      showOriginalButton
      onSelect={() => onSelect(data.id)}
      onOpenOriginal={handleOpenOriginal}
    />
  );
};

export default TrashDataCard;
