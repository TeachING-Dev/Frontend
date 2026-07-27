import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Pagination from "../common/Pagination";

import TrashCategoryTabs from "./TrashCategoryTabs";
import TrashDataList from "./TrashDataList";
import TrashEmpty from "./TrashEmpty";
import TrashFolderList from "./TrashFolderList";
import TrashHeader from "./TrashHeader";
import TrashRestoreToolbar from "./TrashRestoreToolbar";
import TrashSortDropdown from "./TrashSortDropdown";
import TrashTeachingMapList from "./TrashTeachingMapList";

import type {
  TrashCategory,
  TrashDataItem,
  TrashFolderItem,
  TrashSortType,
  TrashTeachingMapItem,
} from "./trashTypes";

const FOLDERS_PER_PAGE = 10;
const DATA_PER_PAGE = 10;
const TEACHING_MAPS_PER_PAGE = 10;
const RECENT_DELETED_AT = new Date(
  Date.now() - 10 * 60 * 60 * 1000,
).toISOString();

const initialFolders: TrashFolderItem[] = [
  {
    id: 1,
    name: "폴더명",
    itemCount: 0,
    deletedAt: RECENT_DELETED_AT,
  },
  {
    id: 2,
    name: "프론트엔드",
    itemCount: 4,
    deletedAt: "2026-02-12",
  },
  {
    id: 3,
    name: "Node.js",
    itemCount: 6,
    deletedAt: "2026-03-04",
  },
  {
    id: 4,
    name: "백엔드",
    itemCount: 3,
    deletedAt: "2026-04-18",
  },
  {
    id: 5,
    name: "알고리즘",
    itemCount: 8,
    deletedAt: "2026-05-22",
  },
  {
    id: 6,
    name: "데이터베이스",
    itemCount: 5,
    deletedAt: "2026-06-11",
  },
];

const initialDataList: TrashDataItem[] = [
  {
    id: 1,
    tag: "Node.js",
    deletedAt: RECENT_DELETED_AT,
    title:
      "Node.js의 이벤트 루프(Event Loop) 완벽 이해하기",
    description:
      "Node.js의 핵심 아키텍처인 이벤트 루프의 6가지 단계와 동작 메커니즘을 시각적 자료와 함께 상세히 정리한 기술 자료입니다. 싱글 스레드 기반인 Node.js가 어떻게 대규모 비동기 요청을 효율적으로 처리하는지 내부 원리를 분석합니다.",
    thumbnail: "/youtube-app-icon.png",
  },
  {
    id: 2,
    tag: "React",
    deletedAt: "2026-04-20",
    title: "React 렌더링 최적화",
    description:
      "React 컴포넌트의 불필요한 렌더링을 줄이고 사용자 경험을 개선하기 위한 최적화 방법을 정리한 자료입니다.",
    thumbnail: "/youtube-app-icon.png",
  },
];

const initialTeachingMaps: TrashTeachingMapItem[] = [
  {
    id: 1,
    title: "로드맵 제목",
    description:
      "로드맵에 대한 상세설명들 몇자까지 처음에 보이나요? 로드맵에 대한 상세설명들 몇자까지 처음에 보이나요?",
    currentStep: 4,
    totalStep: 8,
    type: "deepDive",
    thumbnails: [
      "/youtube-app-icon.png",
      "/youtube-app-icon.png",
      "/youtube-app-icon.png",
      "/youtube-app-icon.png",
      "/youtube-app-icon.png",
      "/youtube-app-icon.png",
    ],
    deletedAt: RECENT_DELETED_AT,
  },
  {
    id: 2,
    title: "백엔드 개발자 티칭맵",
    description:
      "Node.js와 데이터베이스를 중심으로 구성된 백엔드 학습 티칭맵입니다.",
    currentStep: 4,
    totalStep: 8,
    type: "shortcut",
    thumbnails: [
      "/youtube-app-icon.png",
      "/youtube-app-icon.png",
      "/youtube-app-icon.png",
    ],
    deletedAt: "2026-07-24",
  },
];

const getDeletedTime = (
  deletedAt: string,
) => new Date(deletedAt).getTime();

