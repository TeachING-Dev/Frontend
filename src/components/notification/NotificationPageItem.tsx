import { ChevronRight } from "lucide-react";

type NotificationType = "short-cut" | "deep-dive";

type NotificationPageItemProps = {
  type: NotificationType;
  message: string;
  createdAt: string;
  isRead?: boolean;
  onClick?: () => void;
};

const notificationTypeLabel: Record<
  NotificationType,
  string
> = {
  "short-cut": "Short-Cut",
  "deep-dive": "Deep-Dive",
};

const NotificationPageItem = ({
  type,
  message,
  createdAt,
  isRead = false,
  onClick,
}: NotificationPageItemProps) => {
  return (
    <div
      className={`relative flex h-[90px] w-full overflow-hidden items-start gap-[20px] px-[10px] transition hover:bg-[#171722] ${
        isRead ? "opacity-50" : "opacity-100"
      }`}
    >
      {/* 왼쪽 별 아이콘 */}
      <img
        src="/home-logo2.png"
        alt=""
        aria-hidden="true"
        className="mt-[10px] size-[70px] shrink-0 object-contain"
      />

      {/* 오른쪽 알림 정보 */}
      <div className="min-w-0 flex-1">
        {/* 상단: 타입 + 화살표 */}
        <div className="flex items-center justify-between">
          <span className="inline-flex h-[40px] w-[110px] items-center justify-center rounded-[4px] border border-[#917DEC] font-[SUIT] text-[20px] font-semibold leading-[140%] tracking-[-0.6px] text-[#917DEC]">
            {notificationTypeLabel[type]}
          </span>

          <button
            type="button"
            onClick={onClick}
            aria-label="알림 상세 보기"
            className="-mr-[10px] shrink-0"
          >
            <ChevronRight
              size={40}
              strokeWidth={1}
              className="text-[#917DEC]"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* 내용 + 시간 */}
        <div className="mt-[10px] flex items-center justify-between gap-4">
          <p className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-[SUIT] text-[18px] font-medium leading-[150%] tracking-[-0.54px] text-[#F5F2FF]">
            {message}
          </p>

          <span className="shrink-0 text-center font-[Poppins] text-[16px] font-normal leading-[150%] tracking-[-0.4px] text-[#717379]">
            {createdAt}
          </span>
        </div>
      </div>

      {/* 안 읽은 알림 Glow */}
      {!isRead && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 bottom-[-9px] h-[15px] w-[90%] -translate-x-1/2 rounded-full bg-[#917DEC]/80 blur-xl"
        />
      )}
    </div>
  );
};

export default NotificationPageItem;