import type { ApiResponse } from "./apiTypes";
import api from "./axios";

export type TeachingMapStatus =
  | "IN_PROGRESS"
  | "FINISHED"
  | "TEMPORARY";

export type TeachingMapType =
  | "ALL"
  | "SHORTCUT"
  | "DEEPDIVE";

export type TeachingMapSort =
  | "LATEST"
  | "OLDEST";

export interface TeachingMapSourcePlatform {
  type: string;
  imageUrl: string;
}

export interface TeachingMapListItem {
  teachingMapId: number;
  title: string;
  description: string;
  isDraft: boolean;
  status: TeachingMapStatus;
  type: TeachingMapType;
  sourcePlatforms: TeachingMapSourcePlatform[];
  extraCount: number;
  totalStepCount: number;
  completedStepCount: number;
  progressRate: number;
  createdAt: string;
}

export interface TeachingMapListResult {
  currentStatus: TeachingMapStatus;
  currentType: TeachingMapType;
  currentSort: TeachingMapSort;
  teachingMaps: TeachingMapListItem[];
}

export interface GetTeachingMapsParams {
  status?: TeachingMapStatus;
  type?: TeachingMapType;
  sort?: TeachingMapSort;
}

export interface CreateTeachingMapRequest {
  title: string;
  description: string;
  folderId: number;
  type: TeachingMapType;
}

export interface CreateTeachingMapResult {
  teachingMapId: number;
  title: string;
  description: string;
  folderId: number;
  type: TeachingMapType;
  createdAt: string;
}

export const getTeachingMaps = async ({
  status = "IN_PROGRESS",
  type = "ALL",
  sort = "LATEST",
}: GetTeachingMapsParams = {}): Promise<TeachingMapListResult> => {
  const { data } = await api.get<
    ApiResponse<TeachingMapListResult>
  >("/api/v1/teaching-maps", {
    params: { status, type, sort },
  });

  return data.result;
};

export const getTemporaryTeachingMaps = async (
  type: TeachingMapType = "ALL",
  sort: TeachingMapSort = "LATEST",
): Promise<TeachingMapListResult> =>
  getTeachingMaps({
    status: "TEMPORARY",
    type,
    sort,
  });

export const createTeachingMap = async (
  request: CreateTeachingMapRequest,
): Promise<CreateTeachingMapResult> => {
  const { data } = await api.post<
    ApiResponse<CreateTeachingMapResult>
  >("/api/v1/teaching-maps", request);

  return data.result;
};