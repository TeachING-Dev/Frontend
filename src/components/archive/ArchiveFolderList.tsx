import AddFolderList from "./AddFolderList";
import FolderListItem from "./FolderListItem";

const dummyFolders = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  name: "기존 폴더(10자)",
  count: 0,
  date: "2026.01.01",
}));

const ArchiveFolderList = () => {
  return (
    <section className="w-full">
      {/* 새 폴더 추가 */}
      <AddFolderList />

      {/* 기존 폴더 목록 */}
      {dummyFolders.map((folder) => (
        <FolderListItem
          key={folder.id}
          name={folder.name}
          count={folder.count}
          date={folder.date}
        />
      ))}
    </section>
  );
};

export default ArchiveFolderList;