import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getTemporaryTeachingMaps,
  trashTeachingMaps,
  type TeachingMapListItem,
} from "../apis/teachingMap";
import { restoreTeachingMaps } from "../apis/trash";
import Pagination from "../components/common/Pagination";
import PageContainer from "../components/common/PageContainer";
import Toast from "../components/common/Toast";
import TemporaryTeachingMapHeader from "../components/teachingMap/drafts/TemporaryTeachingMapHeader";
import TemporaryTeachingMapList from "../components/teachingMap/drafts/TemporaryTeachingMapList";
import TeachingMapDeleteModal from "../components/teachingMap/main/TeachingMapDeleteModal";
import TeachingMapDeleteToolbar from "../components/teachingMap/main/TeachingMapDeleteToolbar";
import TeachingMapEmpty from "../components/teachingMap/main/TeachingMapEmpty";
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
  type: teachingMap.type === "DEEPDIVE" ? "deepDive" : "shortcut",
  thumbnailSrc: teachingMap.sourcePlatforms?.[0]?.imageUrl ?? "/icons.svg",
  thumbnailSrcs: (teachingMap.sourcePlatforms ?? []).map(
    (platform) => platform.imageUrl,
  ),
  extraThumbnailCount: teachingMap.extraCount,
  folderId: null,
  savedAt: teachingMap.createdAt,
});

const TemporaryTeachingMapPage = () => {
  const navigate = useNavigate();

  const [teachingMaps, setTeachingMaps] = useState<TemporaryTeachingMapData[]>(
    [],
  );

  const [loadError, setLoadError] = useState("");

  const [selectedFilter, setSelectedFilter] =
    useState<TeachingMapFilterType>("all");

  const [sortType, setSortType] = useState<TeachingMapSortType>("latest");

  const [currentPage, setCurrentPage] = useState(1);

  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const [selectedTeachingMapIds, setSelectedTeachingMapIds] = useState<
    number[]
  >([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [deletedTeachingMaps, setDeletedTeachingMaps] = useState<
    TemporaryTeachingMapData[]
  >([]);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
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

        const result = await getTemporaryTeachingMaps(
          selectedFilter === "all"
            ? "ALL"
            : selectedFilter === "deepDive"
              ? "DEEPDIVE"
              : "SHORTCUT",
          sortType === "latest" ? "LATEST" : "OLDEST",
        );

        if (!isCancelled) {
          setTeachingMaps(result.teachingMaps.map(toTemporaryTeachingMapData));
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

  const filteredTeachingMaps = useMemo(() => {
    const filteredMaps = teachingMaps.filter(
      (teachingMap) =>
        selectedFilter === "all" || teachingMap.type === selectedFilter,
    );

    return [...filteredMaps].sort((firstMap, secondMap) => {
      const firstSavedTime = new Date(firstMap.savedAt).getTime();

      const secondSavedTime = new Date(secondMap.savedAt).getTime();

      return sortType === "latest"
        ? secondSavedTime - firstSavedTime
        : firstSavedTime - secondSavedTime;
    });
  }, [selectedFilter, sortType, teachingMaps]);

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
  }, [activePage, filteredTeachingMaps]);

  const handleFilterChange = (filter: TeachingMapFilterType) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
    setIsDeleteMode(false);
    setSelectedTeachingMapIds([]);
  };

  const handleSortChange = (nextSortType: TeachingMapSortType) => {
    setSortType(nextSortType);
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
    navigate(`/teaching-map/drafts/${teachingMapId}/edit`);
  };

  const handleTeachingMapSelect = (teachingMapId: number) => {
    setSelectedTeachingMapIds((previousIds) =>
      previousIds.includes(teachingMapId)
        ? previousIds.filter((selectedId) => selectedId !== teachingMapId)
        : [...previousIds, teachingMapId],
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

  const visibleTeachingMapIds = visibleTeachingMaps.map(
    (teachingMap) => teachingMap.id,
  );
  const hasSelectedTeachingMaps = selectedTeachingMapIds.length > 0;

  const handleToggleSelectAll = () => {
    setSelectedTeachingMapIds((previousIds) => {
      if (previousIds.length > 0) {
        return [];
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
      setIsToastOpen(false);
      setDeletedTeachingMaps([]);
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
        toastTimerRef.current = null;
      }
    } catch (error) {
      setToastMessage(
        error instanceof Error
          ? error.message
          : "티칭맵 휴지통 이동을 취소하지 못했습니다.",
      );
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#0B0A18]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[195px] bg-[linear-gradient(180deg,rgba(134,111,241,0)_0%,rgba(134,111,241,0.3)_100%)]"
      />

      <PageContainer className="relative z-10 flex min-h-[calc(100dvh-64px)] flex-col pb-[122px] pt-10 lg:block lg:min-h-0 lg:py-10">
        <TemporaryTeachingMapHeader />

        <div className="mt-5">
          {isDeleteMode ? (
            <TeachingMapDeleteToolbar
              selectedCount={selectedTeachingMapIds.length}
              isAllSelected={hasSelectedTeachingMaps}
              onToggleSelectAll={handleToggleSelectAll}
              actionLabel="휴지통으로 이동"
              onDeleteClick={handleDeleteButtonClick}
              onCancelClick={handleDeleteModeCancel}
            />
          ) : (
            <div className="flex w-full items-center gap-[16px] lg:justify-between lg:gap-0">
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

        <div className="mt-5">
          {loadError ? (
            <div className="flex h-[300px] w-full items-center justify-center text-[18px] text-[#F07A7A]">
              {loadError}
            </div>
          ) : visibleTeachingMaps.length > 0 ? (
            <TemporaryTeachingMapList
              teachingMaps={visibleTeachingMaps}
              isDeleteMode={isDeleteMode}
              selectedTeachingMapIds={selectedTeachingMapIds}
              onTeachingMapClick={handleTeachingMapClick}
              onTeachingMapSelect={handleTeachingMapSelect}
            />
          ) : (
            <TeachingMapEmpty
              imageAlt="임시보관함 빈 상태"
              message="임시저장한 티칭맵이 없습니다."
            />
          )}
        </div>

        {filteredTeachingMaps.length > 0 && (
          <div className="mt-auto pt-[70px] [&_nav]:mt-0 lg:mt-0 lg:pb-[77px] lg:pt-0">
            <Pagination
              currentPage={activePage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </PageContainer>

      <TeachingMapDeleteModal
        isOpen={isDeleteModalOpen}
        confirmLabel="휴지통으로 이동"
        onClose={() => setIsDeleteModalOpen(false)}
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

export default TemporaryTeachingMapPage;
