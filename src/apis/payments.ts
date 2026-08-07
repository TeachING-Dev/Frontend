import type { AxiosError } from "axios";

import api from "./axios";
import type { ApiResponse } from "./apiTypes";

type PaymentReadyResult = {
  redirectUrl: string;
};

export class PaymentApiError extends Error {
  status?: number;
  code?: string;

  constructor(
    message: string,
    status?: number,
    code?: string,
  ) {
    super(message);
    this.name = "PaymentApiError";
    this.status = status;
    this.code = code;
  }
}

const toPaymentError = (error: unknown) => {
  const axiosError = error as AxiosError<ApiResponse<unknown>>;

  if (axiosError.response) {
    return new PaymentApiError(
      axiosError.response.data?.message ||
        "결제 요청에 실패했습니다.",
      axiosError.response.status,
      axiosError.response.data?.code,
    );
  }

  return error;
};

export const readyKakaoPay = async () => {
  try {
    const response = await api.post<ApiResponse<PaymentReadyResult>>(
      "/api/v1/payments/ready",
    );
    const data = response.data;

    if (!data.isSuccess || !data.result.redirectUrl) {
      throw new PaymentApiError(
        data.message || "결제 요청에 실패했습니다.",
        undefined,
        data.code,
      );
    }

    return data.result.redirectUrl;
  } catch (error) {
    throw toPaymentError(error);
  }
};

export const confirmKakaoPaySuccess = async (
  orderId: string,
  pgToken: string,
) => {
  const response = await api.post<ApiResponse<string>>(
    "/api/v1/payments/success",
    null,
    {
      params: {
        orderId,
        pg_token: pgToken,
      },
    },
  );

  return response.data;
};

export const cancelKakaoPay = async (orderId: string) => {
  const response = await api.post<ApiResponse<string>>(
    "/api/v1/payments/cancel",
    null,
    {
      params: {
        orderId,
      },
    },
  );

  return response.data;
};

export const failKakaoPay = async (orderId: string) => {
  const response = await api.post<ApiResponse<string>>(
    "/api/v1/payments/fail",
    null,
    {
      params: {
        orderId,
      },
    },
  );

  return response.data;
};
