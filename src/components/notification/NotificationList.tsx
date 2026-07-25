import type { Notification } from "../../apis/notification";

import EmptyNotification from "./EmptyNotification";
import NotificationItem from "./NotificationItem";

type NotificationListProps = {
  notifications: Notification[];
  onItemClick?: (
    notificationId: number,
  ) => void;
};

const NotificationList = ({
  notifications,
  onItemClick,
}: NotificationListProps) => {
  if (notifications.length === 0) {
    return <EmptyNotification />;
  }

  return (
    <div className="flex flex-col gap-[6px]">
      {notifications.map((notification) => (
        <NotificationItem
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

export default NotificationList;