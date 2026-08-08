import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import {
  getNotifications,
  readNotification,
  type Notification,
} from "../apis/notification";
import NotificationPageList from "../components/notification/NotificationPageList";

const sortNotifications = (
  notifications: Notification[],
) => {
  return [...notifications].sort(
    (a, b) =>
      Number(a.isRead) -
      Number(b.isRead),
  );
};

const NotificationPage = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data =
          await getNotifications(20);

        setNotifications(
          sortNotifications(data),
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
    const notification =
      notifications.find(
        (item) =>
          item.notificationId ===
          notificationId,
      );

    if (!notification) {
      return;
    }

    if (
      notification.targetType ===
      "TEACHING_MAP"
    ) {
      navigate(
        `/teaching-map/${notification.targetId}`,
      );
    }

    try {
      await readNotification(
        notificationId,
      );

      setNotifications((prev) =>
        sortNotifications(
          prev.map((item) =>
            item.notificationId ===
            notificationId
              ? {
                  ...item,
                  isRead: true,
                }
              : item,
          ),
        ),
      );
    } catch (error) {
      console.error(
        "알림 읽음 처리 실패:",
        error,
      );
    }
  };

  return (
    <section className="mx-auto w-full max-w-[1120px] py-[40px]">
      {/* 제목 + 뒤로가기 */}
      <div className="mb-[30px] flex items-center gap-[5px]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
          className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded transition hover:bg-white/10"
        >
          <ChevronLeft
            size={40}
            strokeWidth={1}
            className="text-[#E8E8E8]"
          />
        </button>

        <h1 className="text-[36px] font-bold leading-[150%] tracking-[-1.08px] text-[#E8E8E8]">
          알림
        </h1>
      </div>

      <NotificationPageList
        notifications={notifications}
        onItemClick={handleNotificationClick}
      />
    </section>
  );
};

export default NotificationPage;
