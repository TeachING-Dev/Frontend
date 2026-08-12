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
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onClick?.();
      }}
      className={`relative flex h-[75px] w-full cursor-pointer items-start gap-[5px] overflow-hidden px-0 transition hover:bg-[#171722] lg:h-[90px] lg:gap-[20px] lg:px-[10px] ${
        isRead ? "opacity-50" : "opacity-100"
      }`}
    >
      {/* 왼쪽 별 아이콘 */}
	<img
        src="/logo/logo.png"
        alt=""
        aria-hidden="true"
        className="mt-[18px] size-[39px] shrink-0 object-contain lg:mt-[10px] lg:size-[70px]"
      />
      {/* 오른쪽 알림 정보 */}
      <div className="min-w-0 flex-1 pt-[2px] lg:pt-0">
        {/* 상단: 제목 + 화살표 */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center justify-center rounded-[2.22px] border border-[#917DEC] px-[4px] py-[2px] font-[SUIT] text-[12px] font-medium leading-[135%] tracking-[-0.3px] text-[#917DEC] lg:h-[40px] lg:min-w-[110px] lg:rounded-[4px] lg:px-[12px] lg:py-0 lg:text-[20px] lg:font-semibold lg:leading-[140%] lg:tracking-[-0.6px]">
            {title}
          </span>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClick?.();
            }}
            aria-label="알림 상세 보기"
            className="shrink-0 lg:-mr-[10px]"
          >
            <ChevronRight
              className="size-[18px] text-[#917DEC] lg:size-[40px]"
              strokeWidth={1}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* 내용 + 시간 */}
        <div className="mt-[5px] flex h-[38px] items-end justify-between gap-[5px] lg:mt-[10px] lg:h-auto lg:items-center lg:gap-4">
          <p className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap pb-[13px] font-[SUIT] text-[12px] font-medium leading-[135%] tracking-[-0.3px] text-[#F5F2FF] lg:pb-0 lg:text-[18px] lg:leading-[150%] lg:tracking-[-0.54px]">
            {message}
          </p>

          <span className="flex h-[38px] w-[53px] shrink-0 flex-col justify-end pb-[5px] text-center font-[Poppins] text-[8.884px] italic font-normal leading-[150%] tracking-[-0.222px] text-[#717379] opacity-60 lg:block lg:h-auto lg:w-auto lg:pb-0 lg:text-[16px] lg:not-italic lg:tracking-[-0.4px] lg:opacity-100">
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
