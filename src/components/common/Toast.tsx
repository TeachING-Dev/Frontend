type ToastProps = {
  message: string;
  actionText?: string;
  onAction?: () => void;
  variant?: "default" | "chat";
};

const Toast = ({
  message,
  actionText,
  onAction,
  variant = "default",
}: ToastProps) => {
  if (variant === "chat") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-[78px] left-1/2 z-[200] flex min-h-14 w-fit min-w-[320px] max-w-[min(672px,calc(100%-40px))] -translate-x-1/2 items-center rounded-[5px] bg-violet-50 px-5 py-4 font-['SUIT'] text-sm font-semibold leading-5 text-zinc-900 shadow-[0_0_30px_rgba(145,125,236,0.35)]"
      >
        <p className="whitespace-pre-wrap break-keep">{message}</p>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-[36px] left-1/2 z-[200] box-border flex min-h-[62px] w-max min-w-[768px] -translate-x-1/2 items-center justify-between gap-[10px] whitespace-nowrap rounded-[10px] border border-[#917DEC] bg-[#F5F2FF] px-5 py-4 font-['SUIT'] shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
    >
      <p className="whitespace-nowrap text-[20px] font-medium leading-[150%] tracking-[-0.6px] text-[#2B2C35]">
        {message}
      </p>

      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 text-[20px] font-medium leading-[150%] tracking-[-0.6px] text-[#917DEC] underline transition hover:text-[#8068E2]"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default Toast;