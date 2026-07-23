import { useEffect, useState } from "react";
import { X } from "lucide-react";

type FolderOption = {
  id: number;
  name: string;
};

type MoveDataModalProps = {
  currentFolderId: number;
  currentFolderName: string;
  folders: FolderOption[];
  onClose: () => void;
  onMove: (folderId: number) => void;
};

const MoveDataModal = ({
  currentFolderId,
  currentFolderName,
  folders,
  onClose,
  onMove,
}: MoveDataModalProps) => {
  const [isDropdownOpen, setIsDropdownOpen] =
    useState(false);

  const [selectedFolderId, setSelectedFolderId] =
    useState(currentFolderId);

  const selectedFolder =
    folders.find(
      (folder) => folder.id === selectedFolderId,
    ) ?? {
      id: currentFolderId,
      name: currentFolderName,
    };

  const handleFolderSelect = (folderId: number) => {
    setSelectedFolderId(folderId);
    setIsDropdownOpen(false);
  };

  const handleMove = () => {
    if (selectedFolderId === currentFolderId) return;

    onMove(selectedFolderId);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05040D]/80 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="move-data-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="h-[195px] w-[329px] rounded-[12px] bg-[#090713] px-[20px] pb-[24px] pt-[20px] shadow-[0_0_80px_rgba(134,111,241,0.35)]"
      >
        {/* 제목 */}
        <div className="mb-[20px] flex items-center justify-between">
          <h2
            id="move-data-modal-title"
            className="px-[8px] font-['42dot_Sans'] text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#E8E8E8]"
          >
            폴더 이동
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="모달 닫기"
            className="mr-[8px] flex h-9 w-9 items-center justify-center rounded text-white transition hover:bg-white/10"
          >
            <X size={30} strokeWidth={2.4} />
          </button>
        </div>

        {/* 드롭다운 */}
        <div className="relative mb-[20px]">
          <button
            type="button"
            onClick={() =>
              setIsDropdownOpen((prev) => !prev)
            }
            aria-expanded={isDropdownOpen}
            className="flex h-[36px] w-full items-center justify-between rounded-[8px] bg-[#FAFAFA] px-[10px] text-left"
          >
            <span className="flex min-w-0 items-center gap-2">
              <img
                src="/Folder.png"
                alt=""
                aria-hidden="true"
                className="h-[18px] w-[18px] shrink-0 object-contain"
              />

              <span className="font-['ABeeZee'] text-[18px] italic text-[#66666D]">
                {selectedFolder.name}
              </span>
            </span>

            <span
              aria-hidden="true"
              className={`h-0 w-0 shrink-0 border-x-[8px] border-t-[10px] border-x-transparent border-t-[#66666D] ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 top-[52px] z-20 w-full overflow-hidden rounded-[8px] bg-[#FAFAFA] shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
              {folders.map((folder) => {
                const isSelected =
                  folder.id === selectedFolderId;

                return (
                  <button
                    key={folder.id}
                    type="button"
                    onClick={() =>
                      handleFolderSelect(folder.id)
                    }
                    className={`flex h-[36px] w-full items-center gap-2 px-[10px] text-left transition ${
                      isSelected
                        ? "bg-[#D1C3FF]"
                        : "hover:bg-[#EAE5FF]"
                    }`}
                  >
                    <img
                      src="/Folder.png"
                      alt=""
                      aria-hidden="true"
                      className="h-[18px] w-[18px] shrink-0 object-contain"
                    />

                    <span className="font-['ABeeZee'] text-[18px] italic text-[#66666D]">
                      {folder.name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 이동 버튼 */}
        <button
          type="button"
          onClick={handleMove}
          disabled={selectedFolderId === currentFolderId}
          className={`flex h-[36px] w-full items-center justify-center font-['ABeeZee'] text-[16px] font-normal leading-[150%] tracking-[-0.48px] text-[#FFF] transition ${
            selectedFolderId === currentFolderId
              ? "cursor-not-allowed rounded-[8px] bg-[#42444C]"
              : "rounded-[8px] bg-[#917DEC] hover:bg-[#917DEC]"
          }`}
        >
          이동
        </button>
      </div>
    </div>
  );
};

export default MoveDataModal;