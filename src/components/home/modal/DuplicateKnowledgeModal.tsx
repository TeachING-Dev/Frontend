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
        className="flex h-[430px] w-[449px] flex-col rounded-[12px] bg-[#090713] px-5 pb-5 pt-[10px] shadow-[0_0_80px_rgba(134,111,241,0.35)]"
      >
        {/* 닫기 버튼 */}
        <div className="mb-[10px] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="모달 닫기"
            className="flex h-9 w-8 items-center justify-center rounded-md text-white transition hover:bg-white/10"
          >
            <X size={36} strokeWidth={2.2} />
          </button>
        </div>

        {/* 제목 */}
        <h2
          id="duplicate-knowledge-title"
          className="mb-2 text-center text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#FAFAFA]"
        >
          이미 보관함에 있는 지식이에요.
        </h2>

        {/* 설명 */}
        <p className="text-center text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#717379]">
          동일한 링크로 분석된 결과가 이미 존재합니다.
          <br />
          기존 내용을 확인할까요?
        </p>

        {/* 이미지 */}
        <div className="mt-4 flex justify-center">
          <img
            src="/SadStar.png"
            alt=""
            aria-hidden="true"
            className="h-[160px] w-[160px]"
          />
        </div>

        {/* 버튼 */}
        <div className="mt-auto flex gap-3">
          <button
            onClick={onViewKnowledge}
            className="flex h-[44px] flex-1 items-center justify-center rounded-[5px] bg-[#42444C] text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#D0D0D2] transition hover:bg-[#353640]"
          >
            기존 내용 보기
          </button>

          <button
            onClick={onAnalyzeAgain}
            className="flex h-[44px] flex-1 items-center justify-center rounded-[5px] bg-[#917DEC] text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#F5F2FF] transition hover:bg-[#A38BFF]"
          >
            새로 분석하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuplicateKnowledgeModal;