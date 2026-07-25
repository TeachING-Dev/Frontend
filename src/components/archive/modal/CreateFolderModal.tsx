import { useEffect, useState } from "react";
import { CircleAlert, X } from "lucide-react";

type CreateFolderModalProps = {
  onClose: () => void;
  onCreate: (folderName: string) => Promise<void>;
};

const CreateFolderModal = ({
  onClose,
  onCreate,
}: CreateFolderModalProps) => {
  const [folderName, setFolderName] = useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [errorMessage, setErrorMessage] =
    useState("");

  const trimmedFolderName = folderName.trim();

  const isValid =
    trimmedFolderName.length > 0 &&
    trimmedFolderName.length <= 10;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
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
  }, [onClose, isSubmitting]);

  const handleCreate = async () => {
    if (!isValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await onCreate(trimmedFolderName);

      setFolderName("");
      onClose();
    } catch (error) {
      console.error("폴더 생성 실패:", error);

      setErrorMessage(
        "폴더를 생성하지 못했어요. 다시 시도해 주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#05040D]/80 backdrop-blur-[2px]"
      onClick={() => {
        if (!isSubmitting) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-folder-title"
        onClick={(event) => event.stopPropagation()}
        className="flex h-[306px] w-[304px] flex-col rounded-[12px] bg-[#090713] px-5 pb-6 pt-3 shadow-[0_0_80px_rgba(134,111,241,0.35)]"
      >
        <div className="flex h-12 shrink-0 items-center justify-between">
          <h2
            id="create-folder-title"
            className="text-[24px] leading-none text-white"
          >
            새로운 폴더
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="모달 닫기"
            className="flex h-9 w-8 items-center justify-center rounded-md text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={30} strokeWidth={2.2} />
          </button>
        </div>

        <div className="mt-6 flex shrink-0 justify-center">
          <img
            src="/Folder.png"
            alt=""
            aria-hidden="true"
            className="h-[64px] w-[64px]"
          />
        </div>

        <div className="mt-4 shrink-0">
          <input
            type="text"
            value={folderName}
            maxLength={10}
            disabled={isSubmitting}
            onChange={(event) => {
              setFolderName(event.target.value);
              setErrorMessage("");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                void handleCreate();
              }
            }}
            placeholder="새 폴더명"
            autoFocus
            className="h-[40px] w-full rounded-[10px] border border-[#4A4A5A] bg-[#13131F] px-3 text-[16px] text-white outline-none transition placeholder:text-[#5A5966] focus:border-[#9F82FF] disabled:cursor-not-allowed disabled:opacity-60"
          />

          {errorMessage ? (
            <div className="mt-1 flex items-center gap-1 text-[12px] text-red-400">
              <CircleAlert
                size={14}
                strokeWidth={1.8}
                className="shrink-0"
              />

              <span>{errorMessage}</span>
            </div>
          ) : (
            <div className="mt-1 flex items-center gap-1 text-[12px] text-[#686675]">
              <CircleAlert
                size={14}
                strokeWidth={1.8}
                className="shrink-0"
              />

              <span className="whitespace-nowrap">
                한글, 영문만 입력 가능합니다. (최대
                10자)
              </span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => void handleCreate()}
          disabled={!isValid || isSubmitting}
          className="mt-auto h-[40px] w-full shrink-0 rounded-[5px] bg-[#917DEC] text-[16px] font-medium text-white transition hover:bg-[#866FF1] disabled:cursor-not-allowed disabled:bg-[#42444C] disabled:hover:bg-[#42444C]"
        >
          {isSubmitting ? "생성 중..." : "생성"}
        </button>
      </div>
    </div>
  );
};

export default CreateFolderModal;