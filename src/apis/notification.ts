import api from "./axios";

export type Notification = {
  notificationId: number;
  notificationType: string;
  targetType: string;
  targetId: number;
  targetTitle: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

type GetNotificationsResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Notification[];
};

/* ==============================
   알림 목록 조회
============================== */

export const getNotifications = async (
  size = 10,
): Promise<Notification[]> => {
  const response =
    await api.get<GetNotificationsResponse>(
      "/api/v1/notifications",
      {
        params: {
          size,
        },
      },
    );

  return response.data.result;
};

/* ==============================
   알림 요약 조회
============================== */

export type NotificationSummary = {
  hasUnread: boolean;
  unreadCount: number;
};

type GetNotificationSummaryResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: NotificationSummary;
};

export const getNotificationSummary =
  async (): Promise<NotificationSummary> => {
    const response =
      await api.get<GetNotificationSummaryResponse>(
        "/api/v1/notifications/summary",
      );

    return response.data.result;
  };

/* ==============================
   알림 읽음 처리
============================== */

export type ReadNotificationResult = {
  notificationId: number;
  isRead: boolean;
};

type ReadNotificationResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ReadNotificationResult;
};

export const readNotification = async (
  notificationId: number,
): Promise<ReadNotificationResult> => {
  const response =
    await api.patch<ReadNotificationResponse>(
      `/api/v1/notifications/${notificationId}/read`,
    );

  return response.data.result;
};