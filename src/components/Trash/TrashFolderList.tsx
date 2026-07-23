import TrashFolderCard from "./TrashFolderCard";
import type { TrashFolderItem } from "./trashTypes";

interface TrashFolderListProps {
  folders: TrashFolderItem[];
  onRestore: (folderId: number) => void;
}

const TrashFolderList = ({
  folders,
  onRestore,
}: TrashFolderListProps) => {
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-6">
      {folders.map((folder) => (
        <TrashFolderCard
          key={folder.id}
          folder={folder}
          onRestore={onRestore}
        />
      ))}
    </div>
  );
};

export default TrashFolderList;