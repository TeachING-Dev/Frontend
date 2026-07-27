import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

interface RetryableRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface ReissueResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const reissueApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken =
    localStorage.getItem("accessToken");

  if (accessToken) {
    const authorizationValue =
      accessToken.startsWith("Bearer ")
        ? accessToken
        : `Bearer ${accessToken}`;

    config.headers.Authorization =
      authorizationValue;
  }

  return config;
});

let reissuePromise: Promise<string> | null =
  null;

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest =
      error.config as
        | RetryableRequestConfig
        | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    if (
      originalRequest.url ===
      "/api/v1/auth/reissue"
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    localStorage.removeItem("accessToken");
    delete originalRequest.headers.Authorization;

    if (!reissuePromise) {
      reissuePromise = reissueApi
        .post<ReissueResponse>(
          "/api/v1/auth/reissue",
        )
        .then((response) => {
          const responseData = response.data;

          if (
            !responseData.isSuccess ||
            !responseData.result
          ) {
            throw new Error(
              responseData.message ||
                "토큰 재발급에 실패했습니다.",
            );
          }

          localStorage.setItem(
            "accessToken",
            responseData.result,
          );

          return responseData.result;
        })
        .finally(() => {
          reissuePromise = null;
        });
    }

    try {
      const reissuedAccessToken =
        await reissuePromise;

      const authorizationValue =
        reissuedAccessToken.startsWith(
          "Bearer ",
        )
          ? reissuedAccessToken
          : `Bearer ${reissuedAccessToken}`;

      originalRequest.headers.Authorization =
        authorizationValue;

      return api(originalRequest);
    } catch (reissueError) {
      localStorage.removeItem("accessToken");

      return Promise.reject(reissueError);
    }
  },
);

export default api;