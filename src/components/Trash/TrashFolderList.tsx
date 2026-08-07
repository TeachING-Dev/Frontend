import TrashFolderCard from "./TrashFolderCard";
import type { TrashFolderItem } from "./trashTypes";

interface TrashFolderListProps {
  folders: TrashFolderItem[];
  isRestoreMode: boolean;
  selectedItemIds: number[];
  onSelect: (folderId: number) => void;
  onOpen: (folderId: number) => void;
}

const TrashFolderList = ({
  folders,
  isRestoreMode,
  selectedItemIds,
  onSelect,
  onOpen,
}: TrashFolderListProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-6">
      {folders.map((folder) => (
        <TrashFolderCard
          key={folder.id}
          folder={folder}
          isRestoreMode={isRestoreMode}
          isSelected={selectedItemIds.includes(
            folder.id,
          )}
          onSelect={onSelect}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
};

export default TrashFolderList;
