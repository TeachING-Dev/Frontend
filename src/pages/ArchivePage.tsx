import { useState } from "react";

import ArchiveHeader from "../components/archive/ArchiveHeader";
import ArchiveFolderList from "../components/archive/ArchiveFolderList";
import ArchiveFolderGrid from "../components/archive/ArchiveFolderGrid";
import ArchivePagination from "../components/archive/ArchivePagination";
import CreateFolderModal from "../components/archive/CreateFolderModal";

const ArchivePage = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <main className="py-10">
        <div className="mx-auto w-[1120px]">
          <ArchiveHeader
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          <div className="min-h-[540px]">
            {viewMode === "list" ? (
              <ArchiveFolderList
                onAddFolder={() => setIsCreateModalOpen(true)}
              />
            ) : (
              <ArchiveFolderGrid
                onAddFolder={() => setIsCreateModalOpen(true)}
              />
            )}
          </div>

          <ArchivePagination />
        </div>
      </main>

      {isCreateModalOpen && (
        <CreateFolderModal
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </>
  );
};

export default ArchivePage;