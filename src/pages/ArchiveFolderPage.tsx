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
  getFolders,
  updateFolderName,
  type Folder,
  type FolderMaterialSort,
} from "../apis/folder";

import {
  moveMaterials,
  moveMaterialsToTrash,
  restoreMaterials,
} from "../apis/material";

import ArchiveDataList, {
  type ArchiveData,
} from "../components/archive/folder/ArchiveDataList";
import ArchiveFolderHeader from "../components/archive/folder/ArchiveFolderHeader";
import EmptyArchiveData from "../components/archive/folder/EmptyArchiveData";
import MoveDataModal from "../components/archive/modal/MoveDataModal";
import Toast from "../components/common/Toast";
import TeachingMapDeleteToolbar from "../components/teachingMap/main/TeachingMapDeleteToolbar";

type SelectMode =
  | "move"
  | "trash"
  | null;

type FolderOption = {
  id: number;
  name: string;
};

type LastAction =
  | {
      type: "move";
      materialIds: number[];
      fromFolderId: number;
      toFolderId: number;
    }
  | {
      type: "trash";
      materialIds: number[];
      fromFolderId: number;
    };

const ArchiveFolderPage = () => {
  const navigate = useNavigate();

  const { folderId } = useParams<{
    folderId: string;
  }>();

  const [folder, setFolder] =
    useState<Folder | null>(null);

  const [materials, setMaterials] =
    useState<ArchiveData[]>([]);

  const [
    totalMaterialCount,
    setTotalMaterialCount,
  ] = useState(0);

  const [
    folderOptions,
    setFolderOptions,
  ] = useState<FolderOption[]>([]);

  const [searchInput, setSearchInput] =
    useState("");

  const [keyword, setKeyword] =
    useState("");

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

  const [lastAction, setLastAction] =
    useState<LastAction | null>(null);

  const isSelectMode =
    selectMode !== null;

  const isAllSelected =
    materials.length > 0 &&
    selectedItemIds.length ===
      materials.length;

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

  const refetchFolderPageData =
    useCallback(async () => {
      const [
        folderDetail,
        materialsResult,
      ] = await Promise.all([
        fetchFolder(),
        fetchFolderMaterials(),
      ]);

      const convertedMaterials:
        ArchiveData[] =
        materialsResult.content.map(
          (material) => ({
            id: material.materialId,
            tag:
              material.tags[0]
                ?.tagName ??
              "기타",
            date:
              material.createdAt.split(
                "T",
              )[0],
            title: material.title,
            description:
              material.summary,
            platformType:
              material.platformType,
            originalUrl:
              material.originalUrl,
          }),
        );

      setFolder(folderDetail);

      setMaterials(
        convertedMaterials,
      );

      if (!keyword) {
        setTotalMaterialCount(
          materialsResult.totalElements,
        );
      }
    }, [
      fetchFolder,
      fetchFolderMaterials,
      keyword,
    ]);

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
                  material.tags[0]
                    ?.tagName ??
                  "기타",
                date:
                  material.createdAt.split(
                    "T",
                  )[0],
                title:
                  material.title,
                description:
                  material.summary,
                platformType:
                  material.platformType,
                originalUrl:
                  material.originalUrl,
              }),
            );

          setMaterials(
            convertedMaterials,
          );

          if (!keyword) {
            setTotalMaterialCount(
              materialsResult.totalElements,
            );
          }

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
    keyword,
  ]);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timer =
      window.setTimeout(() => {
        setToastMessage(null);
        setLastAction(null);
      }, 4000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [toastMessage]);

  /**
   * 검색
   */
  const handleSearch = () => {
    setKeyword(
      searchInput.trim(),
    );
  };

  /**
   * 정렬
   */
  const handleSortChange = (
    newSort: FolderMaterialSort,
  ) => {
    setSort(newSort);
  };

  /**
   * 폴더명 수정
   */
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
        setLastAction(null);

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

        setLastAction(null);

        setToastMessage(
          "폴더 수정에 실패했어요.",
        );
      }
    };

  /**
   * 자료 이동 모드
   */
  const handleOpenMoveMode = () => {
    setSelectMode("move");
    setSelectedItemIds([]);
  };

  /**
   * 휴지통 이동 모드
   */
  const handleOpenTrashMode = () => {
    setSelectMode("trash");
    setSelectedItemIds([]);
  };

  /**
   * 선택 모드 취소
   */
  const handleCancelSelectMode =
    () => {
      setSelectMode(null);
      setSelectedItemIds([]);
    };

  /**
   * 개별 자료 선택
   */
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

  /**
   * 전체 선택
   */
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

  /**
   * 자료 이동 모달 열기
   */
  const handleOpenMoveModal =
    async () => {
      if (
        selectedItemIds.length === 0
      ) {
        return;
      }

      try {
        const parsedFolderId =
          getParsedFolderId();

        const folders =
          await getFolders("recent");

        const options = folders
          .filter(
            (item) =>
              item.folderId !==
              parsedFolderId,
          )
          .map((item) => ({
            id: item.folderId,
            name: item.folderName,
          }));

        if (options.length === 0) {
          setLastAction(null);

          setToastMessage(
            "이동할 수 있는 다른 폴더가 없어요.",
          );

          return;
        }

        setFolderOptions(options);
        setIsMoveModalOpen(true);
      } catch (error) {
        console.error(
          "폴더 목록 조회 실패:",
          error,
        );

        setLastAction(null);

        setToastMessage(
          "폴더 목록을 불러오지 못했어요.",
        );
      }
    };

  /**
   * 이동 모달 닫기
   */
  const handleCloseMoveModal =
    () => {
      setIsMoveModalOpen(false);
    };

  /**
   * 다른 폴더로 자료 이동
   */
  const handleMoveData = async (
    targetFolderId: number,
  ) => {
    if (
      selectedItemIds.length === 0
    ) {
      return;
    }

    try {
      const parsedFolderId =
        getParsedFolderId();

      if (
        parsedFolderId ===
        targetFolderId
      ) {
        setLastAction(null);

        setToastMessage(
          "현재 폴더로는 이동할 수 없어요.",
        );

        return;
      }

      const movedMaterialIds = [
        ...selectedItemIds,
      ];

      await moveMaterials(
        parsedFolderId,
        {
          materialIds:
            movedMaterialIds,
          targetFolderId,
        },
      );

      setLastAction({
        type: "move",
        materialIds:
          movedMaterialIds,
        fromFolderId:
          parsedFolderId,
        toFolderId:
          targetFolderId,
      });

      setMaterials((prev) =>
        prev.filter(
          (material) =>
            !movedMaterialIds.includes(
              material.id,
            ),
        ),
      );

      setTotalMaterialCount(
        (prev) =>
          Math.max(
            0,
            prev -
              movedMaterialIds.length,
          ),
      );

      setIsMoveModalOpen(false);
      setSelectMode(null);
      setSelectedItemIds([]);

      setToastMessage(
        "자료가 해당 폴더로 이동되었습니다",
      );
    } catch (error) {
      console.error(
        "자료 이동 실패:",
        error,
      );

      setLastAction(null);

      setToastMessage(
        "자료 이동에 실패했어요.",
      );
    }
  };

  /**
   * 자료 휴지통 이동
   */
  const handleMoveToTrash =
    async () => {
      if (
        selectedItemIds.length === 0
      ) {
        return;
      }

      try {
        const parsedFolderId =
          getParsedFolderId();

        const trashedMaterialIds = [
          ...selectedItemIds,
        ];

        await moveMaterialsToTrash(
          parsedFolderId,
          {
            materialIds:
              trashedMaterialIds,
          },
        );

        setLastAction({
          type: "trash",
          materialIds:
            trashedMaterialIds,
          fromFolderId:
            parsedFolderId,
        });

        setMaterials((prev) =>
          prev.filter(
            (material) =>
              !trashedMaterialIds.includes(
                material.id,
              ),
          ),
        );

        setTotalMaterialCount(
          (prev) =>
            Math.max(
              0,
              prev -
                trashedMaterialIds.length,
            ),
        );

        setSelectMode(null);
        setSelectedItemIds([]);

        setToastMessage(
          "자료가 휴지통으로 이동되었습니다",
        );
      } catch (error) {
        console.error(
          "자료 휴지통 이동 실패:",
          error,
        );

        setLastAction(null);

        setToastMessage(
          "자료를 휴지통으로 이동하지 못했어요.",
        );
      }
    };

  /**
   * 선택 모드 실행
   */
  const handleSelectAction =
    () => {
      if (selectMode === "move") {
        void handleOpenMoveModal();
        return;
      }

      if (selectMode === "trash") {
        void handleMoveToTrash();
      }
    };

  /**
   * AI 분석 결과 페이지로 이동
   */
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

  /**
   * 원문 페이지를 새 탭으로 열기
   */
  const handleOpenOriginal = (
    originalUrl: string,
  ) => {
    if (!originalUrl) {
      setLastAction(null);

      setToastMessage(
        "원문 주소를 확인할 수 없어요.",
      );

      return;
    }

    const normalizedUrl =
      /^https?:\/\//i.test(
        originalUrl,
      )
        ? originalUrl
        : `https://${originalUrl}`;

    window.open(
      normalizedUrl,
      "_blank",
      "noopener,noreferrer",
    );
  };

  /**
   * 마지막 작업 실행취소
   */
  const handleUndoToast =
    async () => {
      if (!lastAction) {
        return;
      }

      const actionToUndo =
        lastAction;

      let restoredCount =
        actionToUndo.materialIds.length;

      try {
        if (
          actionToUndo.type ===
          "move"
        ) {
          await moveMaterials(
            actionToUndo.toFolderId,
            {
              materialIds:
                actionToUndo.materialIds,
              targetFolderId:
                actionToUndo.fromFolderId,
            },
          );
        }

        if (
          actionToUndo.type ===
          "trash"
        ) {
          const restoreResult =
            await restoreMaterials(
              actionToUndo.fromFolderId,
              {
                materialIds:
                  actionToUndo.materialIds,
              },
            );

          restoredCount =
            restoreResult.restoredIds.length;

          if (
            restoreResult.failedIds.length >
            0
          ) {
            console.warn(
              "복구 실패 자료:",
              restoreResult.failedIds,
            );
          }
        }

        await refetchFolderPageData();

        if (keyword) {
          setTotalMaterialCount(
            (prev) =>
              prev +
              restoredCount,
          );
        }

        setLastAction(null);

        setToastMessage(
          actionToUndo.type ===
            "trash"
            ? "휴지통 이동이 취소되었습니다"
            : "자료 이동이 취소되었습니다",
        );
      } catch (error) {
        console.error(
          "실행 취소 실패:",
          error,
        );

        setToastMessage(
          "실행 취소에 실패했어요.",
        );
      }
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
      <main className="px-[20px] py-[10px] pb-[140px] lg:px-0 lg:py-10 lg:pb-10">
        <div className="mx-auto w-full lg:w-[1120px]">
          <ArchiveFolderHeader
            folderName={
              folder.folderName
            }
            savedItemCount={
              totalMaterialCount
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
              <div className="mb-5">
                <TeachingMapDeleteToolbar
                  selectedCount={
                    selectedItemIds.length
                  }
                  isAllSelected={
                    isAllSelected
                  }
                  actionLabel={
                    selectMode === "trash"
                      ? "휴지통으로 이동"
                      : "이동하기"
                  }
                  onToggleSelectAll={
                    handleToggleAll
                  }
                  onDeleteClick={
                    handleSelectAction
                  }
                  onCancelClick={
                    handleCancelSelectMode
                  }
                />
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
                onAiAnalysis={
                  handleOpenDataPage
                }
                onOpenOriginal={
                  handleOpenOriginal
                }
              />
            )}
          </div>
        </div>
      </main>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-[94px] bg-[linear-gradient(0deg,#0B0A18_0%,rgba(11,10,24,0)_100%)] lg:hidden"
      />

      {isMoveModalOpen && (
        <MoveDataModal
          currentFolderId={
            folder.folderId
          }
          currentFolderName={
            folder.folderName
          }
          folders={
            folderOptions
          }
          onClose={
            handleCloseMoveModal
          }
          onMove={
            handleMoveData
          }
        />
      )}

      {toastMessage && (
        <Toast
          message={
            toastMessage
          }
          actionText={
            lastAction
              ? "실행취소"
              : undefined
          }
          onAction={
            lastAction
              ? () => {
                  void handleUndoToast();
                }
              : undefined
          }
        />
      )}
    </>
  );
};

export default ArchiveFolderPage;
