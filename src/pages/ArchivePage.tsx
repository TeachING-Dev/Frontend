import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  type Folder,
  type FolderSort,
} from "../apis/folder";
import ArchiveHeader from "../components/archive/ArchiveHeader";
import ArchiveFolderGrid from "../components/archive/ArchiveFolderGrid";
import ArchiveFolderList from "../components/archive/ArchiveFolderList";
import ArchivePagination from "../components/archive/ArchivePagination";
import CreateFolderModal from "../components/archive/modal/CreateFolderModal";
import Toast from "../components/common/Toast";
import { mockFolders } from "../mocks/folder";

const ArchivePage = () => {
  const [viewMode, setViewMode] =
    useState<"list" | "grid">("grid");

  const [sort, setSort] =
    useState<FolderSort>("recent");

  const [folders, setFolders] =
    useState<Folder[]>(mockFolders);

  const [isCreateModalOpen, setIsCreateModalOpen] =
    useState(false);

  const [toastMessage, setToastMessage] =
    useState("");

  const sortedFolders = useMemo(() => {
    return [...folders].sort((a, b) => {
      if (sort === "recent") {
        return (
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
        );
      }

      if (sort === "oldest") {
        return (
          new Date(a.updatedAt).getTime() -
          new Date(b.updatedAt).getTime()
        );
      }

      return a.folderName.localeCompare(
        b.folderName,
        "ko",
      );
    });
  }, [folders, sort]);

  const handleCreateFolder = async (
    folderName: string,
  ) => {
    const trimmedFolderName =
      folderName.trim();

    if (
      trimmedFolderName.length < 1 ||
      trimmedFolderName.length > 10
    ) {
      setToastMessage(
        "폴더명은 1자 이상 10자 이하로 입력해주세요.",
      );
      return;
    }

    const isDuplicate = folders.some(
      (folder) =>
        folder.folderName.toLowerCase() ===
        trimmedFolderName.toLowerCase(),
    );

    if (isDuplicate) {
      setToastMessage(
        "이미 존재하는 폴더명입니다.",
      );
      return;
    }

    const newFolder: Folder = {
      folderId: Date.now(),
      folderName: trimmedFolderName,
      materialCount: 0,
      updatedAt: new Date().toISOString(),
    };

    setFolders((prev) => [
      newFolder,
      ...prev,
    ]);

    setIsCreateModalOpen(false);

    setToastMessage(
      "새로운 폴더가 생성되었습니다",
    );
  };

  const handleMoveToTrash = (
    folderId: number,
  ) => {
    setFolders((prev) =>
      prev.filter(
        (folder) =>
          folder.folderId !== folderId,
      ),
    );

    setToastMessage(
      "폴더가 휴지통으로 이동되었습니다",
    );
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
          <ArchiveHeader
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            sort={sort}
            onSortChange={setSort}
          />

          <div className="min-h-[540px]">
            {viewMode === "list" ? (
              <ArchiveFolderList
                folders={sortedFolders}
                onAddFolder={() =>
                  setIsCreateModalOpen(true)
                }
                onMoveToTrash={
                  handleMoveToTrash
                }
              />
            ) : (
              <ArchiveFolderGrid
                folders={sortedFolders}
                onAddFolder={() =>
                  setIsCreateModalOpen(true)
                }
                onMoveToTrash={
                  handleMoveToTrash
                }
              />
            )}
          </div>

          <ArchivePagination />
        </div>
      </main>

      {isCreateModalOpen && (
        <CreateFolderModal
          onClose={() =>
            setIsCreateModalOpen(false)
          }
          onCreate={handleCreateFolder}
        />
      )}

      {toastMessage && (
        <Toast
          message={toastMessage}
          actionText="실행취소"
          onAction={() => {
            setToastMessage("");
          }}
        />
      )}
    </>
  );
};

export default ArchivePage;