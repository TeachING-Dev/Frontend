import AddFolderGrid from "./AddFolderGrid";
import FolderGridItem from "./FolderGridItem";

type ArchiveFolderGridProps = {
  onAddFolder: () => void;
};

const dummyFolders = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  name: "폴더명",
  count: 0,
  date: "2026-01-01",
}));

const ArchiveFolderGrid = ({
  onAddFolder,
}: ArchiveFolderGridProps) => {
  return (
    <section className="grid grid-cols-3 gap-7">
      {/* 새 폴더 추가 */}
      <AddFolderGrid onClick={onAddFolder} />

      {/* 기존 폴더 목록 */}
      {dummyFolders.map((folder) => (
        <FolderGridItem
          key={folder.id}
          id={folder.id}
          name={folder.name}
          count={folder.count}
          date={folder.date}
        />
      ))}
    </section>
  );
};

export default ArchiveFolderGrid;