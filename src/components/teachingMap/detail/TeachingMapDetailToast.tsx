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
    <div className="fixed bottom-[114px] left-1/2 z-50 w-[calc(100%-32px)] max-w-[361px] -translate-x-1/2 lg:bottom-[48px] lg:w-auto lg:max-w-none">
      <div className="flex min-h-[41px] items-center justify-between gap-[10px] rounded-[5px] bg-[#F5F2FF] p-[10px] shadow-[0_8px_30px_rgba(0,0,0,0.3)] lg:min-w-[360px] lg:gap-[24px] lg:rounded-[10px] lg:border lg:border-[#C1AEFF] lg:bg-[#13151F] lg:px-[24px] lg:py-[18px] lg:shadow-[0_0_50px_0_rgba(145,125,236,0.5)]">
        <p className="min-w-0 truncate text-[14px] font-normal leading-[150%] tracking-[-0.35px] text-[#2B2C35] lg:text-[20px] lg:font-medium lg:leading-[30px] lg:tracking-normal lg:text-[#FAFAFA]">
          {message}
        </p>

        <button
          type="button"
          aria-label="알림 닫기"
          onClick={onClose}
          className="shrink-0 text-[18px] leading-none text-[#8D8E94] lg:text-[20px] lg:text-[#A1A1A5]"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default TeachingMapDetailToast;
