import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

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

const INITIAL_TEACHING_MAPS: TeachingMapCardData[] = [
  {
    id: 1,
    title: "로드맵 제목",
    description:
      "로드맵에 대한 상세설명들 몇자까지 처음에 보이나요? 로드맵에 대한 상세설명입니다.",
    type: "deepDive",
    status: "inProgress",
    currentStep: 4,
    totalStep: 8,
    thumbnailSrc: "/icons.svg",
    createdAt: "2026-07-16T12:00:00",
  },
  {
    id: 2,
    title: "로드맵 제목",
    description:
      "로드맵에 대한 상세설명들 몇자까지 처음에 보이나요? 로드맵에 대한 상세설명입니다.",
    type: "shortcut",
    status: "inProgress",
    currentStep: 4,
    totalStep: 8,
    thumbnailSrc: "/icons.svg",
    createdAt: "2026-07-15T12:00:00",
  },
  {
    id: 3,
    title: "로드맵 제목",
    description:
      "로드맵에 대한 상세설명들 몇자까지 처음에 보이나요? 로드맵에 대한 상세설명입니다.",
    type: "shortcut",
    status: "completed",
    currentStep: 8,
    totalStep: 8,
    thumbnailSrc: "/icons.svg",
    createdAt: "2026-07-14T12:00:00",
  },
];

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
  ] = useState<TeachingMapCardData[]>(
    INITIAL_TEACHING_MAPS,
  );

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

        {isEmpty && !isDeleteMode ? (
          <TeachingMapEmpty />
        ) : (
          <>
            <div className="mt-[55px]">
              {isDeleteMode ? (
                <TeachingMapDeleteToolbar
                  selectedCount={
                    selectedTeachingMapIds.length
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

            <div className="mt-5 min-h-[540px]">
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
            </div>

            <Pagination
              currentPage={activePage}
              totalPages={totalPages}
              onPageChange={
                handlePageChange
              }
            />
          </>
        )}
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