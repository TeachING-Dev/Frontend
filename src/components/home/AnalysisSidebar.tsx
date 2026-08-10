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
    <aside className="w-[280px] shrink-0">
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