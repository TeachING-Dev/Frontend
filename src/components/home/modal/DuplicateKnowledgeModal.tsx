import { useEffect } from "react";
import { X } from "lucide-react";

type DuplicateKnowledgeModalProps = {
  onClose: () => void;
  onViewKnowledge: () => void;
  onAnalyzeAgain: () => void;
};

const DuplicateKnowledgeModal = ({
  onClose,
  onViewKnowledge,
  onAnalyzeAgain,
}: DuplicateKnowledgeModalProps) => {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
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
        aria-labelledby="duplicate-knowledge-title"
        onClick={(e) => e.stopPropagation()}
        className="flex w-[315px] flex-col rounded-[10px] bg-[#090713] px-[10px] pb-5 pt-[10px] shadow-[0_0_50px_rgba(145,125,236,0.5)] lg:h-[411px] lg:w-[451px] lg:rounded-[12px] lg:px-5 lg:shadow-[0_0_80px_rgba(134,111,241,0.35)]"
      >
        {/* 닫기 버튼 */}
        <div className="mb-[5px] flex justify-end lg:mb-[10px]">
          <button
            type="button"
            onClick={onClose}
            aria-label="모달 닫기"
            className="flex h-6 w-6 items-center justify-center rounded-md text-white transition hover:bg-white/10 lg:h-9 lg:w-8"
          >
            <X className="h-6 w-6 lg:h-9 lg:w-9" strokeWidth={2.2} />
          </button>
        </div>

        {/* 제목 */}
        <h2
          id="duplicate-knowledge-title"
          className="mb-[5px] text-center text-[16px] font-semibold leading-[150%] tracking-[-0.4px] text-[#FAFAFA] lg:mb-2 lg:text-[24px] lg:tracking-[-0.72px]"
        >
          이미 보관함에 있는 지식이에요.
        </h2>

        {/* 설명 */}
        <p className="text-center text-[12px] font-medium leading-[135%] tracking-[-0.3px] text-[#717379] lg:text-[16px] lg:leading-[150%] lg:tracking-[-0.48px]">
          동일한 링크로 분석된 결과가 이미 존재합니다.
          <br />
          기존 내용을 확인할까요?
        </p>

        {/* 이미지 */}
        <div className="mt-[10px] flex justify-center lg:mt-4">
          <img
            src="/character/SadStar.png"
            alt=""
            aria-hidden="true"
            className="h-[112px] w-[112px] lg:h-[160px] lg:w-[160px]"
          />
        </div>

        {/* 버튼 */}
        <div className="mt-[10px] flex gap-[10px] lg:mt-auto lg:gap-3">
          <button
            onClick={onViewKnowledge}
            className="flex h-[35px] flex-1 items-center justify-center rounded-[5px] bg-[#42444C] text-[14px] font-medium leading-[150%] tracking-[-0.48px] text-[#D0D0D2] transition hover:bg-[#353640] lg:h-[44px] lg:text-[16px]"
          >
            기존 내용 보기
          </button>

          <button
            onClick={onAnalyzeAgain}
            className="flex h-[35px] flex-1 items-center justify-center rounded-[5px] bg-[#917DEC] text-[14px] font-medium leading-[150%] tracking-[-0.48px] text-[#F5F2FF] transition hover:bg-[#A38BFF] lg:h-[44px] lg:text-[16px]"
          >
            새로 분석하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuplicateKnowledgeModal;
