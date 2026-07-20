import { useEffect } from "react";

import ProgressBar from "../../common/ProgressBar";

type TeachingMapLoadingModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const TeachingMapLoadingModal = ({
  isOpen,
  onClose,
}: TeachingMapLoadingModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscapeKey = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscapeKey,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscapeKey,
      );
    };
  }, [
    isOpen,
    onClose,
  ]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="teaching-map-loading-title"
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[rgba(11,10,24,0.9)]"
    >
      <div className="h-[528px] w-[480px] overflow-hidden rounded-[10px] bg-[#0B0A18] shadow-[0_0_50px_rgba(145,125,236,0.5)]">
        <div className="flex h-[92px] items-center justify-between px-8">
          <h2
            id="teaching-map-loading-title"
            className="font-['SUIT_Variable'] text-[28px] font-bold leading-[42px] tracking-[-0.84px] text-[#E8E8E8]"
          >
            티칭맵 생성 중
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="티칭맵 생성 취소"
            className="flex h-9 w-9 shrink-0 items-center justify-center"
          >
            <img
              src="/cancel.png"
              alt=""
              aria-hidden="true"
              className="h-9 w-9 object-contain"
            />
          </button>
        </div>

        <div className="h-[300px] w-full">
          <img
            src="/TeachingmapMakeStar.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex h-[136px] flex-col items-center px-8 pt-3">
          <ProgressBar
            autoPlay
            isActive={isOpen}
            duration={5000}
            ariaLabel="티칭맵 생성 진행률"
          />

          <p className="mt-6 whitespace-pre-line text-center font-['SUIT_Variable'] text-[20px] font-semibold leading-[28px] tracking-[-0.6px] text-[#F5F2FF]">
            {
              "AI 선생님이 최적의 경로를 분석 중입니다...\n잠시만 기다려주세요."
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeachingMapLoadingModal;