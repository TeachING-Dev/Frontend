import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import TrashCategoryTabs from "./TrashCategoryTabs";
import TrashDataList from "./TrashDataList";
import TrashEmpty from "./TrashEmpty";
import TrashFolderList from "./TrashFolderList";
import TrashHeader from "./TrashHeader";
import TrashSortDropdown from "./TrashSortDropdown";
import TrashTeachingMapList from "./TrashTeachingMapList";

import type {
  TrashCategory,
  TrashDataItem,
  TrashFolderItem,
  TrashSortType,
  TrashTeachingMapItem,
} from "./trashTypes";

const initialFolders: TrashFolderItem[] = [
  {
    id: 1,
    name: "폴더명",
    itemCount: 0,
    deletedAt: "2026-01-01",
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
    deletedAt: "2026-05-10",
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

const initialTeachingMaps: TrashTeachingMapItem[] =
  [
    {
      id: 1,
      title: "로드맵 제목",
      description:
        "로드맵에 대한 상세설명들 몇자까지 처음에 보이나요? 로드맵에 대한 상세설명들 몇자까지 처음에 보이나요?",
      currentStep: 4,
      totalStep: 8,
      thumbnails: [
        "/youtube-app-icon.png",
        "/youtube-app-icon.png",
        "/youtube-app-icon.png",
        "/youtube-app-icon.png",
        "/youtube-app-icon.png",
        "/youtube-app-icon.png",
      ],
      deletedAt: "2026-07-20",
    },
    {
      id: 2,
      title: "백엔드 개발자 티칭맵",
      description:
        "Node.js와 데이터베이스를 중심으로 구성된 백엔드 학습 티칭맵입니다.",
      currentStep: 4,
      totalStep: 8,
      thumbnails: [
        "/youtube-app-icon.png",
        "/youtube-app-icon.png",
        "/youtube-app-icon.png",
      ],
      deletedAt: "2026-06-21",
    },
  ];

const getDeletedTime = (deletedAt: string) =>
  new Date(deletedAt).getTime();

const TrashContent = () => {
  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState<TrashCategory>("folder");

  const [sortType, setSortType] =
    useState<TrashSortType>("latest");

  const [folders, setFolders] =
    useState<TrashFolderItem[]>(
      initialFolders,
    );

  const [dataList, setDataList] =
    useState<TrashDataItem[]>(
      initialDataList,
    );

  const [teachingMaps, setTeachingMaps] =
    useState<TrashTeachingMapItem[]>(
      initialTeachingMaps,
    );

  const [toastMessage, setToastMessage] =
    useState("");

  const toastTimerRef =
    useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(
          toastTimerRef.current,
        );
      }
    };
  }, []);

  const sortedFolders = useMemo(() => {
    return [...folders].sort(
      (firstFolder, secondFolder) => {
        const firstTime = getDeletedTime(
          firstFolder.deletedAt,
        );

        const secondTime = getDeletedTime(
          secondFolder.deletedAt,
        );

        return sortType === "latest"
          ? secondTime - firstTime
          : firstTime - secondTime;
      },
    );
  }, [folders, sortType]);

  const sortedDataList = useMemo(() => {
    return [...dataList].sort(
      (firstData, secondData) => {
        const firstTime = getDeletedTime(
          firstData.deletedAt,
        );

        const secondTime = getDeletedTime(
          secondData.deletedAt,
        );

        return sortType === "latest"
          ? secondTime - firstTime
          : firstTime - secondTime;
      },
    );
  }, [dataList, sortType]);

  const sortedTeachingMaps = useMemo(() => {
    return [...teachingMaps].sort(
      (firstMap, secondMap) => {
        const firstTime = getDeletedTime(
          firstMap.deletedAt,
        );

        const secondTime = getDeletedTime(
          secondMap.deletedAt,
        );

        return sortType === "latest"
          ? secondTime - firstTime
          : firstTime - secondTime;
      },
    );
  }, [teachingMaps, sortType]);

  const showToast = (message: string) => {
    setToastMessage(message);

    if (toastTimerRef.current !== null) {
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

  const handleFolderRestore = (
    folderId: number,
  ) => {
    const restoredFolder = folders.find(
      (folder) => folder.id === folderId,
    );

    if (!restoredFolder) {
      return;
    }

    setFolders((previousFolders) =>
      previousFolders.filter(
        (folder) => folder.id !== folderId,
      ),
    );

    showToast(
      "해당 폴더가 복구되었습니다.",
    );
  };

  const handleDataRestore = (
    dataId: number,
  ) => {
    const restoredData = dataList.find(
      (data) => data.id === dataId,
    );

    if (!restoredData) {
      return;
    }

    setDataList((previousDataList) =>
      previousDataList.filter(
        (data) => data.id !== dataId,
      ),
    );

    showToast(
      `해당 자료가 @@폴더로 복구되었습니다.`,
    );
  };

  const handleTeachingMapRestore = (
    teachingMapId: number,
  ) => {
    const restoredTeachingMap =
      teachingMaps.find(
        (teachingMap) =>
          teachingMap.id === teachingMapId,
      );

    if (!restoredTeachingMap) {
      return;
    }

    setTeachingMaps(
      (previousTeachingMaps) =>
        previousTeachingMaps.filter(
          (teachingMap) =>
            teachingMap.id !==
            teachingMapId,
        ),
    );

    showToast(
      "해당 티칭맵이 복구되었습니다.",
    );
  };

  const isEmpty =
    selectedCategory === "folder"
      ? sortedFolders.length === 0
      : selectedCategory === "data"
        ? sortedDataList.length === 0
        : sortedTeachingMaps.length === 0;

  const renderContent = () => {
    if (isEmpty) {
      return <TrashEmpty />;
    }

    if (selectedCategory === "folder") {
      return (
        <TrashFolderList
          folders={sortedFolders}
          onRestore={handleFolderRestore}
        />
      );
    }

    if (selectedCategory === "data") {
      return (
        <TrashDataList
          dataList={sortedDataList}
          onRestore={handleDataRestore}
        />
      );
    }

    return (
      <TrashTeachingMapList
        teachingMaps={sortedTeachingMaps}
        onRestore={
          handleTeachingMapRestore
        }
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
              setSelectedCategory
            }
          />

          <TrashSortDropdown
            sortType={sortType}
            onSortChange={setSortType}
          />
        </div>

        <section
          className={
            isEmpty ? "mt-[180px]" : "mt-10"
          }
        >
          {renderContent()}
        </section>
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