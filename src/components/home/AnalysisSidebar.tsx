import FolderSelect, {
  type FolderOption,
} from "./FolderSelect";

type AnalysisSidebarProps = {
  className?: string;
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
  className = "",
  folders,
  selectedFolderId,
  onFolderChange,
  recommendedFolderId,
  recommendedFolderName,
  onCreateFolder,
}: AnalysisSidebarProps) => {
  return (
    <aside className={`w-full shrink-0 lg:w-[280px] ${className}`}>
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