const TrashContent = () => {
  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState<TrashCategory>("folder");

  const [sortType, setSortType] =
    useState<TrashSortType>("latest");

  const [
    currentFolderPage,
    setCurrentFolderPage,
  ] = useState(1);

  const [
    currentTeachingMapPage,
    setCurrentTeachingMapPage,
  ] = useState(1);

  const [
    currentDataPage,
    setCurrentDataPage,
  ] = useState(1);

  const [
    isRestoreMode,
    setIsRestoreMode,
  ] = useState(false);

  const [
    selectedItemIds,
    setSelectedItemIds,
  ] = useState<number[]>([]);

  const [folders, setFolders] =
    useState<TrashFolderItem[]>(
      initialFolders,
    );

  const [dataList, setDataList] =
    useState<TrashDataItem[]>(
      initialDataList,
    );

  const [
    teachingMaps,
    setTeachingMaps,
  ] =
    useState<TrashTeachingMapItem[]>(
      initialTeachingMaps,
    );

  const [
    toastMessage,
    setToastMessage,
  ] = useState("");

  const toastTimerRef =
    useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (
        toastTimerRef.current !== null
      ) {
        window.clearTimeout(
          toastTimerRef.current,
        );
      }
    };
  }, []);

  const sortedFolders = useMemo(
    () =>
      [...folders].sort(
        (firstFolder, secondFolder) => {
          const firstTime =
            getDeletedTime(
              firstFolder.deletedAt,
            );

          const secondTime =
            getDeletedTime(
              secondFolder.deletedAt,
            );

          return sortType === "latest"
            ? secondTime - firstTime
            : firstTime - secondTime;
        },
      ),
    [folders, sortType],
  );

  const sortedDataList = useMemo(
    () =>
      [...dataList].sort(
        (firstData, secondData) => {
          const firstTime =
            getDeletedTime(
              firstData.deletedAt,
            );

          const secondTime =
            getDeletedTime(
              secondData.deletedAt,
            );

          return sortType === "latest"
            ? secondTime - firstTime
            : firstTime - secondTime;
        },
      ),
    [dataList, sortType],
  );

  const sortedTeachingMaps =
    useMemo(
      () =>
        [...teachingMaps].sort(
          (firstMap, secondMap) => {
            const firstTime =
              getDeletedTime(
                firstMap.deletedAt,
              );

            const secondTime =
              getDeletedTime(
                secondMap.deletedAt,
              );

            return sortType ===
              "latest"
              ? secondTime - firstTime
              : firstTime - secondTime;
          },
        ),
      [teachingMaps, sortType],
    );

  const totalFolderPages = Math.max(
    1,
    Math.ceil(
      sortedFolders.length /
        FOLDERS_PER_PAGE,
    ),
  );

  const totalTeachingMapPages =
    Math.max(
      1,
      Math.ceil(
        sortedTeachingMaps.length /
          TEACHING_MAPS_PER_PAGE,
      ),
    );

  const totalDataPages = Math.max(
    1,
    Math.ceil(
      sortedDataList.length /
        DATA_PER_PAGE,
    ),
  );

  const activeFolderPage = Math.min(
    currentFolderPage,
    totalFolderPages,
  );

  const activeTeachingMapPage =
    Math.min(
      currentTeachingMapPage,
      totalTeachingMapPages,
    );

  const activeDataPage = Math.min(
    currentDataPage,
    totalDataPages,
  );

  const visibleFolders = useMemo(() => {
    const startIndex =
      (activeFolderPage - 1) *
      FOLDERS_PER_PAGE;

    return sortedFolders.slice(
      startIndex,
      startIndex + FOLDERS_PER_PAGE,
    );
  }, [
    sortedFolders,
    activeFolderPage,
  ]);

  const visibleTeachingMaps =
    useMemo(() => {
      const startIndex =
        (activeTeachingMapPage - 1) *
        TEACHING_MAPS_PER_PAGE;

      return sortedTeachingMaps.slice(
        startIndex,
        startIndex +
          TEACHING_MAPS_PER_PAGE,
      );
    }, [
      sortedTeachingMaps,
      activeTeachingMapPage,
    ]);

  const visibleDataList = useMemo(() => {
    const startIndex =
      (activeDataPage - 1) *
      DATA_PER_PAGE;

    return sortedDataList.slice(
      startIndex,
      startIndex + DATA_PER_PAGE,
    );
  }, [
    activeDataPage,
    sortedDataList,
  ]);

  const visibleItemIds = useMemo(() => {
    if (
      selectedCategory === "folder"
    ) {
      return visibleFolders.map(
        (folder) => folder.id,
      );
    }

    if (
      selectedCategory === "data"
    ) {
      return visibleDataList.map(
        (data) => data.id,
      );
    }

    return visibleTeachingMaps.map(
      (teachingMap) =>
        teachingMap.id,
    );
  }, [
    selectedCategory,
    visibleFolders,
    visibleDataList,
    visibleTeachingMaps,
  ]);

  const showToast = (
    message: string,
  ) => {
    setToastMessage(message);

    if (
      toastTimerRef.current !== null
    ) {
      window.clearTimeout(
        toastTimerRef.current,
      );
    }

    toastTimerRef.current =
      window.setTimeout(() => {
        setToastMessage("");
        toastTimerRef.current = null;
      }, 3000);
  };

  const handleCategoryChange = (
    category: TrashCategory,
  ) => {
    setSelectedCategory(category);
    setIsRestoreMode(false);
    setSelectedItemIds([]);

    if (category === "folder") {
      setCurrentFolderPage(1);
    }

    if (category === "data") {
      setCurrentDataPage(1);
    }

    if (
      category === "teachingMap"
    ) {
      setCurrentTeachingMapPage(1);
    }
  };

  const handleSortChange = (
    newSortType: TrashSortType,
  ) => {
    setSortType(newSortType);
    setCurrentFolderPage(1);
    setCurrentDataPage(1);
    setCurrentTeachingMapPage(1);
    setSelectedItemIds([]);
  };

  const handlePageChange = (
    page: number,
  ) => {
    if (
      selectedCategory === "folder"
    ) {
      setCurrentFolderPage(page);
    }

    if (
      selectedCategory === "data"
    ) {
      setCurrentDataPage(page);
    }

    if (
      selectedCategory ===
      "teachingMap"
    ) {
      setCurrentTeachingMapPage(page);
    }

    setSelectedItemIds([]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleRestoreModeStart =
    () => {
      setIsRestoreMode(true);
      setSelectedItemIds([]);
    };

  const handleRestoreModeCancel =
    () => {
      setIsRestoreMode(false);
      setSelectedItemIds([]);
    };

  const handleItemSelect = (
    itemId: number,
  ) => {
    setSelectedItemIds(
      (previousIds) =>
        previousIds.includes(itemId)
          ? previousIds.filter(
              (id) => id !== itemId,
            )
          : [
              ...previousIds,
              itemId,
            ],
    );
  };

  const handleToggleSelection =
    () => {
      if (
        selectedItemIds.length > 0
      ) {
        setSelectedItemIds([]);
        return;
      }

      setSelectedItemIds(
        visibleItemIds,
      );
    };

  const handleSelectedRestore =
    () => {
      if (
        selectedItemIds.length === 0
      ) {
        return;
      }

      if (
        selectedCategory === "folder"
      ) {
        setFolders(
          (previousFolders) =>
            previousFolders.filter(
              (folder) =>
                !selectedItemIds.includes(
                  folder.id,
                ),
            ),
        );

        showToast(
          "선택한 폴더가 복구되었습니다.",
        );
      }

      if (
        selectedCategory === "data"
      ) {
        setDataList(
          (previousDataList) =>
            previousDataList.filter(
              (data) =>
                !selectedItemIds.includes(
                  data.id,
                ),
            ),
        );

        showToast(
          "선택한 자료가 복구되었습니다.",
        );
      }

      if (
        selectedCategory ===
        "teachingMap"
      ) {
        setTeachingMaps(
          (previousTeachingMaps) =>
            previousTeachingMaps.filter(
              (teachingMap) =>
                !selectedItemIds.includes(
                  teachingMap.id,
                ),
            ),
        );

        showToast(
          "선택한 티칭맵이 복구되었습니다.",
        );
      }

      setIsRestoreMode(false);
      setSelectedItemIds([]);
    };

  const handleDataRestore = (
    dataId: number,
  ) => {
    setDataList(
      (previousDataList) =>
        previousDataList.filter(
          (data) =>
            data.id !== dataId,
        ),
    );

    showToast(
      "해당 자료가 복구되었습니다.",
    );
  };

  const isEmpty =
    selectedCategory === "folder"
      ? sortedFolders.length === 0
      : selectedCategory === "data"
        ? sortedDataList.length === 0
        : sortedTeachingMaps.length ===
          0;

  const showPagination =
    !isEmpty &&
    !isRestoreMode &&
    (selectedCategory === "folder"
      ? sortedFolders.length > 1
      : selectedCategory === "data"
        ? sortedDataList.length > 1
        : sortedTeachingMaps.length >
          1);

  const paginationCurrentPage =
    selectedCategory === "folder"
      ? activeFolderPage
      : selectedCategory === "data"
        ? activeDataPage
        : activeTeachingMapPage;

  const paginationTotalPages =
    selectedCategory === "folder"
      ? totalFolderPages
      : selectedCategory === "data"
        ? totalDataPages
        : totalTeachingMapPages;

  const renderContent = () => {
    if (isEmpty) {
      return <TrashEmpty />;
    }

    if (
      selectedCategory === "folder"
    ) {
      return (
        <TrashFolderList
          folders={visibleFolders}
          isRestoreMode={
            isRestoreMode
          }
          selectedItemIds={
            selectedItemIds
          }
          onSelect={handleItemSelect}
        />
      );
    }

    if (
      selectedCategory === "data"
    ) {
      return (
        <TrashDataList
          dataList={visibleDataList}
          isRestoreMode={
            isRestoreMode
          }
          selectedItemIds={
            selectedItemIds
          }
          onSelect={handleItemSelect}
          onRestore={
            handleDataRestore
          }
        />
      );
    }

    return (
      <TrashTeachingMapList
        teachingMaps={
          visibleTeachingMaps
        }
        isRestoreMode={isRestoreMode}
        selectedItemIds={
          selectedItemIds
        }
        onSelect={handleItemSelect}
      />
    );
  };

  return (
    <main className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#0B0A18]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[296px] bg-[linear-gradient(180deg,rgba(134,111,241,0)_0%,rgba(134,111,241,0.3)_100%)]"
      />

      <div className="relative z-10 mx-auto w-[1120px] pb-[120px] pt-10">
        <TrashHeader />

        <div className="mt-5 flex items-center justify-between">
          <TrashCategoryTabs
            selectedCategory={
              selectedCategory
            }
            onCategoryChange={
              handleCategoryChange
            }
          />

          {!isRestoreMode && (
            <div className="flex items-center gap-[10px]">
              <TrashSortDropdown
                sortType={sortType}
                onSortChange={
                  handleSortChange
                }
              />

              {!isEmpty && (
                <button
                  type="button"
                  onClick={
                    handleRestoreModeStart
                  }
                  className="flex h-10 w-[147px] items-center justify-center gap-2 rounded-[5px] px-2 py-1 font-suit text-[20px] font-medium leading-[30px] tracking-[-0.6px] text-[#D0D0D2] hover:bg-white/5"
                >
                  <img
                    src="/flip-left.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0"
                  />

                  복구하기
                </button>
              )}
            </div>
          )}
        </div>

        {isRestoreMode && (
          <div className="mt-10">
            <TrashRestoreToolbar
              selectedCount={
                selectedItemIds.length
              }
              onToggleSelection={
                handleToggleSelection
              }
              onRestore={
                handleSelectedRestore
              }
              onCancel={
                handleRestoreModeCancel
              }
            />
          </div>
        )}

        <section
          className={
            isEmpty
              ? "mt-[180px]"
              : isRestoreMode
                ? "mt-5 min-h-[540px]"
                : "mt-10 min-h-[540px]"
          }
        >
          {renderContent()}
        </section>

        {showPagination && (
          <Pagination
            currentPage={
              paginationCurrentPage
            }
            totalPages={
              paginationTotalPages
            }
            onPageChange={
              handlePageChange
            }
          />
        )}
      </div>

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className={[
            "fixed bottom-[44px] left-1/2 z-50 -translate-x-1/2",
            "flex w-[768px] flex-col items-start gap-[10px]",
            "rounded-[10px] border border-[#917DEC] bg-[#F5F2FF] px-5 py-4",
            "font-suit text-[20px] font-semibold leading-[28px] tracking-[-0.6px]",
            "text-[#2B2C35]",
          ].join(" ")}
        >
          {toastMessage}
        </div>
      )}
    </main>
  );
};

export default TrashContent;
