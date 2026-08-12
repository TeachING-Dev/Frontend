import { useEffect } from "react";

type TeachingMapCreateToastProps = {
  isOpen: boolean;
  title: string;
  message: string;
  duration?: number;
  onClose: () => void;
};

const TeachingMapCreateToast = ({
  isOpen,
  title,
  message,
  duration = 3000,
  onClose,
}: TeachingMapCreateToastProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = window.setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    isOpen,
    duration,
    onClose,
  ]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-[114px] left-1/2 z-[350] flex min-h-[41px] w-[calc(100%-32px)] max-w-[361px] -translate-x-1/2 items-center justify-between gap-[10px] rounded-[5px] bg-[#F5F2FF] p-[10px] shadow-[0_8px_30px_rgba(0,0,0,0.3)] lg:bottom-[44px] lg:w-max lg:max-w-none lg:min-w-[768px] lg:whitespace-nowrap lg:rounded-[10px] lg:border lg:border-[#917DEC] lg:px-5 lg:py-4"
    >
      <p className="min-w-0 truncate font-['SUIT_Variable'] text-[14px] font-normal leading-[150%] tracking-[-0.35px] text-[#2B2C35] lg:shrink-0 lg:text-[20px] lg:font-medium lg:leading-[30px] lg:tracking-[-0.6px]">
        {title}
      </p>

      <p className="shrink-0 text-right font-['SUIT_Variable'] text-[14px] font-normal leading-[150%] tracking-[-0.35px] text-[#917DEC] lg:text-[20px] lg:font-medium lg:leading-[30px] lg:tracking-[-0.6px]">
        {message}
      </p>
    </div>
  );
};

export default TeachingMapCreateToast;
