type ToastProps = {
  message: string;
  actionText?: string;
  onAction?: () => void;
  variant?: "default" | "chat" | "compact";
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

  if (variant === "compact") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-[114px] left-1/2 z-[200] flex h-[41px] w-[361px] -translate-x-1/2 items-center justify-center rounded-[5px] bg-[#F5F2FF] font-['SUIT'] text-[14px] font-normal leading-[150%] text-[#2B2C35] shadow-[0_0_30px_rgba(145,125,236,0.35)]"
      >
        {message}
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-[114px] left-1/2 z-[200] box-border flex min-h-[41px] w-[calc(100%-32px)] max-w-[361px] -translate-x-1/2 items-center justify-between gap-[10px] whitespace-nowrap rounded-[5px] bg-[#F5F2FF] p-[10px] font-['SUIT'] shadow-[0_8px_30px_rgba(0,0,0,0.3)] lg:bottom-[36px] lg:min-h-[62px] lg:w-max lg:max-w-none lg:min-w-[768px] lg:rounded-[10px] lg:border lg:border-[#917DEC] lg:px-5 lg:py-4"
    >
      <p className="min-w-0 truncate whitespace-nowrap text-[14px] font-normal leading-[150%] tracking-[-0.35px] text-[#2B2C35] lg:text-[20px] lg:font-medium lg:tracking-[-0.6px]">
        {message}
      </p>

      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 text-[14px] font-normal leading-[150%] tracking-[-0.35px] text-[#917DEC] underline transition hover:text-[#8068E2] lg:text-[20px] lg:font-medium lg:tracking-[-0.6px]"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default Toast;
