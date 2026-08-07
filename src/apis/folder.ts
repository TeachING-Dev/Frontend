import type { ApiResponse } from "./apiTypes";
import api from "./axios";


export type FolderSort =
  | "recent"
  | "oldest"
  | "name";

export type Folder = {
  folderId: number;
  folderName: string;
  materialCount: number;
  updatedAt: string;
};

type FolderListResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Folder[];
};

type FolderDetailResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Folder;
};

type CreateFolderResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    folderId: number;
    folderName: string;
  };
};

type UpdateFolderResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    folderId: number;
    folderName: string;
  };
};

type FolderTrashResult = {
  folderId: number;
  isDeleted: boolean;
};

export const getFolders = async (
  sort: FolderSort = "recent",
): Promise<Folder[]> => {
  const response =
    await api.get<FolderListResponse>(
      "/api/folders",
      {
        params: { sort },
      },
    );

  return response.data.result;
};

export const getFolder = async (
  folderId: number,
): Promise<Folder> => {
  const response =
    await api.get<FolderDetailResponse>(
      `/api/folders/${folderId}`,
    );

  return response.data.result;
};

export const createFolder = async (
  folderName: string,
): Promise<{
  folderId: number;
  folderName: string;
}> => {
  const response =
    await api.post<CreateFolderResponse>(
      "/api/folders",
      {
        folderName,
      },
    );

  return response.data.result;
};

export const updateFolderName = async (
  folderId: number,
  folderName: string,
): Promise<{
  folderId: number;
  folderName: string;
}> => {
  const response =
    await api.patch<UpdateFolderResponse>(
      `/api/folders/${folderId}`,
      {
        folderName,
      },
    );

  return response.data.result;
};

export const moveFolderToTrash = async (
  folderId: number,
): Promise<FolderTrashResult> => {
  const { data } = await api.patch<
    ApiResponse<FolderTrashResult>
  >(`/api/folders/${folderId}/trash`);

  return data.result;
};

export const restoreFolder = async (
  folderId: number,
): Promise<FolderTrashResult> => {
  const { data } = await api.patch<
    ApiResponse<FolderTrashResult>
  >(`/api/folders/${folderId}/restore`);

  return data.result;
};

export type FolderMaterialSort =
  | "recent"
  | "oldest"
  | "title";

export type FolderMaterialTag = {
  tagId: number;
  tagName: string;
};

export type FolderMaterial = {
  materialId: number;
  title: string;
  summary: string;
  originalUrl: string;
  platformType: string;
  tags: FolderMaterialTag[];
  statusAi: string;
  createdAt: string;
  updatedAt: string;
};

export type FolderMaterialsResult = {
  folderId: number;
  folderName: string;
  content: FolderMaterial[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

type GetFolderMaterialsParams = {
  keyword?: string;
  sort?: FolderMaterialSort;
  page?: number;
  size?: number;
};

export const getFolderMaterials = async (
  folderId: number,
  {
    keyword,
    sort = "recent",
    page = 0,
    size = 10,
  }: GetFolderMaterialsParams = {},
): Promise<FolderMaterialsResult> => {
  const { data } = await api.get<
    ApiResponse<FolderMaterialsResult>
  >(`/api/folders/${folderId}/materials`, {
    params: {
      ...(keyword
        ? {
            keyword,
          }
        : {}),
      sort,
      page,
      size,
    },
  });

  return data.result;
};
