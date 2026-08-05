import {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import {
  getNotifications,
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

  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications(5);

        setNotifications(data);
      } catch (error) {
        console.error(
          "알림 목록 조회 실패:",
          error,
        );
      }
    };

    fetchNotifications();
  }, []);

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
    <header className="relative hidden h-16 items-center justify-between bg-[#090713] px-8 shadow-[0_0_80px_rgba(145,125,236,0.1)] lg:flex">
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
            trigger={
              <button
                type="button"
                aria-label="알림"
                className="flex size-10 items-center justify-center overflow-hidden hover:opacity-80"
              >
                <img
                  src="/icon/Alarm.svg"
                  alt=""
                  className="size-6 object-contain"
                />
              </button>
            }
          />

          <button
            type="button"
            aria-label="마이페이지"
            onClick={handleMyPageClick}
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