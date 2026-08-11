import {
  useEffect,
  useState,
} from "react";
import { X } from "lucide-react";

type AiAnalysisLoadingModalProps = {
  onClose: () => void;
  isComplete?: boolean;
};

const AiAnalysisLoadingModal = ({
  onClose,
  isComplete = false,
}: AiAnalysisLoadingModalProps) => {
  const [progress, setProgress] =
    useState(0);

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [onClose]);
  
  useEffect(() => {
  const timer = setInterval(() => {
    setProgress((prev) => {
      if (isComplete) {
        return 100;
      }

      if (prev >= 99) {
        return 99;
      }

      if (prev < 50) {
        return Math.min(prev + 3, 99);
      }

      if (prev < 80) {
        return Math.min(prev + 2, 99);
      }

      return Math.min(prev + 1, 99);
    });
  }, 300);

  return () => {
    clearInterval(timer);
  };
}, [isComplete]);

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-[#05040D]/80
        backdrop-blur-[2px]
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-analysis-title"
    >
      <div
        className="
          relative
          w-[352px]
          rounded-[10px]
          bg-[#090713]
          p-[20px]
          shadow-[0_0_80px_rgba(134,111,241,0.35)]
        "
      >
        {/* 상단 */}
        <div className="flex items-center justify-between">
          <h2
            id="ai-analysis-title"
            className="
              text-[20px]
              font-semibold
              leading-[150%]
              tracking-[-0.6px]
              text-[#FAFAFA]
            "
          >
            AI 분석
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="AI 분석 모달 닫기"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              text-[#FAFAFA]
              transition
              hover:text-[#C1AEFF]
            "
          >
            <X
              size={28}
              strokeWidth={2}
            />
          </button>
        </div>

        {/* 별 + 로딩 바 */}
        <div className="relative mt-[10px] pt-[65px]">
          {/* 진행률을 따라가는 별 */}
          <div
            className="
              absolute
              inset-x-0
              top-0
              h-[54px]
            "
          >
            <img
              src="/character/star2.png"
              alt=""
              aria-hidden="true"
              className="
                absolute
                top-0
                h-[54px]
                w-[54px]
                object-contain
                transition-[left]
                duration-300
                ease-out
              "
              style={{
                left: `calc(${progress}% - ${
                  progress * 0.54
                }px)`,
              }}
            />
          </div>

          {/* 로딩 바 배경 */}
          <div
            className="
              mt-[2px]
              p-[0px]
              h-[7px]
              w-full
              overflow-hidden
              rounded-full
              bg-[#2B2C35]
            "
          >
            <div
              className="
                h-full
                rounded-full
                bg-[#917DEC]
                shadow-[0_0_8px_rgba(145,125,236,0.8)]
                transition-[width]
                duration-300
                ease-out
              "
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* 안내 문구 */}
        <p
          className="
            mt-[10px]
            text-center
            text-[13px]
            font-medium
            leading-[150%]
            tracking-[-0.325px]
            text-[#917DEC]
          "
        >
          콘텐츠를 분석하고 있습니다.
          <br />
          잠시만 기다려주세요.
        </p>
      </div>
    </div>
  );
};

export default AiAnalysisLoadingModal;
