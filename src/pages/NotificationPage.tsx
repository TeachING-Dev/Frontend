import NotificationPageItem from "../components/notification/NotificationPageItem";

const notifications = [
  {
    id: 1,
    type: "short-cut" as const,
    message:
      "잠시 멈췄던 [티칭맵 제목], Short-Cut으로 빠르게 다시 흐름을 타보세요!",
    createdAt: "10시간 전",
    isRead: false,
  },
  {
    id: 2,
    type: "short-cut" as const,
    message:
      "잠시 멈췄던 [티칭맵 제목], Short-Cut으로 빠르게 다시 흐름을 타보세요!",
    createdAt: "10시간 전",
    isRead: true,
  },
  {
    id: 3,
    type: "deep-dive" as const,
    message:
      "[티칭맵 제목] 학습이 잠시 멈췄네요. 다시 꼼꼼하게 파고들어 볼까요?",
    createdAt: "10시간 전",
    isRead: false,
  },
  {
    id: 4,
    type: "deep-dive" as const,
    message:
      "[티칭맵 제목] 학습이 잠시 멈췄네요. 다시 꼼꼼하게 파고들어 볼까요?",
    createdAt: "10시간 전",
    isRead: true,
  },
  {
    id: 5,
    type: "deep-dive" as const,
    message:
      "[티칭맵 제목] 학습이 잠시 멈췄네요. 다시 꼼꼼하게 파고들어 볼까요?",
    createdAt: "10시간 전",
    isRead: true,
  },
];

const NotificationPage = () => {
  return (
    <section className="mx-auto w-full max-w-[1120px] py-[40px]">
      <h1 className="mb-[30px] text-[36px] font-bold leading-[150%] tracking-[-1.08px] text-[#E8E8E8]">
        알림
      </h1>

      <div className="flex flex-col gap-[20px]">
        {notifications.map((notification) => (
          <NotificationPageItem
            key={notification.id}
            type={notification.type}
            message={notification.message}
            createdAt={notification.createdAt}
            isRead={notification.isRead}
          />
        ))}
      </div>
    </section>
  );
};

export default NotificationPage;