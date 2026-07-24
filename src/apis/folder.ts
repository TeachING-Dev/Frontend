import api from "./axios";

export type FolderSort = "recent" | "oldest" | "name";

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

export const getFolders = async (
  sort: FolderSort = "recent",
): Promise<Folder[]> => {
  const response = await api.get<FolderListResponse>(
    "/api/folders",
    {
      params: {
        sort,
      },
    },
  );

  return response.data.result;
};