interface TeachingMapToastProps {
  isOpen: boolean;
  message: string;
  onUndo: () => void;
}

const TeachingMapToast = ({
  isOpen,
  message,
  onUndo,
}: TeachingMapToastProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "fixed bottom-[36px] left-1/2 z-[60]",
        "flex w-[768px] -translate-x-1/2 items-center justify-between",
        "rounded-[10px] border border-[#917DEC]",
        "bg-[#F5F2FF] px-5 py-4",
        "font-['SUIT'] shadow-[0_0_20px_rgba(145,125,236,0.2)]",
      ].join(" ")}
    >
      <p className="text-[20px] font-medium leading-[30px] tracking-[-0.6px] text-[#2B2C35]">
        {message}
      </p>

      <button
        type="button"
        onClick={onUndo}
        className={[
          "text-[20px] font-medium leading-[30px]",
          "tracking-[-0.6px] text-[#917DEC]",
          "underline underline-offset-2",
        ].join(" ")}
      >
        실행취소
      </button>
    </div>
  );
};

export default TeachingMapToast;