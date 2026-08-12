import { useEffect } from "react";

export type AnalysisFailType =
  | "loginRequired"
  | "analysisFailed"
  | "complexLink"
  | "alreadyAnalyzed";

type AnalysisFailModalProps = {
  type: AnalysisFailType;
  onClose: () => void;
  onPrimaryAction: () => void;
  onSecondaryAction?: () => void;
};

const modalContent: Record<
  AnalysisFailType,
  {
    message: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  }
> = {
  loginRequired: {
    message:
      "로그인이 필요한 페이지는 분석할 수 없어요.",
    description:
      "전체 공개된 URL을 입력해주세요.",
    primaryButtonText: "다시 시도하기",
    secondaryButtonText: "이전으로",
  },

  analysisFailed: {
    message:
      "잠시 후 다시 시도해주세요.",
    description:
      "계속 실패하면 관리자에게 문의해주세요.",
    primaryButtonText: "다시 시도하기",
    secondaryButtonText: "이전으로",
  },

  complexLink: {
    message:
      "AI가 읽기에 너무 복잡한 링크에요.",
    description:
      "다른 링크를 사용해보시겠어요?",
    primaryButtonText: "다시 시도하기",
    secondaryButtonText: "이전으로",
  },

  alreadyAnalyzed: {
    message:
      "이미 보관함에 있는 지식이에요.",
    description:
      "동일한 링크로 분석된 결과가 이미 존재합니다.\n기존 내용을 확인할까요?",
    primaryButtonText:
      "새로 분석하기",
    secondaryButtonText:
      "기존 내용 보기",
  },
};

const AnalysisFailModal = ({
  type,
  onClose,
  onPrimaryAction,
  onSecondaryAction,
}: AnalysisFailModalProps) => {
  const content =
    modalContent[type];

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key === "Escape"
      ) {
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

  const handleSecondaryAction =
    () => {
      if (onSecondaryAction) {
        onSecondaryAction();
        return;
      }

      onClose();
    };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#05040D]/80 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="analysis-fail-title"
        onClick={(event) =>
          event.stopPropagation()
        }
        className="
          relative
          flex
          w-[315px]
          flex-col
          rounded-[10px]
          bg-[#090713]
          px-[10px]
          py-5
          shadow-[0_0_50px_rgba(145,125,236,0.5)]
          lg:h-[379px] lg:w-[450px] lg:px-5 lg:py-[30px]
          lg:shadow-[0_0_80px_rgba(134,111,241,0.35)]
        "
      >

        {/* 제목 */}
        <p
          id="analysis-fail-title"
          className="
            text-center
            text-[16px]
            font-semibold
            leading-[150%]
            tracking-[-0.4px]
            text-[#FAFAFA]
            lg:text-[24px] lg:tracking-[-0.72px]
          "
        >
          {content.message}
        </p>

        {/* 설명 */}
        <p
          className="
            mt-[5px]
            whitespace-pre-line
            text-center
            text-[12px]
            font-medium
            leading-[135%]
            tracking-[-0.3px]
            text-[#717379]
            lg:text-[16px] lg:leading-[150%] lg:tracking-[-0.48px]
          "
        >
          {content.description}
        </p>

        {/* 이미지 */}
        <div className="mt-[10px] flex justify-center lg:mt-[18px]">
          <img
            src="/character/SadStar.png"
            alt=""
            aria-hidden="true"
            className="h-[112px] w-[112px] lg:h-[160px] lg:w-[160px]"
          />
        </div>

        {/* 버튼 */}
        <div className="mt-[10px] flex gap-[10px] lg:mt-[30px] lg:gap-3">
          <button
            type="button"
            onClick={
              handleSecondaryAction
            }
            className="
              flex
              h-[35px]
              flex-1
              items-center
              justify-center
              rounded-[5px]
              bg-[#42444C]
              text-[14px]
              font-medium
              leading-[150%]
              tracking-[-0.48px]
              text-[#D0D0D2]
              transition
              hover:bg-[#353640]
              lg:h-[44px] lg:text-[16px]
            "
          >
            {
              content.secondaryButtonText
            }
          </button>

          <button
            type="button"
            onClick={
              onPrimaryAction
            }
            className="
              flex
              h-[35px]
              flex-1
              items-center
              justify-center
              rounded-[5px]
              bg-[#917DEC]
              text-[14px]
              font-medium
              leading-[150%]
              tracking-[-0.48px]
              text-[#F5F2FF]
              transition
              hover:bg-[#A38BFF]
              lg:h-[44px] lg:text-[16px]
            "
          >
            {
              content.primaryButtonText
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisFailModal;
