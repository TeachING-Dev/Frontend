import EmptyNotification from "./EmptyNotification";
import NotificationPageItem from "./NotificationPageItem";

export type NotificationType =
  | "short-cut"
  | "deep-dive";

export type Notification = {
  id: number;
  type: NotificationType;
  message: string;
  createdAt: string;
  isRead?: boolean;
};

type NotificationPageListProps = {
  notifications: Notification[];
  onItemClick?: (id: number) => void;
};

const NotificationPageList = ({
  notifications,
  onItemClick,
}: NotificationPageListProps) => {
  if (notifications.length === 0) {
    return <EmptyNotification />;
  }

  return (
    <div className="flex flex-col">
      {notifications.map((notification) => (
        <NotificationPageItem
          key={notification.id}
          type={notification.type}
          message={notification.message}
          createdAt={notification.createdAt}
          isRead={notification.isRead}
          onClick={() => onItemClick?.(notification.id)}
        />
      ))}
    </div>
  );
};

export default NotificationPageList;