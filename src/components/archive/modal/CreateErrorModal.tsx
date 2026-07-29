import { useEffect } from "react";

type FolderLimitModalProps = {
  onClose: () => void;
  onSubscribe?: () => void;
};

const FolderLimitModal = ({
  onClose,
  onSubscribe,
}: FolderLimitModalProps) => {
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

  const handleSubscribe = () => {
    if (onSubscribe) {
      onSubscribe();
      return;
    }

    // TODO: 구독 페이지 경로에 맞게 수정
    console.log("구독 페이지로 이동");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#05040D]/80 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="folder-limit-title"
        aria-describedby="folder-limit-description"
        onClick={(e) => e.stopPropagation()}
        className="flex h-[379px] w-[449px] flex-col rounded-[12px] bg-[#090713] px-[22px] pb-[21px] pt-[36px] shadow-[0_0_80px_rgba(134,111,241,0.35)]"
      >
        {/* 안내 문구 */}
        <div className="shrink-0 text-center">
          <h2
            id="folder-limit-title"
            className="text-center font-['42dot_Sans'] text-[16px] font-semibold leading-[150%] tracking-[-0.72px] text-[#FAFAFA]"
          >
            무료 요금제는 폴더를 6개까지 만들 수 있어요.
          </h2>

          <p
            id="folder-limit-description"
            className="mt-2 text-[12px] font-medium text-[#666572]"
          >
            요금제를 업그레이드하고 {"\n"}
            무제한으로 폴더를 관리해 보세요!
          </p>
        </div>

        {/* 캐릭터 이미지 */}
        <div className="mt-[0px] flex flex-1 items-start justify-center">
          <img
            src="/character/SadStar.png"
            alt=""
            aria-hidden="true"
            className="h-[160px] w-[160px] object-contain"
          />
        </div>

        {/* 하단 버튼 */}
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-[48px] flex-1 rounded-[5px] bg-[#454650] text-[16px] font-medium text-[#BFC0C8] transition hover:bg-[#51525D]"
          >
            돌아가기
          </button>

          <button
            type="button"
            onClick={handleSubscribe}
            className="h-[48px] flex-1 rounded-[5px] bg-[#917DEC] text-[16px] font-medium text-white transition hover:bg-[#9D87F2]"
          >
            구독하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderLimitModal;