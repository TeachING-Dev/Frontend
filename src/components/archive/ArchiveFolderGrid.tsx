import type { Folder } from "../../apis/folder";

import AddFolderGrid from "./AddFolderGrid";
import FolderGridItem from "./FolderGridItem";

type ArchiveFolderGridProps = {
  folders: Folder[];
  onAddFolder: () => void;
  onMoveToTrash?: (folderId: number) => void;
};

const formatDate = (date: string) => {
  return new Date(date)
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\. /g, ".")
    .replace(/\.$/, "");
};

const ArchiveFolderGrid = ({
  folders,
  onAddFolder,
  onMoveToTrash,
}: ArchiveFolderGridProps) => {
  return (
    <section className="grid grid-cols-3 gap-7">
      {/* 새 폴더 추가 */}
      <AddFolderGrid onClick={onAddFolder} />

      {/* 기존 폴더 목록 */}
      {folders.map((folder) => (
        <FolderGridItem
          key={folder.folderId}
          id={folder.folderId}
          name={folder.folderName}
          count={folder.materialCount}
          date={formatDate(folder.updatedAt)}
          onMoveToTrash={onMoveToTrash}
        />
      ))}
    </section>
  );
};

export default ArchiveFolderGrid;