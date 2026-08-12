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
    <section className="mx-auto w-full max-w-[1120px] px-[20px] pb-[40px] pt-[10px] lg:px-0 lg:py-[40px]">
      {/* 제목 + 뒤로가기 */}
      <div className="flex h-[56px] items-center gap-0 lg:mb-[30px] lg:h-auto lg:gap-[5px]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
          className="flex size-[24px] shrink-0 items-center justify-center transition hover:opacity-80 lg:size-[40px] lg:rounded lg:hover:bg-white/10"
        >
          <ChevronLeft
            className="size-[24px] text-[#FAFAFA] lg:size-[40px] lg:text-[#E8E8E8]"
            strokeWidth={1}
          />
        </button>

        <h1 className="text-[24px] font-medium leading-[150%] tracking-[-0.6px] text-[#FAFAFA] lg:text-[36px] lg:font-bold lg:tracking-[-1.08px] lg:text-[#E8E8E8]">
          알림
        </h1>
      </div>

      <div className="mt-[40px] lg:mt-0">
        <NotificationPageList
          notifications={notifications}
          onItemClick={handleNotificationClick}
        />
      </div>
    </section>
  );
};

export default NotificationPage;
