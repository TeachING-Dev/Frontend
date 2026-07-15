import { useEffect, useState } from "react";

import ArchiveFolderHeader from "../components/archive/ArchiveFolderHeader";
import ArchiveDataList, {
  type ArchiveData,
} from "../components/archive/ArchiveDataList";
import EmptyArchiveData from "../components/archive/EmptyArchiveData";
import MoveDataModal from "../components/archive/modal/MoveDataModal";
import Toast from "../components/common/Toast";

const dummyData: ArchiveData[] = [
  {
    id: 1,
    tag: "Node.js",
    date: "2026-05-10",
    title: "Node.js의 이벤트 루프(Event Loop) 완벽 이해하기",
    description:
      "Node.js의 핵심 아키텍처인 이벤트 루프의 6가지 단계(Phase)와 동작 메커니즘을 시각적 자료와 함께 상세히 정리한 기술 블로그입니다.",
  },
  {
    id: 2,
    tag: "React",
    date: "2026-05-08",
    title: "React의 렌더링(Rendering) 과정과 Virtual DOM",
    description:
      "React가 상태(State) 변경 이후 Virtual DOM을 생성하고 실제 DOM을 효율적으로 업데이트하는 과정을 예제와 함께 설명합니다.",
  },
  {
    id: 3,
    tag: "TypeScript",
    date: "2026-05-05",
    title: "TypeScript를 사용하는 이유와 실전 활용법",
    description:
      "JavaScript와 비교하며 타입 시스템의 장점, 인터페이스, 제네릭 등 실제 프로젝트에서 자주 사용하는 기능들을 소개합니다.",
  },
  {
    id: 4,
    tag: "Frontend",
    date: "2026-05-02",
    title: "프론트엔드 개발자를 위한 성능 최적화 가이드",
    description:
      "이미지 최적화, 코드 스플리팅, Lazy Loading, 메모이제이션 등 사용자 경험을 높이기 위한 다양한 성능 최적화 기법을 정리했습니다.",
  },
];

const folderOptions = [
  {
    id: 1,
    name: "Backend",
  },
  {
    id: 2,
    name: "Frontend",
  },
  {
    id: 3,
    name: "React",
  },
  {
    id: 4,
    name: "TypeScript",
  },
];

const ArchiveFolderPage = () => {
  const [isMoveMode, setIsMoveMode] = useState(false);

  const [isMoveModalOpen, setIsMoveModalOpen] =
    useState(false);

  const [selectedItemIds, setSelectedItemIds] = useState<
    number[]
  >([]);

  const [showToast, setShowToast] = useState(false);

  const isAllSelected =
    dummyData.length > 0 &&
    selectedItemIds.length === dummyData.length;

  const handleOpenMoveMode = () => {
    setIsMoveMode(true);
    setSelectedItemIds([]);
  };

  const handleCancelMoveMode = () => {
    setIsMoveMode(false);
    setSelectedItemIds([]);
  };

  const handleToggleItem = (id: number) => {
    setSelectedItemIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const handleToggleAll = () => {
    if (isAllSelected) {
      setSelectedItemIds([]);
      return;
    }

    setSelectedItemIds(dummyData.map((item) => item.id));
  };

  const handleOpenMoveModal = () => {
    if (selectedItemIds.length === 0) return;

    setIsMoveModalOpen(true);
  };

  const handleCloseMoveModal = () => {
    setIsMoveModalOpen(false);
  };

  const handleMoveData = (folderId: number) => {
    console.log("이동할 자료 ID:", selectedItemIds);
    console.log("이동할 폴더 ID:", folderId);

    // TODO: 자료 이동 API 연결

    setIsMoveModalOpen(false);
    setIsMoveMode(false);
    setSelectedItemIds([]);
    setShowToast(true);
  };

  useEffect(() => {
    if (!showToast) return;

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [showToast]);

  return (
    <>
      <main className="py-10">
        <div className="mx-auto w-[1120px]">
          <ArchiveFolderHeader
            folderName="Backend"
            savedItemCount={dummyData.length}
            onBack={() => {}}
            onMoveFolder={handleOpenMoveMode}
          />

          {isMoveMode && dummyData.length > 0 && (
            <div className="mb-5 flex items-center justify-between">
              {/* 전체 선택 버튼 */}
              <button
                type="button"
                onClick={handleToggleAll}
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
                  {selectedItemIds.length}개 선택됨
                </span>
              </button>

              {/* 이동 및 취소 버튼 */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleOpenMoveModal}
                  disabled={selectedItemIds.length === 0}
                  className={`flex h-[40px] w-[147px] items-center justify-center rounded font-['42dot_Sans'] text-[20px] font-semibold leading-[150%] tracking-[-0.6px] text-[#FAFAFA] transition ${
                    selectedItemIds.length > 0
                      ? "bg-[#917DEC] hover:bg-[#8068E2]"
                      : "cursor-not-allowed bg-[#42444C]"
                  }`}
                >
                  이동하기
                </button>

                <button
                  type="button"
                  onClick={handleCancelMoveMode}
                  className="flex h-[40px] w-[147px] items-center justify-center rounded bg-[#42444C] font-['42dot_Sans'] text-[20px] font-semibold leading-[150%] tracking-[-0.6px] text-[#FAFAFA] transition hover:bg-[#50505A]"
                >
                  취소
                </button>
              </div>
            </div>
          )}

          <div className="mt-10">
            {dummyData.length === 0 ? (
              <EmptyArchiveData />
            ) : (
              <ArchiveDataList
                data={dummyData}
                isMoveMode={isMoveMode}
                selectedItemIds={selectedItemIds}
                onToggleItem={handleToggleItem}
              />
            )}
          </div>
        </div>
      </main>

      {isMoveModalOpen && (
        <MoveDataModal
          currentFolderId={1}
          currentFolderName="Backend"
          folders={folderOptions}
          onClose={handleCloseMoveModal}
          onMove={handleMoveData}
        />
      )}

      {showToast && (
  <Toast
    message="자료가 해당 폴더로 이동되었습니다"
    actionText="실행취소"
    onAction={() => {
      // TODO: 실행 취소 API 연결
      setShowToast(false);
    }}
  />
      )}
    </>
  );
};

export default ArchiveFolderPage;