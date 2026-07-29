import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import {
  getTemporaryTeachingMaps,
  type TeachingMapListItem,
} from "../apis/teachingMap";
import Pagination from "../components/common/Pagination";
import Toast from "../components/common/Toast";
import TemporaryTeachingMapHeader from "../components/teachingMap/drafts/TemporaryTeachingMapHeader";
import TemporaryTeachingMapList from "../components/teachingMap/drafts/TemporaryTeachingMapList";
import TeachingMapDeleteModal from "../components/teachingMap/main/TeachingMapDeleteModal";
import TeachingMapDeleteToolbar from "../components/teachingMap/main/TeachingMapDeleteToolbar";
import TeachingMapFilter, {
  type TeachingMapFilterType,
} from "../components/teachingMap/main/TeachingMapFilter";
import TeachingMapToolbar, {
  type TeachingMapSortType,
} from "../components/teachingMap/main/TeachingMapToolbar";
import type { TemporaryTeachingMapData } from "../constants/temporaryTeachingMaps";

const TEACHING_MAPS_PER_PAGE = 10;

const toTemporaryTeachingMapData = (
  teachingMap: TeachingMapListItem,
): TemporaryTeachingMapData => ({
  id: teachingMap.teachingMapId,
  title: teachingMap.title,
  description: teachingMap.description,
  type:
    teachingMap.type === "DEEPDIVE"
      ? "deepDive"
      : "shortcut",
  thumbnailSrc:
    teachingMap.sourcePlatforms?.[0]?.imageUrl ??
    "/icons.svg",
  thumbnailSrcs: (teachingMap.sourcePlatforms ?? []).map(
    (platform) => platform.imageUrl,
  ),
  extraThumbnailCount: teachingMap.extraCount,
  folderId: null,
  savedAt: teachingMap.createdAt,
});

const TemporaryTeachingMapPage = () => {
  const navigate = useNavigate();

  const [
    teachingMaps,
    setTeachingMaps,
  ] = useState<
    TemporaryTeachingMapData[]
  >([]);

  const [loadError, setLoadError] =
    useState("");

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

  const [deletedTeachingMaps, setDeletedTeachingMaps] =
    useState<TemporaryTeachingMapData[]>([]);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const loadTemporaryTeachingMaps = async () => {
      try {
        setLoadError("");

        const result =
          await getTemporaryTeachingMaps(
            selectedFilter === "all"
              ? "ALL"
              : selectedFilter === "deepDive"
                ? "DEEPDIVE"
                : "SHORTCUT",
            sortType === "latest"
              ? "LATEST"
              : "OLDEST",
          );

        if (!isCancelled) {
          setTeachingMaps(
            result.teachingMaps.map(
              toTemporaryTeachingMapData,
            ),
          );
        }
      } catch (error) {
        if (!isCancelled) {
          setTeachingMaps([]);
          setLoadError(
            error instanceof Error
              ? error.message
              : "임시보관함을 불러오지 못했습니다.",
          );
        }
      }
    };

    void loadTemporaryTeachingMaps();

    return () => {
      isCancelled = true;
    };
  }, [selectedFilter, sortType]);

  const filteredTeachingMaps =
    useMemo(() => {
      const filteredMaps =
        teachingMaps.filter(
          (teachingMap) =>
            selectedFilter === "all" ||
            teachingMap.type ===
              selectedFilter,
        );

      return [...filteredMaps].sort(
        (firstMap, secondMap) => {
          const firstSavedTime =
            new Date(
              firstMap.savedAt,
            ).getTime();

          const secondSavedTime =
            new Date(
              secondMap.savedAt,
            ).getTime();

          return sortType === "latest"
            ? secondSavedTime -
                firstSavedTime
            : firstSavedTime -
                secondSavedTime;
        },
      );
    }, [
      selectedFilter,
      sortType,
      teachingMaps,
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
      activePage,
      filteredTeachingMaps,
    ]);

  const handleFilterChange = (
    filter: TeachingMapFilterType,
  ) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
    setIsDeleteMode(false);
    setSelectedTeachingMapIds([]);
  };

  const handleSortChange = (
    nextSortType: TeachingMapSortType,
  ) => {
    setSortType(nextSortType);
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
      `/teaching-map/drafts/${teachingMapId}/edit`,
    );
  };

  const handleTeachingMapSelect = (
    teachingMapId: number,
  ) => {
    setSelectedTeachingMapIds(
      (previousIds) =>
        previousIds.includes(
          teachingMapId,
        )
          ? previousIds.filter(
              (selectedId) =>
                selectedId !==
                teachingMapId,
            )
          : [
              ...previousIds,
              teachingMapId,
            ],
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
    setSelectedTeachingMapIds((previousIds) => {
      if (isCurrentPageAllSelected) {
        return previousIds.filter(
          (id) => !visibleTeachingMapIds.includes(id),
        );
      }

      return Array.from(
        new Set([...previousIds, ...visibleTeachingMapIds]),
      );
    });
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

  const handleDeleteConfirm = () => {
    const teachingMapsToDelete =
      teachingMaps.filter((teachingMap) =>
        selectedTeachingMapIds.includes(teachingMap.id),
      );
    setDeletedTeachingMaps(teachingMapsToDelete);

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

    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setIsToastOpen(false);
      setDeletedTeachingMaps([]);
      toastTimerRef.current = null;
    }, 5000);
  };

  const handleDeleteUndo = () => {
    setTeachingMaps((previousTeachingMaps) => [
      ...previousTeachingMaps,
      ...deletedTeachingMaps.filter(
        (deletedMap) =>
          !previousTeachingMaps.some(
            (teachingMap) =>
              teachingMap.id === deletedMap.id,
          ),
      ),
    ]);
    setIsToastOpen(false);
    setDeletedTeachingMaps([]);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#0B0A18]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[195px] bg-[linear-gradient(180deg,rgba(134,111,241,0)_0%,rgba(134,111,241,0.3)_100%)]"
      />

      <div className="relative z-10 mx-auto w-[1120px] py-10">
        <TemporaryTeachingMapHeader />

        <div className="mt-5">
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
              actionLabel="휴지통으로 이동"
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

        <div className="mt-5">
          {loadError ? (
            <div className="flex h-[300px] w-full items-center justify-center text-[18px] text-[#F07A7A]">
              {loadError}
            </div>
          ) : visibleTeachingMaps.length >
          0 ? (
            <TemporaryTeachingMapList
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
          ) : (
            <div className="flex h-[300px] w-full items-center justify-center text-[20px] font-medium text-[#717379]">
              임시저장한 티칭맵이 없습니다.
            </div>
          )}
        </div>

        {filteredTeachingMaps.length > 1 &&
          !isDeleteMode && (
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
      </div>

      <TeachingMapDeleteModal
        isOpen={isDeleteModalOpen}
        confirmLabel="휴지통으로 이동"
        onClose={() =>
          setIsDeleteModalOpen(false)
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

export default TemporaryTeachingMapPage;
