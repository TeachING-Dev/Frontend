import { useState } from "react";

import ArchiveHeader from "../components/archive/ArchiveHeader";
import ArchiveFolderList from "../components/archive/ArchiveFolderList";
import ArchiveFolderGrid from "../components/archive/ArchiveFolderGrid";
import ArchivePagination from "../components/archive/ArchivePagination";

const ArchivePage = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  return (
    <main className="py-10">
      <div className="mx-auto w-[1120px]">
        <ArchiveHeader viewMode={viewMode} onViewModeChange={setViewMode} />

        {viewMode === "list" ? <ArchiveFolderList /> : <ArchiveFolderGrid />}

        <ArchivePagination />
      </div>
    </main>
  );
};

export default ArchivePage;
