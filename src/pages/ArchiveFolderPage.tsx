import {
  useEffect,
  useState,
} from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import ArchiveDataList, {
  type ArchiveData,
} from "../components/archive/ArchiveDataList";
import EmptyArchiveData from "../components/archive/EmptyArchiveData";
import ArchiveFolderHeader from "../components/archive/ArchiveFolderHeader";
import MoveDataModal from "../components/archive/modal/MoveDataModal";
import Toast from "../components/common/Toast";
import { mockFolders } from "../mocks/folder";

type SelectMode =
  | "move"
  | "trash"
  | null;

const dummyData: ArchiveData[] = [
  {
    id: 1,
    tag: "Node.js",
    date: "2026-05-10",
    title:
      "Node.js의 이벤트 루프(Event Loop) 완벽 이해하기",
    description:
      "Node.js의 핵심 아키텍처인 이벤트 루프의 6가지 단계(Phase)와 동작 메커니즘을 시각적 자료와 함께 상세히 정리한 기술 블로그입니다.",
  },
  {
    id: 2,
    tag: "React",
    date: "2026-05-08",
    title:
      "React의 렌더링(Rendering) 과정과 Virtual DOM",
    description:
      "React가 상태(State) 변경 이후 Virtual DOM을 생성하고 실제 DOM을 효율적으로 업데이트하는 과정을 예제와 함께 설명합니다.",
  },
  {
    id: 3,
    tag: "TypeScript",
    date: "2026-05-05",
    title:
      "TypeScript를 사용하는 이유와 실전 활용법",
    description:
      "JavaScript와 비교하며 타입 시스템의 장점, 인터페이스, 제네릭 등 실제 프로젝트에서 자주 사용하는 기능들을 소개합니다.",
  },
  {
    id: 4,
    tag: "Frontend",
    date: "2026-05-02",
    title:
      "프론트엔드 개발자를 위한 성능 최적화 가이드",
    description:
      "이미지 최적화, 코드 스플리팅, Lazy Loading, 메모이제이션 등 사용자 경험을 높이기 위한 다양한 성능 최적화 기법을 정리했습니다.",
  },
];

const folderOptions = mockFolders.map(
  (folder) => ({
    id: folder.folderId,
    name: folder.folderName,
  }),
);

