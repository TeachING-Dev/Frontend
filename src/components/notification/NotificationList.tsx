import EmptyNotification from "./EmptyNotification";
import NotificationItem from "./NotificationItem";

export type NotificationType =
  | "short-cut"
  | "deep-dive";

export type Notification = {
  id: number;
  type: NotificationType;
  title: string;
  createdAt: string;
  isRead: boolean;
};

type NotificationListProps = {
  notifications: Notification[];
  onItemClick?: (id: number) => void;
};

const NotificationList = ({
  notifications,
  onItemClick,
}: NotificationListProps) => {
  // 알림이 없을 때
  if (notifications.length === 0) {
    return <EmptyNotification />;
  }

  return (
    <div className="flex flex-col gap-[6px]">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          type={notification.type}
          title={notification.title}
          createdAt={notification.createdAt}
          isRead={notification.isRead}
          onClick={() =>
            onItemClick?.(notification.id)
          }
        />
      ))}
    </div>
  );
};

export default NotificationList;