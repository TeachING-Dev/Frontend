import AddFolderGrid from "./AddFolderGrid";
import FolderGridItem from "./FolderGridItem";

const dummyFolders = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  name: "폴더명",
  count: 0,
  date: "2026-01-01",
}));

const ArchiveFolderGrid = () => {
  return (
    <section className="grid grid-cols-3 gap-7">
      <AddFolderGrid />

      {dummyFolders.map((folder) => (
        <FolderGridItem
          key={folder.id}
          name={folder.name}
          count={folder.count}
          date={folder.date}
        />
      ))}
    </section>
  );
};

export default ArchiveFolderGrid;