import FolderSelect, {
  type FolderOption,
} from "./FolderSelect";

type AnalysisSidebarProps = {
  folders: FolderOption[];
  selectedFolderId: number;
  onFolderChange: (
    folderId: number,
  ) => void;

  recommendedFolderId?:
    | number
    | null;

  recommendedFolderName?:
    | string
    | null;

  onCreateFolder?: () => void;
};

const AnalysisSidebar = ({
  folders,
  selectedFolderId,
  onFolderChange,
  recommendedFolderId,
  recommendedFolderName,
  onCreateFolder,
}: AnalysisSidebarProps) => {
  return (
    <aside className="fixed left-[55px] top-[122px] z-30 w-[280px]">
      <FolderSelect
        folders={folders}
        selectedFolderId={
          selectedFolderId
        }
        onSelect={
          onFolderChange
        }
        recommendedFolderId={
          recommendedFolderId
        }
        recommendedFolderName={
          recommendedFolderName
        }
        onCreateFolder={
          onCreateFolder
        }
      />
    </aside>
  );
};

export default AnalysisSidebar;