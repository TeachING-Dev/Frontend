import axios from "axios";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  createFolder,
  getFolders,
  moveFolderToTrash,
  restoreFolder,
  type Folder,
  type FolderSort,
} from "../apis/folder";
import ArchiveFolderGrid from "../components/archive/main/ArchiveFolderGrid";
import ArchiveFolderList from "../components/archive/main/ArchiveFolderList";
import ArchiveHeader from "../components/archive/main/ArchiveHeader";
import EmptyArchiveSearch from "../components/archive/main/EmptyFolderSearch";
import CreateErrorModal from "../components/archive/modal/CreateErrorModal";
import CreateFolderModal from "../components/archive/modal/CreateFolderModal";
import Toast from "../components/common/Toast";
import PageContainer from "../components/common/PageContainer";
import Pagination from "../components/common/Pagination";

type FolderErrorResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: null;
};

const ArchivePage = () => {
  const [currentPage, setCurrentPage] =
    useState(1);

  const FOLDERS_PER_PAGE = 9;

  const [viewMode, setViewMode] =
    useState<"list" | "grid">("grid");

  const [sort, setSort] =
    useState<FolderSort>("recent");

  const [folders, setFolders] =
    useState<Folder[]>([]);

  const [searchInput, setSearchInput] =
    useState("");

  const [keyword, setKeyword] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [
    isCreateModalOpen,
    setIsCreateModalOpen,
  ] = useState(false);

  const [
    isCreateErrorModalOpen,
    setIsCreateErrorModalOpen,
  ] = useState(false);

  const [toastMessage, setToastMessage] =
    useState("");

  const [
    trashedFolderId,
    setTrashedFolderId,
  ] = useState<number | null>(null);

  const fetchFolders = useCallback(
    async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const folderList =
          await getFolders(sort);

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
    },
    [sort],
  );

  useEffect(() => {
    const initializeFolders = async () => {
      await fetchFolders();
    };

    void initializeFolders();
  }, [fetchFolders]);

  const handleSearchKeywordChange = (
    value: string,
  ) => {
    setSearchInput(value);

    if (!value.trim()) {
      setKeyword("");
    }
  };

  const handleSearch = () => {
    setKeyword(searchInput.trim());
  };

  const filteredFolders = folders.filter(
    (folder) =>
      folder.folderName
        .toLowerCase()
        .includes(keyword.toLowerCase()),
  );

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredFolders.length /
        FOLDERS_PER_PAGE,
    ),
  );

  const activePage = Math.min(
    currentPage,
    totalPages,
  );

  const visibleFolders =
    filteredFolders.slice(
      (activePage - 1) *
        FOLDERS_PER_PAGE,
      activePage *
        FOLDERS_PER_PAGE,
    );

  const handleCreateFolder = async (
    folderName: string,
  ) => {
    try {
      await createFolder(folderName);

      await fetchFolders();

      setToastMessage(
        "새로운 폴더가 생성되었습니다",
      );
    } catch (error) {
      console.error(
        "폴더 생성 실패:",
        error,
      );

      if (
        axios.isAxiosError<FolderErrorResponse>(
          error,
        )
      ) {
        const code =
          error.response?.data?.code;

        const serverMessage =
          error.response?.data?.message;

        if (code === "FOLDER4004") {
          setIsCreateModalOpen(false);
          setIsCreateErrorModalOpen(true);
          return;
        }

        throw new Error(
          typeof serverMessage === "string"
            ? serverMessage
            : "폴더를 생성하지 못했습니다.",
          { cause: error },
        );
      }

      throw new Error(
        "폴더를 생성하지 못했습니다.",
        { cause: error },
      );
    }
  };

  const handleMoveToTrash = async (
    folderId: number,
  ) => {
    try {
      const result =
        await moveFolderToTrash(folderId);

      if (!result.isDeleted) {
        setToastMessage(
          "폴더를 휴지통으로 이동하지 못했습니다.",
        );
        return;
      }

      setFolders((prev) =>
        prev.filter(
          (folder) =>
            folder.folderId !== folderId,
        ),
      );

      // 실행취소를 위해 마지막으로 삭제한 폴더 ID 저장
      setTrashedFolderId(folderId);

      setToastMessage(
        "폴더가 휴지통으로 이동되었습니다",
      );
    } catch (error) {
      console.error(
        "폴더 휴지통 이동 실패:",
        error,
      );

      setToastMessage(
        "폴더를 휴지통으로 이동하지 못했습니다.",
      );
    }
  };

  const handleUndoTrash = async () => {
    if (trashedFolderId === null) return;

    try {
      await restoreFolder(
        trashedFolderId,
      );

      // 복구 성공 후 서버에서 목록 다시 조회
      await fetchFolders();

      setTrashedFolderId(null);

      setToastMessage(
        "폴더가 복구되었습니다.",
      );
    } catch (error) {
      console.error(
        "폴더 복구 실패:",
        error,
      );

      setToastMessage(
        "폴더를 복구하지 못했습니다.",
      );
    }
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
      <main>
        <PageContainer>
          <ArchiveHeader
            viewMode={viewMode}
            onViewModeChange={
              setViewMode
            }
            sort={sort}
            onSortChange={setSort}
            searchKeyword={
              searchInput
            }
            onSearchKeywordChange={
              handleSearchKeywordChange
            }
            onSearch={handleSearch}
            onAddFolder={() =>
              setIsCreateModalOpen(
                true,
              )
            }
          />

          <div className="mt-[30px] lg:mt-0 lg:min-h-[540px]">
            {isLoading ? (
              <div className="flex min-h-[300px] items-center justify-center text-[#D0D0D2] lg:min-h-[540px]">
                폴더 목록을 불러오는
                중이에요.
              </div>
            ) : errorMessage ? (
              <div className="flex min-h-[300px] items-center justify-center text-[#D0D0D2] lg:min-h-[540px]">
                {errorMessage}
              </div>
            ) : keyword &&
              filteredFolders.length ===
                0 ? (
              <EmptyArchiveSearch />
            ) : viewMode === "list" ? (
              <ArchiveFolderList
                folders={visibleFolders}
                onAddFolder={() =>
                  setIsCreateModalOpen(
                    true,
                  )
                }
                onMoveToTrash={
                  handleMoveToTrash
                }
                isSearching={
                  keyword.length > 0
                }
              />
            ) : (
              <ArchiveFolderGrid
                folders={visibleFolders}
                onAddFolder={() =>
                  setIsCreateModalOpen(
                    true,
                  )
                }
                onMoveToTrash={
                  handleMoveToTrash
                }
                isSearching={
                  keyword.length > 0
                }
              />
            )}
          </div>

          {filteredFolders.length >
            0 && (
            <div className="fixed inset-x-0 bottom-[122px] z-20 [&>nav]:mt-0 lg:static lg:mt-0 lg:[&>nav]:mt-10">
              <Pagination
                currentPage={activePage}
                totalPages={totalPages}
                onPageChange={
                  setCurrentPage
                }
              />
            </div>
          )}
        </PageContainer>
      </main>

      {isCreateModalOpen && (
        <CreateFolderModal
          onClose={() =>
            setIsCreateModalOpen(false)
          }
          onCreate={
            handleCreateFolder
          }
        />
      )}

      {isCreateErrorModalOpen && (
        <CreateErrorModal
          onClose={() =>
            setIsCreateErrorModalOpen(
              false,
            )
          }
        />
      )}

      {toastMessage && (
        <Toast
          message={toastMessage}
          actionText={
            trashedFolderId !== null
              ? "실행취소"
              : undefined
          }
          onAction={
            trashedFolderId !== null
              ? handleUndoTrash
              : undefined
          }
        />
      )}
    </>
  );
};

export default ArchivePage;
