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
      className="fixed bottom-[44px] left-1/2 z-[350] flex min-h-[62px] w-max min-w-[768px] -translate-x-1/2 items-center justify-between gap-[10px] whitespace-nowrap rounded-[10px] border border-[#917DEC] bg-[#F5F2FF] px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
    >
      <p className="shrink-0 font-['SUIT_Variable'] text-[20px] font-medium leading-[30px] tracking-[-0.6px] text-[#2B2C35]">
        {title}
      </p>

      <p className="text-right font-['SUIT_Variable'] text-[20px] font-medium leading-[30px] tracking-[-0.6px] text-[#917DEC]">
        {message}
      </p>
    </div>
  );
};

export default TeachingMapCreateToast;