import type { ReactNode } from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronRight } from "lucide-react";

import type { Notification } from "../../apis/notification";
import NotificationList from "./NotificationList";

type NotificationPopoverProps = {
  trigger: ReactNode;
  notifications: Notification[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onViewAll?: () => void;
  onItemClick?: (id: number) => void;
};

const NotificationPopover = ({
  trigger,
  notifications,
  open,
  onOpenChange,
  onViewAll,
  onItemClick,
}: NotificationPopoverProps) => {
  const sortedNotifications = [
    ...notifications,
  ].sort(
    (a, b) =>
      Number(a.isRead) -
      Number(b.isRead),
  );

  return (
    <Popover.Root
      open={open}
      onOpenChange={onOpenChange}
    >
      <Popover.Trigger asChild>
        {trigger}
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="end"
          sideOffset={6}
          collisionPadding={20}
          onClick={(event) =>
            event.stopPropagation()
          }
          className="z-50 min-h-[503px] w-[384px] rounded-[5px] bg-[#13151F] shadow-[0_0_40px_rgba(134,111,241,0.35)] outline-none"
        >
          <div className="flex min-h-[503px] w-[384px] flex-col px-[20px] pb-[20px] pt-[10px]">
            {/* 헤더 */}
            <div className="flex items-center justify-between px-[10px] pb-[15px] pt-[10px]">
              <h2 className="text-[20px] font-semibold leading-[140%] tracking-[-0.6px] text-[#F5F2FF]">
                알림
              </h2>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onViewAll?.();
                }}
                className="flex items-center gap-1 text-[14px] font-medium leading-[150%] tracking-[-0.42px] text-[#917DEC] transition hover:opacity-80"
              >
                전체보기

                <ChevronRight
                  size={16}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* 구분선 */}
            <div className="h-px shrink-0 bg-[#2B2C35]" />

            {/* 알림 목록 */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              <NotificationList
                notifications={
                  sortedNotifications
                }
                onItemClick={onItemClick}
              />
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default NotificationPopover;