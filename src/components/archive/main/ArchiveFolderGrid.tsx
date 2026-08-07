import type { Folder } from "../../../apis/folder";
import AddFolderGrid from "./AddFolderGrid";
import FolderGridItem from "./FolderGridItem";

type ArchiveFolderGridProps = {
  folders: Folder[];
  onAddFolder: () => void;
  onMoveToTrash?: (
    folderId: number,
  ) => void;
  isSearching?: boolean;
};

const formatDate = (date: string) => {
  return new Date(date)
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/. /g, ".")
    .replace(/.$/, "");
};

const ArchiveFolderGrid = ({
  folders,
  onAddFolder,
  onMoveToTrash,
  isSearching = false,
}: ArchiveFolderGridProps) => {
  return (
    <section className="grid grid-cols-2 gap-x-4 gap-y-[10px] lg:grid-cols-3 lg:gap-7">
      {/* 새 폴더 추가 */}
      {!isSearching && (
        <AddFolderGrid
          onClick={onAddFolder}
        />
      )}

      {/* 기존 폴더 목록 */}
      {folders.map((folder) => (
        <FolderGridItem
          key={folder.folderId}
          id={folder.folderId}
          name={folder.folderName}
          count={folder.materialCount}
          date={formatDate(
            folder.updatedAt,
          )}
          onMoveToTrash={
            onMoveToTrash
          }
        />
      ))}
    </section>
  );
};

export default ArchiveFolderGrid;
