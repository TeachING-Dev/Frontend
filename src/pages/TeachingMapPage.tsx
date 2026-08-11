import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getTeachingMaps,
  trashTeachingMaps,
  type TeachingMapListItem,
} from "../apis/teachingMap";
import { restoreTeachingMaps } from "../apis/trash";
import Pagination from "../components/common/Pagination";
import PageContainer from "../components/common/PageContainer";
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

type LearningStatus = "inProgress" | "completed";

const TEACHING_MAPS_PER_PAGE = 10;

const toTeachingMapCardData = (
  teachingMap: TeachingMapListItem,
): TeachingMapCardData => ({
  id: teachingMap.teachingMapId,
  title: teachingMap.title,
  description: teachingMap.description,
  type: teachingMap.type === "DEEPDIVE" ? "deepDive" : "shortcut",
  status: teachingMap.status === "FINISHED" ? "completed" : "inProgress",
  currentStep: teachingMap.completedStepCount,
  totalStep: teachingMap.totalStepCount,
  thumbnailSrc: teachingMap.sourcePlatforms?.[0]?.imageUrl ?? "/icons.svg",
  thumbnailSrcs: (teachingMap.sourcePlatforms ?? []).map(
    (platform) => platform.imageUrl,
  ),
  extraThumbnailCount: teachingMap.extraCount,
  createdAt: teachingMap.createdAt,
});

