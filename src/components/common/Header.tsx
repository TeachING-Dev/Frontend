import { useNavigate } from "react-router-dom";

import NotificationPopover from "../notification/NotificationPopover";
import type { Notification } from "../notification/NotificationList";

const notificationMessage =
  "\uc7a0\uc2dc \uba48\ucdc4\ub358 \ud2f0\uce6d\ub9f5 \uc81c\ubaa9 60\uc790 \uc81c\ud55c\uc785...";

const dummyNotifications: Notification[] = [
  {
    id: 1,
    type: "short-cut",
    message: notificationMessage,
    createdAt: "10\uc2dc\uac04 \uc804",
    isRead: false,
  },
  {
    id: 2,
    type: "short-cut",
    message: notificationMessage,
    createdAt: "10\uc2dc\uac04 \uc804",
    isRead: false,
  },
  {
    id: 3,
    type: "deep-dive",
    message: notificationMessage,
    createdAt: "10\uc2dc\uac04 \uc804",
    isRead: true,
  },
  {
    id: 4,
    type: "deep-dive",
    message: notificationMessage,
    createdAt: "10\uc2dc\uac04 \uc804",
    isRead: true,
  },
  {
    id: 5,
    type: "deep-dive",
    message: notificationMessage,
    createdAt: "10\uc2dc\uac04 \uc804",
    isRead: true,
  },
];

type HeaderProps = {
  showRightIcons?: boolean;
  insetMenu?: boolean;
  showMenuIcon?: boolean;
  onMenuClick?: () => void;
};

const Header = ({
  showRightIcons = true,
  insetMenu = false,
  showMenuIcon = true,
  onMenuClick,
}: HeaderProps) => {
  const navigate = useNavigate();

  const handleNotificationClick = (notificationId: number) => {
    console.log("\uc120\ud0dd\ud55c \uc54c\ub9bc:", notificationId);
  };

  const handleViewAll = () => {
    navigate("/notifications");
  };

  return (
    <header className="relative flex h-16 items-center justify-between bg-[#090713] px-8 shadow-[0_0_80px_rgba(145,125,236,0.1)]">
      {showMenuIcon ? (
        <button
          type="button"
          aria-label="\uba54\ub274 \uc5f4\uae30"
          onClick={onMenuClick}
          className={`flex size-10 items-center justify-center overflow-hidden hover:opacity-80 ${
            insetMenu ? "ml-16" : ""
          }`}
        >
          <img src="/MenuDefault.svg" alt="" className="size-6" />
        </button>
      ) : (
        <div className="size-10" aria-hidden="true" />
      )}

      <div className="absolute left-1/2 -translate-x-1/2">
        <img src="/Logo.png" alt="TeachING Logo" className="h-9 w-auto" />
      </div>

      {showRightIcons ? (
        <div className="flex w-28 items-center justify-center gap-0">
          <NotificationPopover
            notifications={dummyNotifications}
            onItemClick={handleNotificationClick}
            onViewAll={handleViewAll}
            trigger={
              <button
                type="button"
                aria-label="\uc54c\ub9bc"
                className="flex size-10 items-center justify-center overflow-hidden hover:opacity-80"
              >
                <img src="/Alarm.svg" alt="" className="size-6 object-contain" />
              </button>
            }
          />

          <button
            type="button"
            aria-label="\ub9c8\uc774\ud398\uc774\uc9c0"
            className="flex size-10 items-center justify-center overflow-hidden hover:opacity-80"
          >
            <img src="/Mypage.svg" alt="" className="size-10 object-contain" />
          </button>
        </div>
      ) : (
        <div className="w-[84px]" aria-hidden="true" />
      )}
    </header>
  );
};

export default Header;
