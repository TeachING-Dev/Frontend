import type { Folder } from "../../../apis/folder";
import AddFolderList from "./AddFolderList";
import FolderListItem from "./FolderListItem";

type ArchiveFolderListProps = {
  folders: Folder[];
  onAddFolder: () => void;
  onMoveToTrash?: (folderId: number) => void;
  isSearching?: boolean;
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

const ArchiveFolderList = ({
  folders,
  onAddFolder,
  onMoveToTrash,
  isSearching = false,
}: ArchiveFolderListProps) => {
  return (
    <section className="w-full space-y-0 lg:space-y-0">
      {/* 새 폴더 추가 */}
      {!isSearching && (
        <AddFolderList onClick={onAddFolder} />
      )}

      {/* 기존 폴더 목록 */}
      {folders.map((folder) => (
        <FolderListItem
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

export default ArchiveFolderList;