const TeachingMapPage = () => {
  const navigate = useNavigate();

  const [learningStatus, setLearningStatus] =
    useState<LearningStatus>("inProgress");

  const [selectedFilter, setSelectedFilter] =
    useState<TeachingMapFilterType>("all");

  const [sortType, setSortType] = useState<TeachingMapSortType>("latest");

  const [currentPage, setCurrentPage] = useState(1);

  const [teachingMaps, setTeachingMaps] = useState<TeachingMapCardData[]>([]);

  const [loadError, setLoadError] = useState("");

  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const [selectedTeachingMapIds, setSelectedTeachingMapIds] = useState<
    number[]
  >([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [deletedTeachingMaps, setDeletedTeachingMaps] = useState<
    TeachingMapCardData[]
  >([]);

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

    const loadTeachingMaps = async () => {
      try {
        setLoadError("");

        const result = await getTeachingMaps({
          status: learningStatus === "completed" ? "FINISHED" : "IN_PROGRESS",
          type:
            selectedFilter === "all"
              ? "ALL"
              : selectedFilter === "deepDive"
                ? "DEEPDIVE"
                : "SHORTCUT",
          sort: sortType === "latest" ? "LATEST" : "OLDEST",
        });

        if (!isCancelled) {
          setTeachingMaps(result.teachingMaps.map(toTeachingMapCardData));
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
  }, [learningStatus, selectedFilter, sortType]);

  const filteredTeachingMaps = useMemo(() => {
    const filteredMaps = teachingMaps.filter((teachingMap) => {
      const hasSameStatus = teachingMap.status === learningStatus;

      const hasSameType =
        selectedFilter === "all" || teachingMap.type === selectedFilter;

      return hasSameStatus && hasSameType;
    });

    return [...filteredMaps].sort((firstMap, secondMap) => {
      const firstCreatedTime = firstMap.createdAt
        ? new Date(firstMap.createdAt).getTime()
        : firstMap.id;

      const secondCreatedTime = secondMap.createdAt
        ? new Date(secondMap.createdAt).getTime()
        : secondMap.id;

      if (sortType === "latest") {
        return secondCreatedTime - firstCreatedTime;
      }

      return firstCreatedTime - secondCreatedTime;
    });
  }, [teachingMaps, learningStatus, selectedFilter, sortType]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTeachingMaps.length / TEACHING_MAPS_PER_PAGE),
  );

  const activePage = Math.min(currentPage, totalPages);

  const visibleTeachingMaps = useMemo(() => {
    const startIndex = (activePage - 1) * TEACHING_MAPS_PER_PAGE;

    return filteredTeachingMaps.slice(
      startIndex,
      startIndex + TEACHING_MAPS_PER_PAGE,
    );
  }, [filteredTeachingMaps, activePage]);

  const handleLearningStatusChange = (status: LearningStatus) => {
    setLearningStatus(status);
    setSelectedFilter("all");
    setCurrentPage(1);
    setIsDeleteMode(false);
    setSelectedTeachingMapIds([]);
  };

  const handleFilterChange = (filter: TeachingMapFilterType) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortType: TeachingMapSortType) => {
    setSortType(newSortType);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleTeachingMapClick = (teachingMapId: number) => {
    navigate(`/teaching-map/${teachingMapId}`);
  };

  const handleTeachingMapSelect = (teachingMapId: number) => {
    setSelectedTeachingMapIds((previousIds) => {
      const isAlreadySelected = previousIds.includes(teachingMapId);

      if (isAlreadySelected) {
        return previousIds.filter((selectedId) => selectedId !== teachingMapId);
      }

      return [...previousIds, teachingMapId];
    });
  };

  const handleDeleteModeStart = () => {
    setIsDeleteMode(true);
    setSelectedTeachingMapIds([]);
  };

  const handleDeleteModeCancel = () => {
    setIsDeleteMode(false);
    setSelectedTeachingMapIds([]);
  };

  const visibleTeachingMapIds = visibleTeachingMaps.map(
    (teachingMap) => teachingMap.id,
  );

  const isCurrentPageAllSelected =
    visibleTeachingMapIds.length > 0 &&
    visibleTeachingMapIds.every((id) => selectedTeachingMapIds.includes(id));

  const handleToggleSelectAll = () => {
    setSelectedTeachingMapIds((previousIds) => {
      if (isCurrentPageAllSelected) {
        return previousIds.filter((id) => !visibleTeachingMapIds.includes(id));
      }

      return Array.from(new Set([...previousIds, ...visibleTeachingMapIds]));
    });
  };

  const handleDeleteButtonClick = () => {
    if (selectedTeachingMapIds.length === 0) {
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

    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);

      toastTimerRef.current = null;
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedTeachingMapIds.length === 0 || isDeleting) {
      return;
    }

    setIsDeleting(true);

    const teachingMapsToDelete = teachingMaps.filter((teachingMap) =>
      selectedTeachingMapIds.includes(teachingMap.id),
    );

    try {
      const result = await trashTeachingMaps(selectedTeachingMapIds);
      const deletedIds = result.deletedTeachingMapIds;

      setDeletedTeachingMaps(
        teachingMapsToDelete.filter((teachingMap) =>
          deletedIds.includes(teachingMap.id),
        ),
      );

      setTeachingMaps((previousTeachingMaps) =>
        previousTeachingMaps.filter(
          (teachingMap) => !deletedIds.includes(teachingMap.id),
        ),
      );

      setIsDeleteModalOpen(false);
      setIsDeleteMode(false);
      setSelectedTeachingMapIds([]);
      setToastMessage(
        `${result.deletedCount}개 티칭맵이 휴지통으로 이동되었습니다`,
      );
      setIsToastOpen(true);

      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }

      toastTimerRef.current = window.setTimeout(() => {
        setIsToastOpen(false);
        setDeletedTeachingMaps([]);
        toastTimerRef.current = null;
      }, 5000);
    } catch (error) {
      setToastMessage(
        error instanceof Error
          ? error.message
          : "티칭맵을 휴지통으로 이동하지 못했습니다.",
      );
      setIsToastOpen(true);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteUndo = async () => {
    if (deletedTeachingMaps.length === 0) {
      return;
    }

    try {
      const result = await restoreTeachingMaps(
        deletedTeachingMaps.map((teachingMap) => teachingMap.id),
      );
      const restoredMaps = deletedTeachingMaps.filter((teachingMap) =>
        result.restoredIds.includes(teachingMap.id),
      );

      setTeachingMaps((previousTeachingMaps) => [
        ...previousTeachingMaps,
        ...restoredMaps,
      ]);
      closeToast();
    } catch (error) {
      setToastMessage(
        error instanceof Error
          ? error.message
          : "티칭맵 휴지통 이동을 취소하지 못했습니다.",
      );
    }
  };

  const isEmpty = filteredTeachingMaps.length === 0;

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

      <PageContainer className="relative z-10 flex min-h-[calc(100dvh-64px)] flex-col pb-[122px] pt-10 lg:block lg:min-h-0 lg:py-10">
        <TeachingMapHeader />

        <TeachingMapTab
          learningStatus={learningStatus}
          onLearningStatusChange={handleLearningStatusChange}
        />

        <>
          <div className="mt-[55px]">
            {isDeleteMode ? (
              <TeachingMapDeleteToolbar
                selectedCount={selectedTeachingMapIds.length}
                isAllSelected={isCurrentPageAllSelected}
                actionLabel="휴지통으로 이동"
                onToggleSelectAll={handleToggleSelectAll}
                onDeleteClick={handleDeleteButtonClick}
                onCancelClick={handleDeleteModeCancel}
              />
            ) : (
              <div className="flex w-full items-end gap-[16px] lg:justify-between lg:gap-0">
                <TeachingMapFilter
                  selectedFilter={selectedFilter}
                  onFilterChange={handleFilterChange}
                />

                <TeachingMapToolbar
                  sortType={sortType}
                  onSortChange={handleSortChange}
                  onDeleteModeStart={handleDeleteModeStart}
                />
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-col lg:min-h-[540px]">
            {loadError ? (
              <div className="flex h-[300px] items-center justify-center text-[18px] text-[#F07A7A]">
                {loadError}
              </div>
            ) : isEmpty && !isDeleteMode ? (
              <TeachingMapEmpty />
            ) : (
              <TeachingMapList
                teachingMaps={visibleTeachingMaps}
                isDeleteMode={isDeleteMode}
                selectedTeachingMapIds={selectedTeachingMapIds}
                onTeachingMapClick={handleTeachingMapClick}
                onTeachingMapSelect={handleTeachingMapSelect}
              />
            )}
          </div>

          {filteredTeachingMaps.length > 0 && (
            <div className="mt-auto pt-[70px] [&_nav]:mt-0 lg:static lg:mt-0 lg:pb-[77px] lg:pt-0">
              <Pagination
                currentPage={activePage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      </PageContainer>

      <TeachingMapDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDeleteConfirm={handleDeleteConfirm}
      />

      {isToastOpen && (
        <Toast
          message={toastMessage}
          actionText={deletedTeachingMaps.length > 0 ? "실행취소" : undefined}
          onAction={
            deletedTeachingMaps.length > 0 ? handleDeleteUndo : undefined
          }
        />
      )}
    </main>
  );
};

export default TeachingMapPage;
