import { useNavigate } from "react-router-dom";

import NotificationPopover from "../notification/NotificationPopover";

import type { Notification } from "../notification/NotificationList";

const notificationMessage =
  "잠시 멈췄던 티칭맵 제목 60자 제한입...";

const dummyNotifications: Notification[] = [
  {
    id: 1,
    type: "short-cut",
    message: notificationMessage,
    createdAt: "10시간 전",
    isRead: false,
  },
  {
    id: 2,
    type: "short-cut",
    message: notificationMessage,
    createdAt: "10시간 전",
    isRead: false,
  },
  {
    id: 3,
    type: "deep-dive",
    message: notificationMessage,
    createdAt: "10시간 전",
    isRead: true,
  },
  {
    id: 4,
    type: "deep-dive",
    message: notificationMessage,
    createdAt: "10시간 전",
    isRead: true,
  },
  {
    id: 5,
    type: "deep-dive",
    message: notificationMessage,
    createdAt: "10시간 전",
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

  const handleNotificationClick = (
    notificationId: number,
  ) => {
    console.log(
      "선택한 알림:",
      notificationId,
    );
  };

  const handleViewAll = () => {
    navigate("/notifications");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleMyPageClick = () => {
    navigate("/mypage");
  };

  return (
    <header className="relative flex h-16 items-center justify-between bg-[#090713] px-8 shadow-[0_0_80px_rgba(145,125,236,0.1)]">
      {showMenuIcon ? (
        <button
          type="button"
          aria-label="메뉴 열기"
          onClick={onMenuClick}
          className={[
            "flex size-10 items-center justify-center overflow-hidden hover:opacity-80",
            insetMenu
              ? "ml-16"
              : "",
          ].join(" ")}
        >
          <img
            src="/MenuDefault.svg"
            alt=""
            className="size-6"
          />
        </button>
      ) : (
        <div
          className="size-10"
          aria-hidden="true"
        />
      )}

      <button
        type="button"
        aria-label="홈으로 이동"
        onClick={handleLogoClick}
        className="absolute left-1/2 -translate-x-1/2 transition hover:opacity-80"
      >
        <img
          src="/Logo.png"
          alt="TeachING Logo"
          className="h-9 w-auto"
        />
      </button>

      {showRightIcons ? (
        <div className="flex w-28 items-center justify-center gap-0">
          <NotificationPopover
            notifications={
              dummyNotifications
            }
            onItemClick={
              handleNotificationClick
            }
            onViewAll={
              handleViewAll
            }
            trigger={
              <button
                type="button"
                aria-label="알림"
                className="flex size-10 items-center justify-center overflow-hidden hover:opacity-80"
              >
                <img
                  src="/Alarm.svg"
                  alt=""
                  className="size-6 object-contain"
                />
              </button>
            }
          />

          <button
            type="button"
            aria-label="마이페이지"
            onClick={
              handleMyPageClick
            }
            className="flex size-10 items-center justify-center overflow-hidden hover:opacity-80"
          >
            <img
              src="/Mypage.svg"
              alt=""
              className="size-10 object-contain"
            />
          </button>
        </div>
      ) : (
        <div
          className="w-[84px]"
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;