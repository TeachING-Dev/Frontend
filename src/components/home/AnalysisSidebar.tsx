import FolderSelect, {
  type FolderOption,
} from "./FolderSelect";

type AnalysisSidebarProps = {
  folders: FolderOption[];
  selectedFolderId: number;
  onFolderChange: (folderId: number) => void;
};

const AnalysisSidebar = ({
  folders,
  selectedFolderId,
  onFolderChange,
}: AnalysisSidebarProps) => {
  return (
    <aside className="fixed left-[55px] top-[122px] z-30 w-[280px]">
      <FolderSelect
        folders={folders}
        selectedFolderId={selectedFolderId}
        onSelect={onFolderChange}
      />
    </aside>
  );
};

export default AnalysisSidebar;