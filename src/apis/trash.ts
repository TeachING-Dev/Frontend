import type { ApiResponse, PageResult } from "./apiTypes";
import api from "./axios";

export type TrashSort = "latest" | "oldest";

export interface TrashTeachingMap {
  teachingMapId: number;
  title: string;
  deletedAt: string;
  description?: string;
  status?: "IN_PROGRESS" | "FINISHED";
  type?: "SHORTCUT" | "DEEPDIVE";
  completedStepCount?: number;
  totalStepCount?: number;
  progressRate?: number;
  sourcePlatforms?: Array<{ type: string; imageUrl: string }>;
  extraCount?: number;
}

export interface TrashMaterialTag {
  tagId: number;
  tagName: string;
}

export interface TrashMaterial {
  materialId: number;
  title: string;
  platformType: string;
  platformImageUrl: string;
  summary: string;
  originalUrl: string;
  tags: TrashMaterialTag[];
  createdAt: string;
  deletedAt: string;
}

export interface TrashFolder {
  folderId: number;
  name: string;
  deletedAt: string;
}

export interface RestoreResult {
  restoredIds: number[];
  failedIds: number[];
  restoredMaterials?: Array<{
    materialId: number;
    folderId: number;
    folderName: string;
  }>;
}

const getTrashPage = async <T>(
  path: string,
  sort: TrashSort,
  page: number,
): Promise<PageResult<T>> => {
  const { data } = await api.get<ApiResponse<PageResult<T>>>(path, {
    params: { sort, page },
  });

  return data.result;
};

export const getTrashTeachingMaps = (sort: TrashSort = "latest", page = 0) =>
  getTrashPage<TrashTeachingMap>("/api/v1/trash/teaching-maps", sort, page);

export const getTrashMaterials = (sort: TrashSort = "latest", page = 0) =>
  getTrashPage<TrashMaterial>("/api/v1/trash/materials", sort, page);

export const getTrashFolders = (sort: TrashSort = "latest", page = 0) =>
  getTrashPage<TrashFolder>("/api/v1/trash/folders", sort, page);

export const restoreTeachingMaps = async (
  teachingMapIds: number[],
): Promise<RestoreResult> => {
  const { data } = await api.patch<ApiResponse<RestoreResult>>(
    "/api/v1/trash/teaching-maps/restore",
    {
      teachingMapIds,
    },
  );

  return data.result;
};

export const restoreMaterials = async (
  materialIds: number[],
): Promise<RestoreResult> => {
  const { data } = await api.patch<ApiResponse<RestoreResult>>(
    "/api/v1/trash/materials/restore",
    {
      materialIds,
    },
  );

  return data.result;
};

export const restoreFolders = async (
  folderIds: number[],
): Promise<RestoreResult> => {
  const { data } = await api.patch<ApiResponse<RestoreResult>>(
    "/api/v1/trash/folders/restore",
    {
      folderIds,
    },
  );

  return data.result;
};
