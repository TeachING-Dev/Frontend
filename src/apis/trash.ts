import type {
  ApiResponse,
  PageResult,
} from "./apiTypes";
import api from "./axios";

export type TrashSort = "latest" | "oldest";

export interface TrashTeachingMap {
  teachingMapId: number;
  title: string;
  deletedAt: string;
}

export interface TrashMaterial {
  materialId: number;
  analysisTitle: string;
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
}

const getTrashPage = async <T>(
  path: string,
  sort: TrashSort,
  page: number,
): Promise<PageResult<T>> => {
  const { data } = await api.get<
    ApiResponse<PageResult<T>>
  >(path, {
    params: { sort, page },
  });

  return data.result;
};

export const getTrashTeachingMaps = (
  sort: TrashSort = "latest",
  page = 0,
) =>
  getTrashPage<TrashTeachingMap>(
    "/api/v1/trash/teaching-maps",
    sort,
    page,
  );

export const getTrashMaterials = (
  sort: TrashSort = "latest",
  page = 0,
) =>
  getTrashPage<TrashMaterial>(
    "/api/v1/trash/materials",
    sort,
    page,
  );

export const getTrashFolders = (
  sort: TrashSort = "latest",
  page = 0,
) =>
  getTrashPage<TrashFolder>(
    "/api/v1/trash/folders",
    sort,
    page,
  );

export const restoreTeachingMaps = async (
  teachingMapIds: number[],
): Promise<RestoreResult> => {
  const { data } = await api.patch<
    ApiResponse<RestoreResult>
  >("/api/v1/trash/teaching-maps/restore", {
    teachingMapIds,
  });

  return data.result;
};

export const restoreMaterials = async (
  materialIds: number[],
): Promise<RestoreResult> => {
  const { data } = await api.patch<
    ApiResponse<RestoreResult>
  >("/api/v1/trash/materials/restore", {
    materialIds,
  });

  return data.result;
};