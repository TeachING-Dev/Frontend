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
} from "../components/archive/ArchiveDataList";
import ArchiveFolderHeader from "../components/archive/ArchiveFolderHeader";
import EmptyArchiveData from "../components/archive/EmptyArchiveData";
import MoveDataModal from "../components/archive/modal/MoveDataModal";
import Toast from "../components/common/Toast";

type SelectMode =
  | "move"
  | "trash"
  | null;

type FolderOption = {
  id: number;
  name: string;
};

/**
 * 마지막으로 수행한 자료 작업
 *
 * move:
 * 다른 폴더로 이동
 *
 * trash:
 * 휴지통으로 이동
 */
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

  /**
   * 현재 폴더의 전체 저장 자료 수
   */
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

  /**
   * 실행취소를 위한 마지막 작업
   */
  const [lastAction, setLastAction] =
    useState<LastAction | null>(null);

  const isSelectMode =
    selectMode !== null;

  const isAllSelected =
    materials.length > 0 &&
    selectedItemIds.length ===
      materials.length;

  /**
   * URL folderId 숫자 변환
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
   * 폴더 상세 조회
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
   * 폴더 자료 목록 조회
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
   * 화면 데이터 재조회
   *
   * 실행취소 후 서버 데이터와
   * 화면을 다시 맞출 때 사용
   */
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
              material.tags[0] ??
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
          }),
        );

      setFolder(folderDetail);

      setMaterials(
        convertedMaterials,
      );

      /**
       * 검색 중이 아닐 때만
       * 폴더 전체 자료 수 갱신
       */
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

  /**
   * 최초 폴더 데이터 조회
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
                platformType:
                  material.platformType,
              }),
            );

          setMaterials(
            convertedMaterials,
          );

          /**
           * 검색 중이 아닐 때만
           * 폴더 전체 자료 수 저장
           */
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

  /**
   * 토스트 4초 후 닫기
   *
   * 실행취소 가능 시간도
   * 토스트 표시 시간과 동일하게 4초
   */
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

      /**
       * 실행취소를 위해
       * 원래 폴더와 이동한 폴더 저장
       */
      setLastAction({
        type: "move",
        materialIds:
          movedMaterialIds,
        fromFolderId:
          parsedFolderId,
        toFolderId:
          targetFolderId,
      });

      /**
       * 화면에서 이동한 자료 제거
       */
      setMaterials((prev) =>
        prev.filter(
          (material) =>
            !movedMaterialIds.includes(
              material.id,
            ),
        ),
      );

      /**
       * 폴더 전체 자료 개수 감소
       */
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

        /**
         * 실행취소를 위해
         * 휴지통으로 이동한 자료와
         * 원래 폴더 저장
         */
        setLastAction({
          type: "trash",
          materialIds:
            trashedMaterialIds,
          fromFolderId:
            parsedFolderId,
        });

        /**
         * 화면에서 휴지통 이동 자료 제거
         */
        setMaterials((prev) =>
          prev.filter(
            (material) =>
              !trashedMaterialIds.includes(
                material.id,
              ),
          ),
        );

        /**
         * 현재 폴더 전체 자료 개수 감소
         */
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
   * 자료 상세 페이지
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
   * 마지막 작업 실행취소
   */
  const handleUndoToast =
    async () => {
      if (!lastAction) {
        return;
      }

      /**
       * 비동기 요청 중 state가 변경될 수 있으므로
       * 현재 작업을 복사해둔다.
       */
      const actionToUndo =
        lastAction;

      let restoredCount =
        actionToUndo.materialIds.length;

      try {
        /**
         * 일반 폴더 이동 실행취소
         *
         * 이동 대상 폴더 -> 원래 폴더
         */
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

        /**
         * 휴지통 이동 실행취소
         *
         * restore API를 호출해서
         * 기존 폴더로 복구
         */
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

          /**
           * 일부 자료 복구 실패
           */
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

        /**
         * 서버에서 다시 조회해서
         * 화면 상태 동기화
         */
        await refetchFolderPageData();

        /**
         * 검색 중이면 전체 자료 개수는
         * 재조회 결과로 변경되지 않으므로
         * 복구된 수만큼 다시 증가
         */
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

        /**
         * 실패 시 lastAction을 유지해서
         * 토스트가 떠있는 동안 재시도 가능
         */
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
      <main className="py-10">
        <div className="mx-auto w-[1120px]">
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