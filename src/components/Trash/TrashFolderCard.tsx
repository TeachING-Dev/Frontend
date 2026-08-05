import type { TrashFolderItem } from "./trashTypes";
import formatDeletedAt from "../../utils/formatDeletedAt";
import FolderCard from "../common/FolderCard";

interface TrashFolderCardProps {
  folder: TrashFolderItem;
  isRestoreMode: boolean;
  isSelected: boolean;
  onSelect: (folderId: number) => void;
  onOpen: (folderId: number) => void;
}

const TrashFolderCard = ({
  folder,
  isRestoreMode,
  isSelected,
  onSelect,
  onOpen,
}: TrashFolderCardProps) => {
  const handleCardClick = () => {
    if (isRestoreMode) {
      onSelect(folder.id);
      return;
    }

    onOpen(folder.id);
  };

  return (
    <FolderCard
      variant="trash"
      name={folder.name}
      itemCount={folder.itemCount}
      meta={formatDeletedAt(folder.deletedAt)}
      selectable={isRestoreMode}
      selected={isSelected}
      onClick={handleCardClick}
    />
  );
};

export default TrashFolderCard;
