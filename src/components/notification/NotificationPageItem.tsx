import { ChevronRight } from "lucide-react";

type NotificationPageItemProps = {
  title: string;
  message: string;
  createdAt: string;
  isRead?: boolean;
  onClick?: () => void;
};

const NotificationPageItem = ({
  title,
  message,
  createdAt,
  isRead = false,
  onClick,
}: NotificationPageItemProps) => {
  const formatCreatedAt = (date: string) => {
    const createdDate = new Date(date);
    const now = new Date();

    const difference =
      now.getTime() - createdDate.getTime();

    const hours = Math.floor(
      difference / (1000 * 60 * 60),
    );

    const days = Math.floor(
      difference /
        (1000 * 60 * 60 * 24),
    );

    if (hours < 1) {
      return "방금 전";
    }

    if (hours < 24) {
      return `${hours}시간 전`;
    }

    return `${days}일 전`;
  };

  return (
    <div
      className={`relative flex h-[90px] w-full overflow-hidden items-start gap-[20px] px-[10px] transition hover:bg-[#171722] ${
        isRead ? "opacity-50" : "opacity-100"
      }`}
    >
      {/* 왼쪽 별 아이콘 */}
	<img
        src="/logo/logo.png"
        alt=""
        aria-hidden="true"
        className="mt-[10px] size-[70px] shrink-0 object-contain"
      />
      {/* 오른쪽 알림 정보 */}
      <div className="min-w-0 flex-1">
        {/* 상단: 제목 + 화살표 */}
        <div className="flex items-center justify-between">
          <span className="inline-flex h-[40px] min-w-[110px] items-center justify-center rounded-[4px] border border-[#917DEC] px-[12px] font-[SUIT] text-[20px] font-semibold leading-[140%] tracking-[-0.6px] text-[#917DEC]">
            {title}
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
            {formatCreatedAt(createdAt)}
          </span>
        </div>
      </div>

      {/* 안 읽은 알림 Glow */}
      {!isRead && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-9px] left-1/2 h-[15px] w-[90%] -translate-x-1/2 rounded-full bg-[#917DEC]/80 blur-xl"
        />
      )}
    </div>
  );
};

export default NotificationPageItem;