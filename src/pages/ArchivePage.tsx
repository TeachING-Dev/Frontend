import { useEffect, useState } from "react";

import ArchiveHeader from "../components/archive/ArchiveHeader";
import ArchiveFolderList from "../components/archive/ArchiveFolderList";
import ArchiveFolderGrid from "../components/archive/ArchiveFolderGrid";
import ArchivePagination from "../components/archive/ArchivePagination";
import CreateFolderModal from "../components/archive/modal/CreateFolderModal";
import Toast from "../components/common/Toast";

const ArchivePage = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleMoveToTrash = (folderId: number) => {
    console.log("휴지통으로 이동할 폴더 ID:", folderId);

    // TODO: 폴더 휴지통 이동 API 연결
    setToastMessage("폴더가 휴지통으로 이동되었습니다");
  };

  useEffect(() => {
    if (!toastMessage) return;

    const timer = window.setTimeout(() => {
      setToastMessage("");
    }, 4000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [toastMessage]);

  return (
    <>
      <main className="py-10">
        <div className="mx-auto w-[1120px]">
          <ArchiveHeader viewMode={viewMode} onViewModeChange={setViewMode} />

          <div className="min-h-[540px]">
            {viewMode === "list" ? (
              <ArchiveFolderList
                onAddFolder={() => setIsCreateModalOpen(true)}
                onMoveToTrash={handleMoveToTrash}
              />
            ) : (
              <ArchiveFolderGrid
                onAddFolder={() => setIsCreateModalOpen(true)}
                onMoveToTrash={handleMoveToTrash}
              />
            )}
          </div>

          <ArchivePagination />
        </div>
      </main>

      {isCreateModalOpen && (
        <CreateFolderModal onClose={() => setIsCreateModalOpen(false)} />
      )}

      {toastMessage && (
        <Toast
          message={toastMessage}
          actionText="실행취소"
          onAction={() => {
            // TODO: 휴지통 이동 실행 취소 API 연결
            setToastMessage("");
          }}
        />
      )}
    </>
  );
};

export default ArchivePage;
