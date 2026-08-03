import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getTrashFolders,
  getTrashMaterials,
  getTrashTeachingMaps,
  restoreFolders,
  restoreMaterials,
  restoreTeachingMaps,
} from "../../apis/trash";
import Pagination from "../common/Pagination";
import PageContainer from "../common/PageContainer";
import Toast from "../common/Toast";

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

interface TrashPageState {
  totalElements: number;
  totalPages: number;
}

const EMPTY_PAGE: TrashPageState = {
  totalElements: 0,
  totalPages: 0,
};

const TrashContent = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] =
    useState<TrashCategory>("folder");
  const [sortType, setSortType] = useState<TrashSortType>("latest");
  const [currentFolderPage, setCurrentFolderPage] = useState(1);
  const [currentTeachingMapPage, setCurrentTeachingMapPage] = useState(1);
  const [currentDataPage, setCurrentDataPage] = useState(1);
  const [isRestoreMode, setIsRestoreMode] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
  const [folders, setFolders] = useState<TrashFolderItem[]>([]);
  const [dataList, setDataList] = useState<TrashDataItem[]>([]);
  const [teachingMaps, setTeachingMaps] = useState<TrashTeachingMapItem[]>([]);
  const [folderPage, setFolderPage] = useState<TrashPageState>(EMPTY_PAGE);
  const [dataPage, setDataPage] = useState<TrashPageState>(EMPTY_PAGE);
  const [teachingMapPage, setTeachingMapPage] =
    useState<TrashPageState>(EMPTY_PAGE);
  const [reloadKey, setReloadKey] = useState(0);
  const [loadError, setLoadError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
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

    const loadTrash = async () => {
      try {
        setLoadError("");

        if (selectedCategory === "folder") {
          const result = await getTrashFolders(sortType, currentFolderPage - 1);
          if (isCancelled) return;

          setFolders(
            result.content.map((folder) => ({
              id: folder.folderId,
              name: folder.name,
              deletedAt: folder.deletedAt,
            })),
          );
          setFolderPage({
            totalElements: result.totalElements,
            totalPages: result.totalPages,
          });
          return;
        }

        if (selectedCategory === "data") {
          const result = await getTrashMaterials(sortType, currentDataPage - 1);
          if (isCancelled) return;

          setDataList(
            result.content.map((material) => ({
              id: material.materialId,
              tag: material.tags[0]?.tagName ?? "기타",
              createdAt: material.createdAt,
              deletedAt: material.deletedAt,
              title: material.title,
              description: material.summary,
              platformType: material.platformType,
              platformImageUrl: material.platformImageUrl,
              originalUrl: material.originalUrl,
            })),
          );
          setDataPage({
            totalElements: result.totalElements,
            totalPages: result.totalPages,
          });
          return;
        }

        const result = await getTrashTeachingMaps(
          sortType,
          currentTeachingMapPage - 1,
        );
        if (isCancelled) return;

        setTeachingMaps(
          result.content.map((teachingMap) => ({
            id: teachingMap.teachingMapId,
            title: teachingMap.title,
            description: teachingMap.description ?? "",
            status: teachingMap.status ?? "IN_PROGRESS",
            currentStep: teachingMap.completedStepCount ?? 0,
            totalStep: teachingMap.totalStepCount ?? 0,
            type: teachingMap.type === "DEEPDIVE" ? "deepDive" : "shortcut",
            thumbnails: (teachingMap.sourcePlatforms ?? [])
              .map((source) => source.imageUrl)
              .filter(Boolean),
            extraThumbnailCount: teachingMap.extraCount ?? 0,
            deletedAt: teachingMap.deletedAt,
          })),
        );
        setTeachingMapPage({
          totalElements: result.totalElements,
          totalPages: result.totalPages,
        });
      } catch (error) {
        if (!isCancelled) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "휴지통 목록을 불러오지 못했습니다.",
          );
        }
      }
    };

    void loadTrash();

    return () => {
      isCancelled = true;
    };
  }, [
    selectedCategory,
    sortType,
    currentFolderPage,
    currentDataPage,
    currentTeachingMapPage,
    reloadKey,
  ]);

  const visibleItems =
    selectedCategory === "folder"
      ? folders
      : selectedCategory === "data"
        ? dataList
        : teachingMaps;
  const visibleItemIds = visibleItems.map((item) => item.id);
  const currentPage =
    selectedCategory === "folder"
      ? currentFolderPage
      : selectedCategory === "data"
        ? currentDataPage
        : currentTeachingMapPage;
  const pageState =
    selectedCategory === "folder"
      ? folderPage
      : selectedCategory === "data"
        ? dataPage
        : teachingMapPage;
  const isEmpty = visibleItems.length === 0;
  const showPagination = pageState.totalElements > 0;

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage("");
      toastTimerRef.current = null;
    }, 3000);
  };

  const reloadCurrentPage = () => {
    setReloadKey((previous) => previous + 1);
  };

  const handleCategoryChange = (category: TrashCategory) => {
    setSelectedCategory(category);
    setIsRestoreMode(false);
    setSelectedItemIds([]);
    if (category === "folder") setCurrentFolderPage(1);
    if (category === "data") setCurrentDataPage(1);
    if (category === "teachingMap") {
      setCurrentTeachingMapPage(1);
    }
  };

  const handleSortChange = (newSortType: TrashSortType) => {
    setSortType(newSortType);
    setCurrentFolderPage(1);
    setCurrentDataPage(1);
    setCurrentTeachingMapPage(1);
    setSelectedItemIds([]);
  };

  const handlePageChange = (page: number) => {
    if (selectedCategory === "folder") {
      setCurrentFolderPage(page);
    }
    if (selectedCategory === "data") {
      setCurrentDataPage(page);
    }
    if (selectedCategory === "teachingMap") {
      setCurrentTeachingMapPage(page);
    }
    setSelectedItemIds([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemSelect = (itemId: number) => {
    setSelectedItemIds((previousIds) =>
      previousIds.includes(itemId)
        ? previousIds.filter((id) => id !== itemId)
        : [...previousIds, itemId],
    );
  };

  const handleToggleSelection = () => {
    setSelectedItemIds((previousIds) =>
      previousIds.length > 0 ? [] : visibleItemIds,
    );
  };

  const handleSelectedRestore = async () => {
    if (selectedItemIds.length === 0) return;

    try {
      const selectedDataTitles = dataList
        .filter((item) => selectedItemIds.includes(item.id))
        .map((item) => item.title);
      const result =
        selectedCategory === "folder"
          ? await restoreFolders(selectedItemIds)
          : selectedCategory === "data"
            ? await restoreMaterials(selectedItemIds)
            : await restoreTeachingMaps(selectedItemIds);
      const label =
        selectedCategory === "folder"
          ? "폴더"
          : selectedCategory === "data"
            ? "자료"
            : "티칭맵";

      showToast(
        result.failedIds.length > 0
          ? selectedCategory === "folder"
            ? `${result.restoredIds.length}개 폴더 복구 완료, 이름이 중복된 ${result.failedIds.length}개 폴더 복구 실패`
            : selectedCategory === "data"
              ? "자료가 있던 폴더를 먼저 복구해주세요."
              : `${result.restoredIds.length}개 ${label} 복구 완료, ${result.failedIds.length}개 복구 실패`
          : selectedCategory === "folder"
            ? "해당 폴더가 복구되었습니다."
            : selectedCategory === "data"
              ? selectedDataTitles.length > 1
                ? `‘${selectedDataTitles[0]}’ 외 ${selectedDataTitles.length - 1}개 자료가 복구되었습니다.`
                : `‘${selectedDataTitles[0] ?? "선택한 자료"}’ 자료가 복구되었습니다.`
              : `선택한 ${label}이 복구되었습니다.`,
      );
      setIsRestoreMode(false);
      setSelectedItemIds([]);
      reloadCurrentPage();
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "복구에 실패했습니다.",
      );
    }
  };

  const renderContent = () => {
    if (loadError) {
      return (
        <p className="text-center font-suit text-[18px] text-[#F07A7A]">
          {loadError}
        </p>
      );
    }
    if (isEmpty) return <TrashEmpty />;
    if (selectedCategory === "folder") {
      return (
        <TrashFolderList
          folders={folders}
          isRestoreMode={isRestoreMode}
          selectedItemIds={selectedItemIds}
          onSelect={handleItemSelect}
          onOpen={(folderId) => navigate(`/archive/folder/${folderId}`)}
        />
      );
    }
    if (selectedCategory === "data") {
      return (
        <TrashDataList
          dataList={dataList}
          isRestoreMode={isRestoreMode}
          selectedItemIds={selectedItemIds}
          onSelect={handleItemSelect}
        />
      );
    }
    return (
      <TrashTeachingMapList
        teachingMaps={teachingMaps}
        isRestoreMode={isRestoreMode}
        selectedItemIds={selectedItemIds}
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

      <PageContainer className="relative z-10 pb-[120px] pt-10">
        <TrashHeader />

        <div className="mt-5 flex items-center justify-between">
          <TrashCategoryTabs
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          {!isRestoreMode && (
            <div className="flex items-center gap-[10px]">
              <TrashSortDropdown
                sortType={sortType}
                onSortChange={handleSortChange}
              />

              {!isEmpty && !loadError && (
                <button
                  type="button"
                  onClick={() => {
                    setIsRestoreMode(true);
                    setSelectedItemIds([]);
                  }}
                  className="flex h-10 w-[147px] items-center justify-center gap-2 rounded-[5px] px-2 py-1 font-suit text-[20px] font-medium leading-[30px] tracking-[-0.6px] text-[#D0D0D2] hover:bg-white/5"
                >
                  <img
                    src="/icon/flip-left.svg"
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
              selectedCount={selectedItemIds.length}
              onToggleSelection={handleToggleSelection}
              onRestore={handleSelectedRestore}
              onCancel={() => {
                setIsRestoreMode(false);
                setSelectedItemIds([]);
              }}
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
            currentPage={currentPage}
            totalPages={Math.max(1, pageState.totalPages)}
            onPageChange={handlePageChange}
          />
        )}
      </PageContainer>

      {toastMessage && <Toast message={toastMessage} />}
    </main>
  );
};

export default TrashContent;