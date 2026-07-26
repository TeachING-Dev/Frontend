import {
  getAccessToken,
  normalizeBearerToken,
} from "../utils/authToken";
import api from "./axios";

export type TeacherPersona =
  | "FRIENDLY"
  | "STRICT"
  | "CHEERING";

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export interface UserAccount {
  provider: string;
}

export interface MyProfile {
  userId: number;
  email: string;
  nickname: string;
  birthDate: string;
  profileImageUrl: string;
  notificationEnabled: boolean;
  teacherPersona: TeacherPersona;
  accounts: UserAccount[];
  createdAt: string;
}

export interface InquiryContact {
  kakaoChannelUrl: string;
  email: string;
}

interface UpdateProfileRequest {
  nickname?: string;
  profileImageUrl?: string;
}

interface UpdateProfileResult {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  notificationEnabled: boolean;
}

interface WithdrawalRequest {
  reason: string;
  reasonDetail: string;
  isConfirmed: boolean;
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL ??
  import.meta.env.VITE_API_BASE_URL ??
  "";

const request = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const headers = new Headers(options.headers);
  const accessToken = getAccessToken();

  headers.set("Accept", "application/json");

  if (accessToken) {
    headers.set(
      "Authorization",
      normalizeBearerToken(accessToken),
    );
  }

  if (options.body) {
    headers.set(
      "Content-Type",
      "application/json",
    );
  }

  const response = await fetch(
    `${API_BASE_URL}/api/v1${path}`,
    {
      ...options,
      headers,
      credentials: "include",
    },
  );

  const data =
    (await response.json()) as ApiResponse<T>;

  if (!response.ok || !data.isSuccess) {
    throw new Error(
      data.message ||
        `요청에 실패했습니다. (${response.status})`,
    );
  }

  return data.result;
};

export const getMyProfile = () =>
  api
    .get<ApiResponse<MyProfile>>("/users/me")
    .then((response) => {
      const data = response.data;

      if (!data.isSuccess) {
        throw new Error(data.message);
      }

      return data.result;
    });

export const checkNickname = (
  nickname: string,
) => {
  const searchParams = new URLSearchParams({
    nickname,
  });

  return request<string>(
    `/auth/check-nickname?${searchParams.toString()}`,
  );
};

export const updateMyProfile = (
  profile: UpdateProfileRequest,
) =>
  request<UpdateProfileResult>("/users/me", {
    method: "PATCH",
    body: JSON.stringify(profile),
  });

export const withdrawMe = (
  withdrawal: WithdrawalRequest,
) =>
  api
    .delete<ApiResponse<string>>("/users/me", {
      data: withdrawal,
    })
    .then((response) => {
      const data = response.data;

      if (!data.isSuccess) {
        throw new Error(data.message);
      }

      return data.result;
    });

export const updateTeacherPersona = (
  persona: TeacherPersona,
) =>
  request<{ teacherPersona: TeacherPersona }>(
    "/users/me/teacher-persona",
    {
      method: "PATCH",
      body: JSON.stringify({ persona }),
    },
  );

export const updateNotifications = (
  pushEnabled: boolean,
) =>
  request<{ pushEnabled: boolean }>(
    "/users/me/notifications",
    {
      method: "PATCH",
      body: JSON.stringify({ pushEnabled }),
    },
  );

export const getInquiryContact = () =>
  request<InquiryContact>(
    "/support/contacts",
  );
