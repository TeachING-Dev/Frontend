import type { ApiResponse } from "./apiTypes";
import { isAxiosError } from "axios";
import api from "./axios";

export class ChatApiError extends Error {
  status?: number;
  code?: string;

  constructor(
    message: string,
    status?: number,
    code?: string,
  ) {
    super(message);
    this.name = "ChatApiError";
    this.status = status;
    this.code = code;
  }
}

export type ChatSource = {
  chatsourceId: number;
  materialId: number;
  folderId?: number;
  materialTitle: string;
  folderName: string;
  url: string;
  citedText: string;
  position: string;
  startLine?: number | null;
  endLine?: number | null;
};

export type ChatHistoryMessage = {
  messageId: number;
  role: "USER" | "AI";
  content: string;
  isFallback: boolean;
  sources: ChatSource[];
  createdAt: string;
};

export type ChatRoomHistory = {
  chatroomId: number;
  title: string;
  messages: ChatHistoryMessage[];
};

export type ChatRoom = {
  chatroomId: number;
  title: string;
  createdAt: string;
};

export type ChatRoomSummary = {
  chatroomId: number;
  title: string;
  lastMessageAt: string;
};

export type ChatRoomList = {
  chatrooms: ChatRoomSummary[];
  nextCursor: number | null;
};

export type ChatRoomListParams = {
  cursor?: number | null;
  size?: number;
};

type ChatRoomPageResponse = {
  content: ChatRoomSummary[];
};

type ChatRoomListResponse =
  | ChatRoomSummary[]
  | ChatRoomPageResponse
  | ChatRoomList;

export type AskChatRoomMessageRequest = {
  content: string;
};

export type AskChatRoomMessageResult = {
  chatroomTitle: string;
  userMessage: {
    messageId: number;
    content: string;
    createdAt: string;
  };
  aiMessage: {
    messageId: number;
    content: string;
    isFallback: boolean;
    sources: ChatSource[];
    createdAt: string;
  };
  remainingCount: number;
};

export const getChatRoomMessages = async (
  chatRoomId: number,
) => {
  const response = await api
    .get<ApiResponse<ChatRoomHistory>>(
      `/chatrooms/${chatRoomId}/messages`,
    )
    .catch((error: unknown) => {
      if (isAxiosError<ApiResponse<null>>(error)) {
        throw new ChatApiError(
          error.response?.data.message ||
            error.message,
          error.response?.status,
          error.response?.data.code,
        );
      }

      throw error;
    });
  const data = response.data;

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};

export const createChatRoom = async () => {
  const response = await api.post<
    ApiResponse<ChatRoom>
  >("/chatrooms");
  const data = response.data;

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};

export const getChatRooms = async (
  params?: ChatRoomListParams,
) => {
  const response = await api.get<
    ApiResponse<ChatRoomListResponse>
  >("/chatrooms", {
    params: {
      cursor: params?.cursor ?? undefined,
      size: params?.size,
    },
  });
  const data = response.data;

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  if (Array.isArray(data.result)) {
    return {
      chatrooms: data.result,
      nextCursor: null,
    };
  }

  if ("content" in data.result) {
    return {
      chatrooms: data.result.content,
      nextCursor: null,
    };
  }

  return data.result;
};

export const askChatRoomMessage = async (
  chatRoomId: number,
  requestBody: AskChatRoomMessageRequest,
) => {
  const response = await api
    .post<ApiResponse<AskChatRoomMessageResult>>(
      `/chatrooms/${chatRoomId}/messages`,
      requestBody,
    )
    .catch((error: unknown) => {
      if (isAxiosError<ApiResponse<null>>(error)) {
        throw new ChatApiError(
          error.response?.data.message ||
            error.message,
          error.response?.status,
          error.response?.data.code,
        );
      }

      throw error;
    });
  const data = response.data;

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data.result;
};