const ArchiveFolderPage = () => {
  const navigate = useNavigate();

  const { folderId } = useParams<{
    folderId: string;
  }>();

  const parsedFolderId =
    Number(folderId);

  const selectedFolder =
    mockFolders.find(
      (item) =>
        item.folderId ===
        parsedFolderId,
    );

  const [
    editedFolderName,
    setEditedFolderName,
  ] = useState<string | null>(null);

  const [selectMode, setSelectMode] =
    useState<SelectMode>(null);

  const [
    isMoveModalOpen,
    setIsMoveModalOpen,
  ] = useState(false);

  const [
    selectedItemIds,
    setSelectedItemIds,
  ] = useState<number[]>([]);

  const [
    toastMessage,
    setToastMessage,
  ] = useState<string | null>(null);

  const folder = selectedFolder
    ? {
        ...selectedFolder,
        folderName:
          editedFolderName ??
          selectedFolder.folderName,
      }
    : null;

  const isSelectMode =
    selectMode !== null;

  const isAllSelected =
    dummyData.length > 0 &&
    selectedItemIds.length ===
      dummyData.length;

  useEffect(() => {
    if (!toastMessage) return;

    const timer = window.setTimeout(
      () => {
        setToastMessage(null);
      },
      4000,
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, [toastMessage]);

  const handleEditFolderName = (
    newFolderName: string,
  ) => {
    if (!folder) return;

    const trimmedFolderName =
      newFolderName.trim();

    const folderNamePattern =
      /^[가-힣a-zA-Z]{1,10}$/;

    if (
      !folderNamePattern.test(
        trimmedFolderName,
      )
    ) {
      setToastMessage(
        "폴더명은 한글, 영문 10자 이내로 입력해주세요.",
      );
      return;
    }

    const isDuplicate =
      mockFolders.some(
        (item) =>
          item.folderId !==
            folder.folderId &&
          item.folderName.toLowerCase() ===
            trimmedFolderName.toLowerCase(),
      );

    if (isDuplicate) {
      setToastMessage(
        "이미 존재하는 폴더명입니다.",
      );
      return;
    }

    setEditedFolderName(
      trimmedFolderName,
    );

    setToastMessage(
      "폴더명이 수정되었습니다.",
    );
  };

  const handleOpenMoveMode = () => {
    setSelectMode("move");
    setSelectedItemIds([]);
  };

  const handleOpenTrashMode = () => {
    setSelectMode("trash");
    setSelectedItemIds([]);
  };

  const handleCancelSelectMode =
    () => {
      setSelectMode(null);
      setSelectedItemIds([]);
    };

  const handleToggleItem = (
    id: number,
  ) => {
    setSelectedItemIds((prev) =>
      prev.includes(id)
        ? prev.filter(
            (itemId) =>
              itemId !== id,
          )
        : [...prev, id],
    );
  };

  const handleToggleAll = () => {
    if (isAllSelected) {
      setSelectedItemIds([]);
      return;
    }

    setSelectedItemIds(
      dummyData.map(
        (item) => item.id,
      ),
    );
  };

  const handleOpenMoveModal =
    () => {
      if (
        selectedItemIds.length === 0
      ) {
        return;
      }

      setIsMoveModalOpen(true);
    };

  const handleCloseMoveModal =
    () => {
      setIsMoveModalOpen(false);
    };

  const handleMoveData = (
    targetFolderId: number,
  ) => {
    console.log(
      "이동할 자료 ID:",
      selectedItemIds,
    );

    console.log(
      "이동할 폴더 ID:",
      targetFolderId,
    );

    setIsMoveModalOpen(false);
    setSelectMode(null);
    setSelectedItemIds([]);

    setToastMessage(
      "자료가 해당 폴더로 이동되었습니다",
    );
  };

  const handleMoveToTrash = () => {
    if (
      selectedItemIds.length === 0
    ) {
      return;
    }

    console.log(
      "휴지통으로 이동할 자료 ID:",
      selectedItemIds,
    );

    setSelectMode(null);
    setSelectedItemIds([]);

    setToastMessage(
      "자료가 휴지통으로 이동되었습니다",
    );
  };

  const handleSelectAction = () => {
    if (selectMode === "move") {
      handleOpenMoveModal();
      return;
    }

    if (selectMode === "trash") {
      handleMoveToTrash();
    }
  };

  const handleOpenDataPage = (
    id: number,
  ) => {
    navigate(
      `/archive/folder/data/${id}`,
    );
  };

  const handleUndoToast = () => {
    console.log("이동 실행 취소");
    setToastMessage(null);
  };

  if (
    !folderId ||
    !Number.isInteger(
      parsedFolderId,
    ) ||
    parsedFolderId <= 0
  ) {
    return (
      <main className="py-10">
        <div className="mx-auto flex min-h-[540px] w-[1120px] items-center justify-center text-[#D0D0D2]">
          올바르지 않은 폴더 ID예요.
        </div>
      </main>
    );
  }

  if (!folder) {
    return (
      <main className="py-10">
        <div className="mx-auto flex min-h-[540px] w-[1120px] items-center justify-center text-[#D0D0D2]">
          폴더 정보를 찾을 수 없어요.
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="py-10">
        <div className="mx-auto w-[1120px]">
          <ArchiveFolderHeader
            folderName={
              folder.folderName
            }
            savedItemCount={
              folder.materialCount
            }
            onBack={() =>
              navigate("/archive")
            }
            onEditFolderName={
              handleEditFolderName
            }
            onMoveFolder={
              handleOpenMoveMode
            }
            onMoveToTrash={
              handleOpenTrashMode
            }
          />

          {isSelectMode &&
            dummyData.length >
              0 && (
              <div className="mb-5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={
                    handleToggleAll
                  }
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
                    {
                      selectedItemIds.length
                    }
                    개 선택됨
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={
                      handleSelectAction
                    }
                    disabled={
                      selectedItemIds.length ===
                      0
                    }
                    className={`flex h-[40px] w-[147px] items-center justify-center rounded font-['42dot_Sans'] text-[18px] font-semibold leading-[150%] tracking-[-0.6px] text-[#FAFAFA] transition ${
                      selectedItemIds.length >
                      0
                        ? "bg-[#917DEC] hover:bg-[#8068E2]"
                        : "cursor-not-allowed bg-[#42444C]"
                    }`}
                  >
                    {selectMode ===
                    "trash"
                      ? "휴지통으로 이동"
                      : "이동하기"}
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleCancelSelectMode
                    }
                    className="flex h-[40px] w-[147px] items-center justify-center rounded bg-[#42444C] font-['42dot_Sans'] text-[18px] font-semibold leading-[150%] tracking-[-0.6px] text-[#FAFAFA] transition hover:bg-[#50505A]"
                  >
                    취소
                  </button>
                </div>
              </div>
            )}

          <div className="mt-4">
            {dummyData.length ===
            0 ? (
              <EmptyArchiveData />
            ) : (
              <ArchiveDataList
                data={dummyData}
                isMoveMode={
                  isSelectMode
                }
                selectedItemIds={
                  selectedItemIds
                }
                onToggleItem={
                  handleToggleItem
                }
                onItemClick={
                  handleOpenDataPage
                }
              />
            )}
          </div>
        </div>
      </main>

      {isMoveModalOpen && (
        <MoveDataModal
          currentFolderId={
            folder.folderId
          }
          currentFolderName={
            folder.folderName
          }
          folders={
            folderOptions
          }
          onClose={
            handleCloseMoveModal
          }
          onMove={handleMoveData}
        />
      )}

      {toastMessage && (
        <Toast
          message={toastMessage}
          actionText="실행취소"
          onAction={
            handleUndoToast
          }
        />
      )}
    </>
  );
};

export default ArchiveFolderPage;