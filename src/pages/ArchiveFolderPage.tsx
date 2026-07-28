import {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getFolder,
  getFolderMaterials,
  updateFolderName,
  type Folder,
  type FolderMaterialSort,
} from "../apis/folder";
import ArchiveDataList, {
  type ArchiveData,
} from "../components/archive/ArchiveDataList";
import ArchiveFolderHeader from "../components/archive/ArchiveFolderHeader";
import EmptyArchiveData from "../components/archive/EmptyArchiveData";
import MoveDataModal from "../components/archive/modal/MoveDataModal";
import Toast from "../components/common/Toast";

type SelectMode =
  | "move"
  | "trash"
  | null;

/**
 * 자료 이동 API 연결 전 임시 데이터
 */
const folderOptions = [
  {
    id: 1,
    name: "Backend",
  },
  {
    id: 2,
    name: "Frontend",
  },
  {
    id: 3,
    name: "React",
  },
  {
    id: 4,
    name: "TypeScript",
  },
];

const ArchiveFolderPage = () => {
  const navigate = useNavigate();

  const { folderId } = useParams<{
    folderId: string;
  }>();

  const [folder, setFolder] =
    useState<Folder | null>(null);

  const [materials, setMaterials] =
    useState<ArchiveData[]>([]);

  /**
   * 검색창에 현재 입력 중인 값
   */
  const [searchInput, setSearchInput] =
    useState("");

  /**
   * 실제 API 요청에 사용하는 검색어
   */
  const [keyword, setKeyword] =
    useState("");

  /**
   * 실제 API 요청에 사용하는 정렬값
   */
  const [sort, setSort] =
    useState<FolderMaterialSort>(
      "recent",
    );

  const [isLoading, setIsLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [selectMode, setSelectMode] =
    useState<SelectMode>(null);

  const [
    isMoveModalOpen,
    setIsMoveModalOpen,
  ] = useState(false);

  const [
    selectedItemIds,
    setSelectedItemIds,
  ] = useState<number[]>([]);

  const [toastMessage, setToastMessage] =
    useState<string | null>(null);

  const isSelectMode =
    selectMode !== null;

  const isAllSelected =
    materials.length > 0 &&
    selectedItemIds.length ===
      materials.length;

  /**
   * URL의 folderId를 숫자로 변환한다.
   */
  const getParsedFolderId =
    useCallback(() => {
      if (!folderId) {
        throw new Error(
          "폴더 정보를 확인할 수 없어요.",
        );
      }

      const parsedFolderId =
        Number(folderId);

      if (
        !Number.isInteger(
          parsedFolderId,
        ) ||
        parsedFolderId <= 0
      ) {
        throw new Error(
          "올바르지 않은 폴더 ID예요.",
        );
      }

      return parsedFolderId;
    }, [folderId]);

  /**
   * 폴더 상세 정보 조회
   */
  const fetchFolder = useCallback(
    async () => {
      const parsedFolderId =
        getParsedFolderId();

      return getFolder(
        parsedFolderId,
      );
    },
    [getParsedFolderId],
  );

  /**
   * 폴더 내부 자료 목록 조회
   *
   * keyword와 sort가 바뀌면
   * 새로운 조건으로 다시 요청한다.
   */
  const fetchFolderMaterials =
    useCallback(async () => {
      const parsedFolderId =
        getParsedFolderId();

      return getFolderMaterials(
        parsedFolderId,
        {
          keyword:
            keyword || undefined,
          sort,
          page: 0,
          size: 10,
        },
      );
    }, [
      getParsedFolderId,
      keyword,
      sort,
    ]);

  /**
   * 폴더 상세 정보와 내부 자료 목록 조회
   */
  useEffect(() => {
    let isCancelled = false;

    const fetchFolderPageData =
      async () => {
        try {
          setIsLoading(true);
          setErrorMessage("");

          const [
            folderDetail,
            materialsResult,
          ] = await Promise.all([
            fetchFolder(),
            fetchFolderMaterials(),
          ]);

          if (isCancelled) {
            return;
          }

          setFolder(folderDetail);

          const convertedMaterials:
            ArchiveData[] =
            materialsResult.content.map(
              (material) => ({
                id:
                  material.materialId,
                tag:
                  material.tags[0] ??
                  "기타",
                date:
                  material.createdAt.split(
                    "T",
                  )[0],
                title:
                  material.title,
                description:
                  material.summary,
              }),
            );

          setMaterials(
            convertedMaterials,
          );

          setSelectedItemIds([]);
          setSelectMode(null);
        } catch (error) {
          if (isCancelled) {
            return;
          }

          console.error(
            "폴더 페이지 조회 실패:",
            error,
          );

          setFolder(null);
          setMaterials([]);

          setErrorMessage(
            error instanceof Error
              ? error.message
              : "폴더 정보를 불러오지 못했어요.",
          );
        } finally {
          // Avoid returning from finally (unsafe). Only update loading state if not cancelled.
          if (!isCancelled) {
            setIsLoading(false);
          }
        }
      };

    void fetchFolderPageData();

    return () => {
      isCancelled = true;
    };
  }, [
    fetchFolder,
    fetchFolderMaterials,
  ]);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timer =
      window.setTimeout(() => {
        setToastMessage(null);
      }, 4000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [toastMessage]);

  /**
   * 검색 버튼 또는 Enter 실행
   */
  const handleSearch = () => {
    setKeyword(
      searchInput.trim(),
    );
  };

  /**
   * 정렬 변경
   */
  const handleSortChange = (
    newSort: FolderMaterialSort,
  ) => {
    setSort(newSort);
  };

  const handleEditFolderName =
    async (
      newFolderName: string,
    ) => {
      if (!folder) {
        return;
      }

      const trimmedFolderName =
        newFolderName.trim();

      const folderNamePattern =
        /^[가-힣a-zA-Z]{1,10}$/;

      if (
        !folderNamePattern.test(
          trimmedFolderName,
        )
      ) {
        setToastMessage(
          "폴더명은 한글, 영문 10자 이내로 입력해주세요.",
        );

        return;
      }

      try {
        const updatedFolder =
          await updateFolderName(
            folder.folderId,
            trimmedFolderName,
          );

        setFolder((prev) =>
          prev
            ? {
                ...prev,
                folderName:
                  updatedFolder.folderName,
              }
            : prev,
        );
      } catch (error) {
        console.error(
          "폴더명 수정 실패:",
          error,
        );

        setToastMessage(
          "폴더 수정에 실패했어요.",
        );
      }
    };

  const handleOpenMoveMode = () => {
    setSelectMode("move");
    setSelectedItemIds([]);
  };

  const handleOpenTrashMode = () => {
    setSelectMode("trash");
    setSelectedItemIds([]);
  };

  const handleCancelSelectMode =
    () => {
      setSelectMode(null);
      setSelectedItemIds([]);
    };

  const handleToggleItem = (
    id: number,
  ) => {
    setSelectedItemIds((prev) =>
      prev.includes(id)
        ? prev.filter(
            (itemId) =>
              itemId !== id,
          )
        : [...prev, id],
    );
  };

  const handleToggleAll = () => {
    if (isAllSelected) {
      setSelectedItemIds([]);
      return;
    }

    setSelectedItemIds(
      materials.map(
        (item) => item.id,
      ),
    );
  };

  const handleOpenMoveModal =
    () => {
      if (
        selectedItemIds.length === 0
      ) {
        return;
      }

      setIsMoveModalOpen(true);
    };

  const handleCloseMoveModal =
    () => {
      setIsMoveModalOpen(false);
    };

  const handleMoveData = (
    targetFolderId: number,
  ) => {
    console.log(
      "이동할 자료 ID:",
      selectedItemIds,
    );

    console.log(
      "이동할 폴더 ID:",
      targetFolderId,
    );

    // TODO: 자료 이동 API 연결

    setIsMoveModalOpen(false);
    setSelectMode(null);
    setSelectedItemIds([]);

    setToastMessage(
      "자료가 해당 폴더로 이동되었습니다",
    );
  };

  const handleMoveToTrash =
    () => {
      if (
        selectedItemIds.length === 0
      ) {
        return;
      }

      console.log(
        "휴지통으로 이동할 자료 ID:",
        selectedItemIds,
      );

      // TODO: 휴지통 이동 API 연결

      setSelectMode(null);
      setSelectedItemIds([]);

      setToastMessage(
        "자료가 휴지통으로 이동되었습니다",
      );
    };

  const handleSelectAction =
    () => {
      if (selectMode === "move") {
        handleOpenMoveModal();
        return;
      }

      if (selectMode === "trash") {
        handleMoveToTrash();
      }
    };

  const handleOpenDataPage = (
    materialId: number,
  ) => {
    if (!folderId) {
      return;
    }

    navigate(
      `/archive/folder/${folderId}/materials/${materialId}`,
    );
  };

  const handleUndoToast = () => {
    // TODO: 실행 취소 API 연결
    console.log("이동 실행 취소");

    setToastMessage(null);
  };

  if (isLoading) {
    return (
      <main className="py-10">
        <div className="mx-auto flex min-h-[540px] w-[1120px] items-center justify-center text-[#D0D0D2]">
          폴더 정보를 불러오는
          중이에요.
        </div>
      </main>
    );
  }

  if (errorMessage || !folder) {
    return (
      <main className="py-10">
        <div className="mx-auto flex min-h-[540px] w-[1120px] items-center justify-center text-[#D0D0D2]">
          {errorMessage ||
            "폴더 정보를 찾을 수 없어요."}
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="py-10">
        <div className="mx-auto w-[1120px]">
          <ArchiveFolderHeader
            folderName={
              folder.folderName
            }
            savedItemCount={
              folder.materialCount
            }
            searchKeyword={
              searchInput
            }
            sortOption={sort}
            onSearchKeywordChange={
              setSearchInput
            }
            onSearch={
              handleSearch
            }
            onSortChange={
              handleSortChange
            }
            onBack={() =>
              navigate("/archive")
            }
            onEditFolderName={
              handleEditFolderName
            }
            onMoveFolder={
              handleOpenMoveMode
            }
            onMoveToTrash={
              handleOpenTrashMode
            }
          />

          {isSelectMode &&
            materials.length > 0 && (
              <div className="mb-5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={
                    handleToggleAll
                  }
                  className="flex items-center gap-[17px]"
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded border transition ${
                      isAllSelected
                        ? "border-[#917DEC] bg-[#917DEC]"
                        : "border-[#777482] bg-[#24232D]"
                    }`}
                  >
                    {isAllSelected && (
                      <span className="text-[18px] leading-none text-white">
                        ✓
                      </span>
                    )}
                  </span>

                  <span className="font-['42dot_Sans'] text-[20px] font-semibold leading-[150%] tracking-[-0.6px] text-[#917DEC]">
                    {
                      selectedItemIds.length
                    }
                    개 선택됨
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={
                      handleSelectAction
                    }
                    disabled={
                      selectedItemIds.length ===
                      0
                    }
                    className={`flex h-[40px] w-[147px] items-center justify-center rounded font-['42dot_Sans'] text-[18px] font-semibold leading-[150%] tracking-[-0.6px] text-[#FAFAFA] transition ${
                      selectedItemIds.length >
                      0
                        ? "bg-[#917DEC] hover:bg-[#8068E2]"
                        : "cursor-not-allowed bg-[#42444C]"
                    }`}
                  >
                    {selectMode ===
                    "trash"
                      ? "휴지통으로 이동"
                      : "이동하기"}
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleCancelSelectMode
                    }
                    className="flex h-[40px] w-[147px] items-center justify-center rounded bg-[#42444C] font-['42dot_Sans'] text-[18px] font-semibold leading-[150%] tracking-[-0.6px] text-[#FAFAFA] transition hover:bg-[#50505A]"
                  >
                    취소
                  </button>
                </div>
              </div>
            )}

          <div className="mt-4">
            {materials.length ===
            0 ? (
              <EmptyArchiveData />
            ) : (
              <ArchiveDataList
                data={materials}
                isMoveMode={
                  isSelectMode
                }
                selectedItemIds={
                  selectedItemIds
                }
                onToggleItem={
                  handleToggleItem
                }
                onItemClick={
                  handleOpenDataPage
                }
              />
            )}
          </div>
        </div>
      </main>

      {isMoveModalOpen && (
        <MoveDataModal
          currentFolderId={
            folder.folderId
          }
          currentFolderName={
            folder.folderName
          }
          folders={folderOptions}
          onClose={
            handleCloseMoveModal
          }
          onMove={handleMoveData}
        />
      )}

      {toastMessage && (
        <Toast
          message={toastMessage}
          actionText="실행취소"
          onAction={
            handleUndoToast
          }
        />
      )}
    </>
  );
};

export default ArchiveFolderPage;