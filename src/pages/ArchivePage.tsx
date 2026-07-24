import { useEffect, useState } from "react";

import {
  getFolders,
  type Folder,
  type FolderSort,
} from "../apis/folder";
import ArchiveHeader from "../components/archive/ArchiveHeader";
import ArchiveFolderGrid from "../components/archive/ArchiveFolderGrid";
import ArchiveFolderList from "../components/archive/ArchiveFolderList";
import ArchivePagination from "../components/archive/ArchivePagination";
import CreateFolderModal from "../components/archive/modal/CreateFolderModal";
import Toast from "../components/common/Toast";

const ArchivePage = () => {
  const [viewMode, setViewMode] =
    useState<"list" | "grid">("grid");

  const [sort, setSort] =
    useState<FolderSort>("recent");

  const [folders, setFolders] =
    useState<Folder[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [isCreateModalOpen, setIsCreateModalOpen] =
    useState(false);

  const [toastMessage, setToastMessage] =
    useState("");

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const folderList = await getFolders(sort);

        setFolders(folderList);
      } catch (error) {
        console.error(
          "폴더 목록 조회 실패:",
          error,
        );

        setErrorMessage(
          "폴더 목록을 불러오지 못했어요.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchFolders();
  }, [sort]);

  const handleMoveToTrash = (
    folderId: number,
  ) => {
    console.log(
      "휴지통으로 이동할 폴더 ID:",
      folderId,
    );

    // TODO: 폴더 휴지통 이동 API 연결
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
            {isLoading ? (
              <div className="flex min-h-[540px] items-center justify-center text-[#D0D0D2]">
                폴더 목록을 불러오는 중이에요.
              </div>
            ) : errorMessage ? (
              <div className="flex min-h-[540px] items-center justify-center text-[#D0D0D2]">
                {errorMessage}
              </div>
            ) : viewMode === "list" ? (
              <ArchiveFolderList
                folders={folders}
                onAddFolder={() =>
                  setIsCreateModalOpen(true)
                }
                onMoveToTrash={
                  handleMoveToTrash
                }
              />
            ) : (
              <ArchiveFolderGrid
                folders={folders}
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
        />
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