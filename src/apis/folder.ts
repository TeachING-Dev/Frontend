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