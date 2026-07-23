import TrashFolderCard from "./TrashFolderCard";
import type { TrashFolderItem } from "./trashTypes";

interface TrashFolderListProps {
  folders: TrashFolderItem[];
  isRestoreMode: boolean;
  selectedItemIds: number[];
  onSelect: (folderId: number) => void;
}

const TrashFolderList = ({
  folders,
  isRestoreMode,
  selectedItemIds,
  onSelect,
}: TrashFolderListProps) => {
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-6">
      {folders.map((folder) => (
        <TrashFolderCard
          key={folder.id}
          folder={folder}
          isRestoreMode={isRestoreMode}
          isSelected={selectedItemIds.includes(
            folder.id,
          )}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default TrashFolderList;