import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import {
  getTeachingMaps,
  type TeachingMapListItem,
} from "../apis/teachingMap";
import Pagination from "../components/common/Pagination";
import Toast from "../components/common/Toast";

import type { TeachingMapCardData } from "../components/teachingMap/main/TeachingMapCard";
import TeachingMapDeleteModal from "../components/teachingMap/main/TeachingMapDeleteModal";
import TeachingMapDeleteToolbar from "../components/teachingMap/main/TeachingMapDeleteToolbar";
import TeachingMapEmpty from "../components/teachingMap/main/TeachingMapEmpty";
import TeachingMapFilter, {
  type TeachingMapFilterType,
} from "../components/teachingMap/main/TeachingMapFilter";
import TeachingMapHeader from "../components/teachingMap/main/TeachingMapHeader";
import TeachingMapList from "../components/teachingMap/main/TeachingMapList";
import TeachingMapTab from "../components/teachingMap/main/TeachingMapTab";
import TeachingMapToolbar, {
  type TeachingMapSortType,
} from "../components/teachingMap/main/TeachingMapToolbar";

type LearningStatus =
  | "inProgress"
  | "completed";

const TEACHING_MAPS_PER_PAGE = 10;

const toTeachingMapCardData = (
  teachingMap: TeachingMapListItem,
): TeachingMapCardData => ({
  id: teachingMap.teachingMapId,
  title: teachingMap.title,
  description: teachingMap.description,
  type:
    teachingMap.type === "DEEPDIVE"
      ? "deepDive"
      : "shortcut",
  status:
    teachingMap.status === "FINISHED"
      ? "completed"
      : "inProgress",
  currentStep: teachingMap.completedStepCount,
  totalStep: teachingMap.totalStepCount,
  thumbnailSrc:
    teachingMap.sourcePlatforms?.[0]?.imageUrl ??
    "/icons.svg",
  thumbnailSrcs: (teachingMap.sourcePlatforms ?? []).map(
    (platform) => platform.imageUrl,
  ),
  extraThumbnailCount: teachingMap.extraCount,
  createdAt: teachingMap.createdAt,
});

