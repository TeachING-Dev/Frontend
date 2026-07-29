/*무료 버전 파일 갯수 제한 모달창*/import { useEffect } from "react";

type FolderLimitModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
};

const FolderLimitModal = ({
  isOpen,
  onClose,
  onSubscribe,
}: FolderLimitModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscapeKey,
      );
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="teaching-map-limit-title"
      className="fixed inset-0 z-[400] flex items-center justify-center bg-[rgba(11,10,24,0.9)]"
    >
      <div className="flex h-[430px] w-[474px] flex-col items-center rounded-[10px] bg-[#0B0A18] px-5 pb-5 pt-[10px] shadow-[0_0_50px_rgba(145,125,236,0.5)]">
        <div className="flex w-full flex-1 flex-col items-center">
          <h2
            id="teaching-map-limit-title"
            className="mt-[10px] whitespace-nowrap text-center font-['SUIT_Variable'] text-[28px] font-bold leading-[150%] tracking-[-0.84px] text-[#E8E8E8]"
          >
            무료 요금제는 티칭맵을 5개까지 만들 수 있어요.
          </h2>

          <p className="mt-[10px] whitespace-pre-line text-center font-['SUIT_Variable'] text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#717379]">
            {"요금제를 업그레이드하고\n무제한으로 티칭맵을 만들어 보세요!"}
          </p>

          <img
            src="/character/SadStar.png"
            alt=""
            aria-hidden="true"
            className="mt-6 h-[190px] w-[190px] object-contain"
          />
        </div>

        <div className="flex w-full gap-[10px]">
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 flex-1 items-center justify-center rounded-[5px] bg-[#42444C] p-[10px] font-['SUIT_Variable'] text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#E8E8E8] transition hover:bg-[#4B4D56]"
          >
            돌아가기
          </button>

          <button
            type="button"
            onClick={onSubscribe}
            className="flex h-11 flex-1 items-center justify-center rounded-[5px] bg-[#917DEC] p-[10px] font-['SUIT_Variable'] text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-white transition hover:bg-[#8068E2]"
          >
            구독하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderLimitModal;