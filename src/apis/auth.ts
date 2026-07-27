import api from "./axios";

type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

type SignupRequest = {
  nickname: string;
  agreedTermIds: number[];
};

export type Term = {
  termId: number;
  title: string;
  content: string;
  isRequired: boolean;
  version: string;
};

export const getTerms = async () => {
  const response = await api.get<ApiResponse<Term[]>>("/api/v1/terms");
  const data = response.data;

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};

export const signup = async (requestBody: SignupRequest) => {
  const response = await api.post<ApiResponse<string>>(
    "/api/v1/auth/signup",
    requestBody,
  );
  const data = response.data;

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};

export const checkNickname = async (nickname: string) => {
  const response = await api.get<ApiResponse<null>>(
    "/api/v1/auth/check-nickname",
    {
      params: { nickname },
    },
  );
  const data = response.data;

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};

export const logout = async () => {
  const response = await api.post<ApiResponse<string>>(
    "/api/v1/auth/logout",
  );
  const data = response.data;

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};

export const reissue = async () => {
  const response = await api.post<ApiResponse<string>>(
    "/api/v1/auth/reissue",
  );
  const data = response.data;

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};
