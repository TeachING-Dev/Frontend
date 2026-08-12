import { useEffect } from "react";

type DataLimitModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
};

const DataLimitModal = ({
  isOpen,
  onClose,
  onSubscribe,
}: DataLimitModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscapeKey,
      );
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="data-limit-title"
      className="fixed inset-0 z-[400] flex items-center justify-center bg-[rgba(11,10,24,0.9)]"
    >
      <div className="flex w-[315px] flex-col items-start justify-center rounded-[10px] bg-[#0B0A18] px-[10px] py-5 shadow-[0_0_50px_rgba(145,125,236,0.5)] lg:h-[379px] lg:w-[449px] lg:px-5 lg:py-[30px]">
        <div className="flex w-full flex-1 flex-col items-center">
          <h2
            id="data-limit-title"
            className="whitespace-nowrap text-center font-['SUIT_Variable'] text-[16px] font-semibold leading-[150%] tracking-[-0.4px] text-[#E8E8E8] lg:text-[24px] lg:font-bold lg:tracking-[-0.84px]"
          >
            해당 폴더 내 자료 한도에 도달했어요
          </h2>

          <p className="mt-[5px] whitespace-pre-line text-center font-['SUIT_Variable'] text-[12px] font-medium leading-[135%] tracking-[-0.3px] text-[#717379] lg:mt-[10px] lg:text-[16px] lg:leading-[150%] lg:tracking-[-0.48px]">
            {"요금제를 업그레이드하고\n무제한으로 자료를 저장해 보세요!"}
          </p>

          <img
            src="/character/SadStar.png"
            alt=""
            aria-hidden="true"
            className="mt-[10px] h-[112px] w-[112px] object-contain lg:mt-5 lg:h-[140px] lg:w-[140px]"
          />
        </div>

        <div className="mt-[10px] flex w-full gap-[10px] lg:mt-5">
          <button
            type="button"
            onClick={onClose}
            className="flex h-[32px] flex-1 items-center justify-center rounded-[5px] bg-[#42444C] p-[5px] font-['SUIT_Variable'] text-[12px] font-medium leading-[135%] tracking-[-0.3px] text-[#E8E8E8] transition hover:bg-[#4B4D56] lg:h-11 lg:p-[10px] lg:text-[16px] lg:leading-[150%] lg:tracking-[-0.48px]"
          >
            돌아가기
          </button>

          <button
            type="button"
            onClick={onSubscribe}
            className="flex h-[32px] flex-1 items-center justify-center rounded-[5px] bg-[#917DEC] p-[5px] font-['SUIT_Variable'] text-[12px] font-medium leading-[135%] tracking-[-0.3px] text-white transition hover:bg-[#8068E2] lg:h-11 lg:p-[10px] lg:text-[16px] lg:leading-[150%] lg:tracking-[-0.48px]"
          >
            구독하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataLimitModal;
