import { useEffect, useState } from "react";
import { X } from "lucide-react";

import ProgressBar from "../../common/ProgressBar";

type AnalysisStatus = "analyzing" | "completed";

type AiAnalysisLoadingModalProps = {
  onClose: () => void;
  onComplete?: () => void;
  duration?: number;
};

const AiAnalysisLoadingModal = ({
  onClose,
  onComplete,
  duration = 5000,
}: AiAnalysisLoadingModalProps) => {
  const [status, setStatus] =
    useState<AnalysisStatus>("analyzing");

  const [progress, setProgress] = useState(0);

  const isCompleted = status === "completed";

  const handleProgressComplete = () => {
    setProgress(100);
    setStatus("completed");
    onComplete?.();
  };

  useEffect(() => {
    if (isCompleted) {
      return;
    }

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
  }, [isCompleted, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#05040D]/80 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-analysis-title"
    >
      <div className="relative w-[352px] rounded-[10px] bg-[#090713] px-[20px] pb-[30px] pt-[20px] shadow-[0_0_80px_rgba(134,111,241,0.35)]">
        {/* 상단 */}
        <div className="flex items-center justify-between">
          <h2
            id="ai-analysis-title"
            className="text-[20px] font-semibold leading-[150%] tracking-[-0.6px] text-[#FAFAFA]"
          >
            AI 분석
          </h2>

          {!isCompleted && (
            <button
              type="button"
              onClick={onClose}
              aria-label="AI 분석 모달 닫기"
              className="flex h-8 w-8 items-center justify-center text-[#FAFAFA] transition hover:text-[#C1AEFF]"
            >
              <X size={28} strokeWidth={2} />
            </button>
          )}
        </div>

        {/* 별 + 진행 바 */}
        <div className="relative mt-[24px] pt-[65px]">
          {/* 별이 움직일 수 있는 영역 */}
          <div className="absolute inset-x-[15px] top-0 h-[52px]">
            <img
              src="/character/star2.png"
              alt=""
              aria-hidden="true"
              className="absolute top-0 h-[54px] w-[54px] -translate-x-1/2 object-contain"
              style={{
                left: `${progress}%`,
              }}
            />
          </div>

          <ProgressBar
            autoPlay
            isActive={!isCompleted}
            duration={duration}
            ariaLabel="AI 콘텐츠 분석 진행률"
            onProgressChange={setProgress}
            onComplete={handleProgressComplete}
            className="mt-[2px]"
            trackClassName="h-[7px]"
            indicatorClassName="shadow-[0_0_8px_rgba(145,125,236,0.8)]"
          />
        </div>

        {/* 안내 문구 */}
        <p className="mt-[16px] text-center text-[18px] font-medium leading-[150%] tracking-[-0.54px] text-[#917DEC]">
          {isCompleted ? (
            "콘텐츠를 분석 완료했습니다."
          ) : (
            <>
              콘텐츠를 분석하고 있습니다.
              <br />
              잠시만 기다려주세요.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AiAnalysisLoadingModal;