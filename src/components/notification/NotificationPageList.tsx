import type { Notification } from "../../apis/notification";

import EmptyNotification from "./EmptyNotification";
import NotificationPageItem from "./NotificationPageItem";

type NotificationPageListProps = {
  notifications: Notification[];
  onItemClick?: (
    notificationId: number,
  ) => void;
};

const NotificationPageList = ({
  notifications,
  onItemClick,
}: NotificationPageListProps) => {
  if (notifications.length === 0) {
    return <EmptyNotification />;
  }

  return (
    <div className="flex flex-col gap-[20px]">
      {notifications.map((notification) => (
        <NotificationPageItem
          key={notification.notificationId}
          title={notification.title}
          message={notification.message}
          createdAt={notification.createdAt}
          isRead={notification.isRead}
          onClick={() =>
            onItemClick?.(
              notification.notificationId,
            )
          }
        />
      ))}
    </div>
  );
};

export default NotificationPageList;