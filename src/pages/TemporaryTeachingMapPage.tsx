import {
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

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
import {
  TEMPORARY_TEACHING_MAPS,
  type TemporaryTeachingMapData,
} from "../constants/temporaryTeachingMaps";

const TemporaryTeachingMapPage = () => {
  const navigate = useNavigate();

  const [
    teachingMaps,
    setTeachingMaps,
  ] = useState<
    TemporaryTeachingMapData[]
  >(TEMPORARY_TEACHING_MAPS);

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

  const visibleTeachingMaps =
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

  const handleFilterChange = (
    filter: TeachingMapFilterType,
  ) => {
    setSelectedFilter(filter);
    setIsDeleteMode(false);
    setSelectedTeachingMapIds([]);
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
                onSortChange={setSortType}
                onDeleteModeStart={
                  handleDeleteModeStart
                }
              />
            </div>
          )}
        </div>

        <div className="mt-5">
          {visibleTeachingMaps.length >
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
              임시 저장한 티칭맵이
              없어요.
            </div>
          )}
        </div>
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
    </main>
  );
};

export default TemporaryTeachingMapPage;
