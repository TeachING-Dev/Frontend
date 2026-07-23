import { ChevronRight } from "lucide-react";

type NotificationType = "short-cut" | "deep-dive";

type NotificationItemProps = {
  type: NotificationType;
  title: string;
  createdAt: string;
  isRead?: boolean;
  onClick?: () => void;
};

const notificationTypeLabel: Record<
  NotificationType,
  string
> = {
  "short-cut": "Short-cut",
  "deep-dive": "Deep-dive",
};

const NotificationItem = ({
  type,
  title,
  createdAt,
  isRead = false,
  onClick,
}: NotificationItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-[77px] w-full overflow-hidden items-start gap-[10px] px-[10px] py-[10px] text-left transition hover:bg-[#171722] ${
        isRead ? "opacity-50" : "opacity-100"
      }`}
    >
      {/* 왼쪽 별 아이콘 */}
      <img
        src="/home-logo2.png"
        alt=""
        aria-hidden="true"
        className="mt-[13.5px] size-[40px] shrink-0 object-contain"
      />

      {/* 오른쪽 알림 정보 */}
      <div className="min-w-0 flex-1">
        {/* 상단: 타입 + 화살표 */}
        <div className="flex items-center justify-between">
          <span className="inline-flex h-[24px] w-[67px] items-center justify-center rounded-[2px] border border-[#917DEC] font-[Montserrat] text-[12px] font-normal italic leading-[150%] tracking-[-0.36px] text-[#917DEC]">
            {notificationTypeLabel[type]}
          </span>

          <ChevronRight
            size={24}
            strokeWidth={2}
            className="shrink-0 text-[#917DEC]"
            aria-hidden="true"
          />
        </div>

        {/* 중간: 제목 */}
        <p className="mt-[10px] truncate text-[14px] font-medium leading-[150%] tracking-[-0.42px] text-[#F5F2FF]">
          {title}
        </p>

        {/* 하단: 시간 */}
        <span className="mt-[-8px] block w-full text-right font-[Poppins] text-[10px] font-light italic leading-[150%] tracking-[-0.25px] text-[#717379]">
          {createdAt}
        </span>
      </div>

      {/* 안 읽은 알림 Glow */}
      {!isRead && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 bottom-[-9px]
                    h-[15px] w-[80%]
                    -translate-x-1/2
                    rounded-full
                    bg-[#917DEC]/80
                    blur-xl"
        />
      )}
    </button>
  );
};

export default NotificationItem;