const TeachingMapPage = () => {
  const navigate = useNavigate();

  const [
    learningStatus,
    setLearningStatus,
  ] = useState<LearningStatus>(
    "inProgress",
  );

  const [
    selectedFilter,
    setSelectedFilter,
  ] =
    useState<TeachingMapFilterType>(
      "all",
    );

  const [sortType, setSortType] =
    useState<TeachingMapSortType>(
      "latest",
    );

  const [currentPage, setCurrentPage] =
    useState(1);

  const [
    teachingMaps,
    setTeachingMaps,
  ] = useState<TeachingMapCardData[]>([]);

  const [loadError, setLoadError] =
    useState("");

  const [
    isDeleteMode,
    setIsDeleteMode,
  ] = useState(false);

  const [
    selectedTeachingMapIds,
    setSelectedTeachingMapIds,
  ] = useState<number[]>([]);

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false);

  const [
    isToastOpen,
    setIsToastOpen,
  ] = useState(false);

  const [
    deletedTeachingMaps,
    setDeletedTeachingMaps,
  ] = useState<TeachingMapCardData[]>(
    [],
  );

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

  useEffect(() => {
    let isCancelled = false;

    const loadTeachingMaps = async () => {
      try {
        setLoadError("");

        const result = await getTeachingMaps({
          status:
            learningStatus === "completed"
              ? "FINISHED"
              : "IN_PROGRESS",
          type:
            selectedFilter === "all"
              ? "ALL"
              : selectedFilter === "deepDive"
                ? "DEEPDIVE"
                : "SHORTCUT",
          sort:
            sortType === "latest"
              ? "LATEST"
              : "OLDEST",
        });

        if (!isCancelled) {
          setTeachingMaps(
            result.teachingMaps.map(
              toTeachingMapCardData,
            ),
          );
        }
      } catch (error) {
        if (!isCancelled) {
          setTeachingMaps([]);
          setLoadError(
            error instanceof Error
              ? error.message
              : "티칭맵 목록을 불러오지 못했습니다.",
          );
        }
      }
    };

    void loadTeachingMaps();

    return () => {
      isCancelled = true;
    };
  }, [
    learningStatus,
    selectedFilter,
    sortType,
  ]);

  const filteredTeachingMaps =
    useMemo(() => {
      const filteredMaps =
        teachingMaps.filter(
          (teachingMap) => {
            const hasSameStatus =
              teachingMap.status ===
              learningStatus;

            const hasSameType =
              selectedFilter === "all" ||
              teachingMap.type ===
                selectedFilter;

            return (
              hasSameStatus &&
              hasSameType
            );
          },
        );

      return [...filteredMaps].sort(
        (firstMap, secondMap) => {
          const firstCreatedTime =
            firstMap.createdAt
              ? new Date(
                  firstMap.createdAt,
                ).getTime()
              : firstMap.id;

          const secondCreatedTime =
            secondMap.createdAt
              ? new Date(
                  secondMap.createdAt,
                ).getTime()
              : secondMap.id;

          if (
            sortType === "latest"
          ) {
            return (
              secondCreatedTime -
              firstCreatedTime
            );
          }

          return (
            firstCreatedTime -
            secondCreatedTime
          );
        },
      );
    }, [
      teachingMaps,
      learningStatus,
      selectedFilter,
      sortType,
    ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredTeachingMaps.length /
        TEACHING_MAPS_PER_PAGE,
    ),
  );

  const activePage = Math.min(
    currentPage,
    totalPages,
  );

  const visibleTeachingMaps =
    useMemo(() => {
      const startIndex =
        (activePage - 1) *
        TEACHING_MAPS_PER_PAGE;

      return filteredTeachingMaps.slice(
        startIndex,
        startIndex +
          TEACHING_MAPS_PER_PAGE,
      );
    }, [
      filteredTeachingMaps,
      activePage,
    ]);

  const handleLearningStatusChange = (
    status: LearningStatus,
  ) => {
    setLearningStatus(status);
    setSelectedFilter("all");
    setCurrentPage(1);
    setIsDeleteMode(false);
    setSelectedTeachingMapIds([]);
  };

  const handleFilterChange = (
    filter: TeachingMapFilterType,
  ) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const handleSortChange = (
    newSortType: TeachingMapSortType,
  ) => {
    setSortType(newSortType);
    setCurrentPage(1);
  };

  const handlePageChange = (
    page: number,
  ) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleTeachingMapClick = (
    teachingMapId: number,
  ) => {
    navigate(
      `/teaching-map/${teachingMapId}`,
    );
  };

  const handleTeachingMapSelect = (
    teachingMapId: number,
  ) => {
    setSelectedTeachingMapIds(
      (previousIds) => {
        const isAlreadySelected =
          previousIds.includes(
            teachingMapId,
          );

        if (isAlreadySelected) {
          return previousIds.filter(
            (selectedId) =>
              selectedId !==
              teachingMapId,
          );
        }

        return [
          ...previousIds,
          teachingMapId,
        ];
      },
    );
  };

  const handleDeleteModeStart = () => {
    setIsDeleteMode(true);
    setSelectedTeachingMapIds([]);
  };

  const handleDeleteModeCancel = () => {
    setIsDeleteMode(false);
    setSelectedTeachingMapIds([]);
  };

  const visibleTeachingMapIds =
    visibleTeachingMaps.map(
      (teachingMap) => teachingMap.id,
    );

  const isCurrentPageAllSelected =
    visibleTeachingMapIds.length > 0 &&
    visibleTeachingMapIds.every((id) =>
      selectedTeachingMapIds.includes(id),
    );

  const handleToggleSelectAll = () => {
    setSelectedTeachingMapIds(
      (previousIds) => {
        if (isCurrentPageAllSelected) {
          return previousIds.filter(
            (id) =>
              !visibleTeachingMapIds.includes(
                id,
              ),
          );
        }

        return Array.from(
          new Set([
            ...previousIds,
            ...visibleTeachingMapIds,
          ]),
        );
      },
    );
  };

  const handleDeleteButtonClick =
    () => {
      if (
        selectedTeachingMapIds.length ===
        0
      ) {
        return;
      }

      setIsDeleteModalOpen(true);
    };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const closeToast = () => {
    setIsToastOpen(false);
    setDeletedTeachingMaps([]);

    if (
      toastTimerRef.current !== null
    ) {
      window.clearTimeout(
        toastTimerRef.current,
      );

      toastTimerRef.current = null;
    }
  };

  const handleDeleteConfirm = () => {
    const teachingMapsToDelete =
      teachingMaps.filter(
        (teachingMap) =>
          selectedTeachingMapIds.includes(
            teachingMap.id,
          ),
      );

    setDeletedTeachingMaps(
      teachingMapsToDelete,
    );

    setTeachingMaps(
      (previousTeachingMaps) =>
        previousTeachingMaps.filter(
          (teachingMap) =>
            !selectedTeachingMapIds.includes(
              teachingMap.id,
            ),
        ),
    );

    setIsDeleteModalOpen(false);
    setIsDeleteMode(false);
    setSelectedTeachingMapIds([]);
    setIsToastOpen(true);

    if (
      toastTimerRef.current !== null
    ) {
      window.clearTimeout(
        toastTimerRef.current,
      );
    }

    toastTimerRef.current =
      window.setTimeout(() => {
        setIsToastOpen(false);
        setDeletedTeachingMaps([]);
        toastTimerRef.current = null;
      }, 5000);
  };

  const handleDeleteUndo = () => {
    if (
      deletedTeachingMaps.length === 0
    ) {
      return;
    }

    setTeachingMaps(
      (previousTeachingMaps) => {
        const existingTeachingMapIds =
          new Set(
            previousTeachingMaps.map(
              (teachingMap) =>
                teachingMap.id,
            ),
          );

        const mapsToRestore =
          deletedTeachingMaps.filter(
            (teachingMap) =>
              !existingTeachingMapIds.has(
                teachingMap.id,
              ),
          );

        return [
          ...previousTeachingMaps,
          ...mapsToRestore,
        ];
      },
    );

    closeToast();
  };

  const isEmpty =
    filteredTeachingMaps.length === 0;

  return (
    <main className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#0B0A18]">
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-x-0 bottom-0",
          "h-[195px]",
          "bg-[linear-gradient(180deg,rgba(134,111,241,0)_0%,rgba(134,111,241,0.3)_100%)]",
        ].join(" ")}
      />

      <div className="relative z-10 mx-auto w-[1120px] py-10">
        <TeachingMapHeader />

        <TeachingMapTab
          learningStatus={
            learningStatus
          }
          onLearningStatusChange={
            handleLearningStatusChange
          }
        />

        <>
            <div className="mt-[55px]">
              {isDeleteMode ? (
                <TeachingMapDeleteToolbar
                  selectedCount={
                    selectedTeachingMapIds.length
                  }
                  isAllSelected={
                    isCurrentPageAllSelected
                  }
                  onToggleSelectAll={
                    handleToggleSelectAll
                  }
                  onDeleteClick={
                    handleDeleteButtonClick
                  }
                  onCancelClick={
                    handleDeleteModeCancel
                  }
                />
              ) : (
                <div className="flex w-full items-center justify-between">
                  <TeachingMapFilter
                    selectedFilter={
                      selectedFilter
                    }
                    onFilterChange={
                      handleFilterChange
                    }
                  />

                  <TeachingMapToolbar
                    sortType={sortType}
                    onSortChange={
                      handleSortChange
                    }
                    onDeleteModeStart={
                      handleDeleteModeStart
                    }
                  />
                </div>
              )}
            </div>

            <div className="mt-5 flex min-h-[540px] flex-col">
              {loadError ? (
                <div className="flex h-[300px] items-center justify-center text-[18px] text-[#F07A7A]">
                  {loadError}
                </div>
              ) : isEmpty && !isDeleteMode ? (
                <TeachingMapEmpty />
              ) : (
                <TeachingMapList
                teachingMaps={
                  visibleTeachingMaps
                }
                isDeleteMode={
                  isDeleteMode
                }
                selectedTeachingMapIds={
                  selectedTeachingMapIds
                }
                onTeachingMapClick={
                  handleTeachingMapClick
                }
                onTeachingMapSelect={
                  handleTeachingMapSelect
                }
                />
              )}
            </div>

            {filteredTeachingMaps.length > 1 && (
              <div className="pb-[77px]">
                <Pagination
                  currentPage={activePage}
                  totalPages={totalPages}
                  onPageChange={
                    handlePageChange
                  }
                />
              </div>
            )}
          </>
      </div>

      <TeachingMapDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={
          handleDeleteModalClose
        }
        onDeleteConfirm={
          handleDeleteConfirm
        }
      />

      {isToastOpen && (
        <Toast
          message="티칭맵이 휴지통으로 이동되었습니다"
          actionText="실행취소"
          onAction={handleDeleteUndo}
        />
      )}
    </main>
  );
};

export default TeachingMapPage;
