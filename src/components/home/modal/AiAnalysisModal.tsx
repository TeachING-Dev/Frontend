import { useEffect } from "react";
import { X } from "lucide-react";

type AiAnalysisLoadingModalProps = {
  onClose: () => void;
};

const AiAnalysisLoadingModal = ({
  onClose,
}: AiAnalysisLoadingModalProps) => {
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
          px-[20px]
          pb-[30px]
          pt-[20px]
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
        <div className="relative mt-[24px] pt-[65px]">
          {/* 움직이는 별 */}
          <div
            className="
              absolute
              inset-x-[15px]
              top-0
              h-[52px]
              overflow-hidden
            "
          >
            <img
              src="/character/star2.png"
              alt=""
              aria-hidden="true"
              className="
                absolute
                left-0
                top-0
                h-[54px]
                w-[54px]
                object-contain
                animate-[analysis-star_2s_ease-in-out_infinite_alternate]
              "
            />
          </div>

          {/* 로딩 바 배경 */}
          <div
            className="
              mt-[2px]
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
                w-1/3
                rounded-full
                bg-[#917DEC]
                shadow-[0_0_8px_rgba(145,125,236,0.8)]
                animate-[analysis-progress_1.5s_ease-in-out_infinite]
              "
            />
          </div>
        </div>

        {/* 안내 문구 */}
        <p
          className="
            mt-[16px]
            text-center
            text-[18px]
            font-medium
            leading-[150%]
            tracking-[-0.54px]
            text-[#917DEC]
          "
        >
          콘텐츠를 분석하고 있습니다.
          <br />
          잠시만 기다려주세요.
        </p>
      </div>

      <style>
        {`
          @keyframes analysis-star {
            0% {
              left: 0%;
              transform: translateX(0);
            }

            100% {
              left: 100%;
              transform: translateX(-100%);
            }
          }

          @keyframes analysis-progress {
            0% {
              transform: translateX(-100%);
            }

            100% {
              transform: translateX(300%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default AiAnalysisLoadingModal;