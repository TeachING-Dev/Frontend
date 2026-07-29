import { useEffect } from "react";

type AnalysisFailType =
  | "loginRequired"
  | "analysisFailed"
  | "complexLink";

type AnalysisFailModalProps = {
  type: AnalysisFailType;
  onClose: () => void;
  onPrimaryAction: () => void;
};

const modalContent: Record<
  AnalysisFailType,
  {
    message: string;
    description: string;
  }
> = {
  loginRequired: {
    message: "로그인이 필요한 페이지는 분석할 수 없어요.",
    description: "전체 공개된 URL을 입력해주세요.",
  },

  analysisFailed: {
    message: "잠시 후 다시 시도해주세요.",
    description: "계속 실패하면 관리자에게 문의해주세요.",
  },

  complexLink: {
    message: "AI가 읽기에 너무 복잡한 링크에요.",
    description: "다른 링크를 사용해보시겠어요?",
  },
};

const AnalysisFailModal = ({
  type,
  onClose,
  onPrimaryAction,
}: AnalysisFailModalProps) => {
  const content = modalContent[type];

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#05040D]/80 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="analysis-fail-title"
        onClick={(event) => event.stopPropagation()}
        className="flex h-[340px] w-[352px] flex-col rounded-[10px] bg-[#090713] px-5 pb-5 pt-[30px] shadow-[0_0_80px_rgba(134,111,241,0.35)]"
      >
        {/* 상단 제목 */}
        <h2
          id="analysis-fail-title"
          className="text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#FAFAFA]"
        >
          AI 분석
        </h2>

        {/* 이미지 */}
        <div className="mt-[24px] flex justify-center">
          <img
            src="/character/SadStar.png"
            alt=""
            aria-hidden="true"
            className="h-[90px] w-[90px]"
          />
        </div>

        {/* 메인 문구 */}
        <p className="mt-[20px] text-center text-[18px] font-medium leading-[150%] tracking-[-0.54px] text-[#917DEC]">
          {content.message}
        </p>

        {/* 설명 */}
        <p className="mt-[4px] text-center text-[14px] font-medium leading-[150%] tracking-[-0.42px] text-[#42444C]">
          {content.description}
        </p>

        {/* 버튼 */}
        <div className="mt-auto flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex h-[44px] flex-1 items-center justify-center rounded-[5px] bg-[#42444C] text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#D0D0D2] transition hover:bg-[#353640]"
          >
            이전으로
          </button>

          <button
            type="button"
            onClick={onPrimaryAction}
            className="flex h-[44px] flex-1 items-center justify-center rounded-[5px] bg-[#917DEC] text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#F5F2FF] transition hover:bg-[#A38BFF]"
          >
            다시 시도하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisFailModal;