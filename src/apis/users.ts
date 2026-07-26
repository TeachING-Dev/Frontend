import type { ApiResponse } from "./apiTypes";
import api from "./axios";

export type TeacherPersona =
  | "FRIENDLY"
  | "STRICT"
  | "CHEERING";

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

export interface UpdateProfileRequest {
  nickname?: string;
  profileImage?: File;
  birthYear?: number;
  birthMonth?: number;
  birthDay?: number;
  empty?: boolean;
}

export interface UpdateProfileResult {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  notificationEnabled: boolean;
}

export interface WithdrawalRequest {
  reason: string;
  reasonDetail: string;
  isConfirmed: boolean;
}

export const getMyProfile = async (): Promise<MyProfile> => {
  const { data } = await api.get<
    ApiResponse<MyProfile>
  >("/api/v1/users/me");

  return data.result;
};

export const checkNickname = async (
  nickname: string,
): Promise<string> => {
  const { data } = await api.get<
    ApiResponse<string>
  >("/api/v1/auth/check-nickname", {
    params: { nickname },
  });

  return data.result;
};

export const updateMyProfile = async ({
  nickname,
  profileImage,
  birthYear,
  birthMonth,
  birthDay,
  empty,
}: UpdateProfileRequest): Promise<UpdateProfileResult> => {
  const formData = new FormData();

  if (nickname !== undefined) {
    formData.append("nickname", nickname);
  }

  if (profileImage !== undefined) {
    formData.append("profileImage", profileImage);
  }

  const hasBirthDate =
    birthYear !== undefined &&
    birthMonth !== undefined &&
    birthDay !== undefined;

  if (hasBirthDate) {
    formData.append("birthYear", String(birthYear));
    formData.append("birthMonth", String(birthMonth));
    formData.append("birthDay", String(birthDay));
  }

  if (empty !== undefined) {
    formData.append("empty", String(empty));
  }

  const { data } = await api.patch<
    ApiResponse<UpdateProfileResult>
  >("/api/v1/users/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.result;
};

export const withdrawMe = async (
  request: WithdrawalRequest,
): Promise<string> => {
  const { data } = await api.delete<
    ApiResponse<string>
  >("/api/v1/users/me", {
    data: request,
  });

  return data.result;
};

export const updateTeacherPersona = async (
  persona: TeacherPersona,
): Promise<{ teacherPersona: TeacherPersona }> => {
  const { data } = await api.patch<
    ApiResponse<{ teacherPersona: TeacherPersona }>
  >("/api/v1/users/me/teacher-persona", {
    persona,
  });

  return data.result;
};

export const updateNotifications = async (
  pushEnabled: boolean,
): Promise<{ pushEnabled: boolean }> => {
  const { data } = await api.patch<
    ApiResponse<{ pushEnabled: boolean }>
  >("/api/v1/users/me/notifications", {
    pushEnabled,
  });

  return data.result;
};

export const getInquiryContact = async (): Promise<InquiryContact> => {
  const { data } = await api.get<
    ApiResponse<InquiryContact>
  >("/api/v1/support/contacts");

  return data.result;
};