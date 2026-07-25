import api from "./axios";

export type Notification = {
  notificationId: number;
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