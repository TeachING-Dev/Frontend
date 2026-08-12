import {
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  getNotifications,
  getNotificationSummary,
  readNotification,
  type Notification,
} from "../../apis/notification";
import NotificationPopover from "../notification/NotificationPopover";

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
  const location = useLocation();
  const hideMobileNotification = location.pathname.startsWith("/mypage");

  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [hasUnread, setHasUnread] =
    useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const [
          notificationData,
          summaryData,
        ] = await Promise.all([
          getNotifications(5),
          getNotificationSummary(),
        ]);

        setNotifications(
          notificationData,
        );

        setHasUnread(
          summaryData.hasUnread,
        );
      } catch (error) {
        console.error(
          "알림 목록 조회 실패:",
          error,
        );
      }
    };

    fetchNotifications();
  }, []);

const handleNotificationClick = async (
  notificationId: number,
) => {
  try {
    const notification =
      notifications.find(
        (item) =>
          item.notificationId ===
          notificationId,
      );

    if (!notification) {
      return;
    }

    await readNotification(
      notificationId,
    );

    setNotifications((prev) =>
      prev.map((item) =>
        item.notificationId ===
        notificationId
          ? {
              ...item,
              isRead: true,
            }
          : item,
      ),
    );

    const summary =
      await getNotificationSummary();

    setHasUnread(
      summary.hasUnread,
    );

    if (
      notification.targetType ===
      "TEACHING_MAP"
    ) {
      navigate(
        `/teaching-map/${notification.targetId}`,
      );
    }
  } catch (error) {
    console.error(
      "알림 읽음 처리 실패:",
      error,
    );
  }
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

  const notificationTrigger = (
    <button
      type="button"
      aria-label="알림"
      className="flex size-[40px] items-center justify-center overflow-hidden hover:opacity-80"
    >
      <img
        src={hasUnread ? "/icon/Alarm2.svg" : "/icon/Alarm3.png"}
        alt=""
        className="size-[40px] object-contain"
      />
    </button>
  );

  return (
    <header className="relative flex h-[56px] items-center justify-end bg-transparent lg:h-16 lg:justify-between lg:bg-[#090713] lg:px-8 lg:shadow-[0_0_80px_rgba(145,125,236,0.1)]">
      {showRightIcons && !hideMobileNotification && (
        <div className="mr-4 flex h-[56px] w-[40px] items-center justify-center lg:hidden">
          <button
            type="button"
            aria-label="알림 페이지로 이동"
            onClick={handleViewAll}
            className="flex size-[40px] items-center justify-center overflow-hidden hover:opacity-80"
          >
            <img
              src={hasUnread ? "/icon/Alarm2.svg" : "/icon/Alarm3.png"}
              alt=""
              className="size-[40px] object-contain"
            />
          </button>
        </div>
      )}

      <div className="hidden w-full items-center justify-between lg:flex">
      {showMenuIcon ? (
        <button
          type="button"
          aria-label="메뉴 열기"
          onClick={onMenuClick}
          className={[
            "flex size-10 items-center justify-center overflow-hidden hover:opacity-80",
            insetMenu ? "ml-16" : "",
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
          className="w-[84px]"
          aria-hidden="true"
        />
      )}

      <button
        type="button"
        aria-label="홈으로 이동"
        onClick={handleLogoClick}
        className="absolute left-[50vw] -translate-x-1/2 transition hover:opacity-80"
      >
        <img
          src="/logo/logo2.png"
          alt="TeachING Logo"
          className="h-9 w-auto"
        />
      </button>

      {showRightIcons ? (
        <div className="flex w-28 items-center justify-center gap-0">
          <NotificationPopover
            notifications={notifications}
            onItemClick={
              handleNotificationClick
            }
            onViewAll={handleViewAll}
            trigger={notificationTrigger}
          />

          <button
            type="button"
            aria-label="마이페이지"
            onClick={handleMyPageClick}
      className="flex size-[24px] items-center justify-center overflow-hidden hover:opacity-80 lg:size-10"
          >
            <img
              src="/Mypage.svg"
              alt=""
        className="size-[24px] object-contain lg:size-10"
            />
          </button>
        </div>
      ) : (
        <div
          className="w-[84px]"
          aria-hidden="true"
        />
      )}
      </div>
    </header>
  );
};

export default Header;
