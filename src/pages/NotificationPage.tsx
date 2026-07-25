import { useEffect, useState } from "react";

import {
  getNotifications,
  type Notification,
} from "../apis/notification";
import NotificationPageList from "../components/notification/NotificationPageList";

const NotificationPage = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications(20);
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

  return (
    <section className="mx-auto w-full max-w-[1120px] py-[40px]">
      <h1 className="mb-[30px] text-[36px] font-bold leading-[150%] tracking-[-1.08px] text-[#E8E8E8]">
        알림
      </h1>

      <NotificationPageList
        notifications={notifications}
      />
    </section>
  );
};

export default NotificationPage;