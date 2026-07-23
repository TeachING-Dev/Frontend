import { useEffect } from "react";

interface TeachingMapDetailToastProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const TeachingMapDetailToast = ({
  isOpen,
  message,
  onClose,
}: TeachingMapDetailToastProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = window.setTimeout(() => {
      onClose();
    }, 2500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-[48px] left-1/2 z-50 -translate-x-1/2">
      <div className="flex min-w-[360px] items-center justify-between gap-[24px] rounded-[10px] border border-[#C1AEFF] bg-[#13151F] px-[24px] py-[18px] shadow-[0_0_50px_0_rgba(145,125,236,0.5)]">
        <p className="text-[20px] font-medium leading-[30px] text-[#FAFAFA]">
          {message}
        </p>

        <button
          type="button"
          aria-label="알림 닫기"
          onClick={onClose}
          className="text-[20px] leading-none text-[#A1A1A5]"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default TeachingMapDetailToast;