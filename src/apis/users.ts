import api from "./axios";

export { logout } from "./auth";

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
  birthDate: string | null;
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

const getResult = <T>(
  response: { data: ApiResponse<T> },
) => {
  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }

  return response.data.result;
};

export const getMyProfile = async () =>
  getResult(
    await api.get<ApiResponse<MyProfile>>(
      "/users/me",
    ),
  );

export const checkNickname = (
  nickname: string,
) =>
  api
    .get<ApiResponse<string>>(
      "/api/v1/auth/check-nickname",
      {
        params: { nickname },
      },
    )
    .then(getResult);

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
    formData.append(
      "profileImage",
      profileImage,
    );
  }

  const hasBirthDate =
    birthYear !== undefined &&
    birthMonth !== undefined &&
    birthDay !== undefined;

  if (hasBirthDate) {
    formData.append(
      "birthYear",
      String(birthYear),
    );
    formData.append(
      "birthMonth",
      String(birthMonth),
    );
    formData.append(
      "birthDay",
      String(birthDay),
    );
  }

  if (empty !== undefined) {
    formData.append(
      "empty",
      String(empty),
    );
  }

  const { data } = await api.patch<
    ApiResponse<UpdateProfileResult>
  >("/users/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.result;
};

export const withdrawMe = (
  withdrawal: WithdrawalRequest,
) =>
  api
    .delete<ApiResponse<string>>(
      "/users/me",
      {
        data: withdrawal,
      },
    )
    .then(getResult);

export const updateTeacherPersona = (
  persona: TeacherPersona,
) =>
  api
    .patch<
      ApiResponse<{
        teacherPersona: TeacherPersona;
      }>
    >(
      "/users/me/teacher-persona",
      {
        persona,
      },
    )
    .then(getResult);

export const updateNotifications = (
  pushEnabled: boolean,
) =>
  api
    .patch<
      ApiResponse<{
        pushEnabled: boolean;
      }>
    >(
      "/users/me/notifications",
      {
        pushEnabled,
      },
    )
    .then(getResult);

export const getInquiryContact = () =>
  api
    .get<ApiResponse<InquiryContact>>(
      "/api/v1/support/contacts",
    )
    .then(getResult);
