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
      <div className="h-[338px] w-[361px] max-w-[calc(100vw-28px)] overflow-hidden rounded-[7px] bg-[#0B0A18] p-[14px] pb-[21px] shadow-[0_0_35px_rgba(145,125,236,0.5)] lg:h-[528px] lg:w-[480px] lg:max-w-none lg:rounded-[10px] lg:p-0 lg:shadow-[0_0_50px_rgba(145,125,236,0.5)]">
        <div className="flex h-[27px] items-center justify-between lg:h-[92px] lg:px-8">
          <h2
            id="teaching-map-loading-title"
            className="font-['SUIT_Variable'] text-[18px] font-semibold leading-[27px] tracking-[-0.45px] text-[#E8E8E8] lg:text-[28px] lg:font-bold lg:leading-[42px] lg:tracking-[-0.84px]"
          >
            티칭맵 생성 중
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="티칭맵 생성 취소"
            className="flex h-6 w-6 shrink-0 items-center justify-center lg:h-9 lg:w-9"
          >
            <img
              src="/icon/cancel.png"
              alt=""
              aria-hidden="true"
              className="h-6 w-6 object-contain lg:h-9 lg:w-9"
            />
          </button>
        </div>

        <div className="mt-[7px] h-[186px] w-full lg:mt-0 lg:h-[300px]">
          <img
            src="/character/TeachingmapMakeStar.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col items-center pt-[7px] lg:h-[136px] lg:px-8 lg:pt-3">
          <ProgressBar
            autoPlay
            isActive={isOpen}
            duration={5000}
            ariaLabel="티칭맵 생성 진행률"
            trackClassName="!h-[7px] lg:!h-2"
          />

          <p className="mt-[14px] whitespace-pre-line text-center font-['SUIT_Variable'] text-[14px] font-normal leading-[21px] tracking-[-0.35px] text-[#F5F2FF] lg:mt-6 lg:text-[20px] lg:font-semibold lg:leading-[28px] lg:tracking-[-0.6px]">
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
