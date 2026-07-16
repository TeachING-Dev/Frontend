type ToastProps = {
  message: string;
  actionText?: string;
  onAction?: () => void;
  variant?: "default" | "chat";
};

const Toast = ({ message, actionText, onAction, variant = "default" }: ToastProps) => {
  if (variant === "chat") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-[78px] left-1/2 z-[200] flex h-14 w-[672px] max-w-[calc(100%-160px)] -translate-x-1/2 items-center rounded-[5px] bg-violet-50 px-5 font-['SUIT_Variable'] text-sm font-semibold leading-5 text-zinc-900 shadow-[0_0_30px_rgba(145,125,236,0.35)]"
      >
        {message}
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-[36px] left-1/2 z-[200] flex h-[68px] w-[768px] -translate-x-1/2 items-center justify-between rounded-[6px] bg-[#FAFAFA] px-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
    >
      <p className="truncate font-['42dot_Sans'] text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#2B2C35]">
        {message}
      </p>

      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="ml-5 shrink-0 font-['42dot_Sans'] text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#917DEC] underline transition hover:text-[#8068E2]"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default Toast;
