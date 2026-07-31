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

export interface TeachingMapDetailStep {
  stepId: number;
  order: number;
  tip: string;
  stepTitle: string;
  isFinished: boolean;
}

export interface TeachingMapDetailResult {
  teachingMapId: number;
  folderId: number;
  title: string;
  description: string;
  type: TeachingMapType;
  currentSteps: number;
  totalSteps: number;
  steps: TeachingMapDetailStep[];
}

export interface ToggleTeachingMapStepResult {
  stepId: number;
  isCompleted: boolean;
  completedStepCount: number;
  totalStepCount: number;
  progressRate: number;
}

export interface TrashTeachingMapsResult {
  deletedTeachingMapIds: number[];
  deletedCount: number;
}

export interface TeachingMapHighlight {
  highlightId: number;
  text: string;
  type: string;
}

export interface AiTeacherFeedback {
  aiGuideId: number;
  promptVersion: string;
  type: string;
  title: string;
  content: string;
}

export interface TeachingMapStepDetail {
  stepId: number;
  materialId: number;
  stepNumber: number;
  title: string;
  createdAt: string;
  tags: string[];
  originalUrl: string;
  existingAiAnalysis: {
    summary: string;
    highlights: TeachingMapHighlight[];
  } | null;
  aiTeacherAnalysis: {
    guideType: string;
    teacherProfileImage: string;
    feedbacks: AiTeacherFeedback[];
  } | null;
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

export const getTeachingMap = async (
  teachingMapId: number,
): Promise<TeachingMapDetailResult> => {
  const { data } = await api.get<
    ApiResponse<TeachingMapDetailResult>
  >(`/api/v1/teaching-maps/${teachingMapId}`);

  return data.result;
};

export const toggleTeachingMapStep = async (
  teachingMapId: number,
  stepId: number,
): Promise<ToggleTeachingMapStepResult> => {
  const { data } = await api.patch<
    ApiResponse<ToggleTeachingMapStepResult>
  >(
    `/api/v1/teaching-maps/${teachingMapId}/steps/${stepId}/toggle`,
  );

  return data.result;
};

export const trashTeachingMaps = async (
  teachingMapIds: number[],
): Promise<TrashTeachingMapsResult> => {
  const { data } = await api.patch<
    ApiResponse<TrashTeachingMapsResult>
  >("/api/v1/teaching-maps/trash", {
    teachingMapIds,
  });

  return data.result;
};

export const getTeachingMapStep = async (
  teachingMapId: number,
  stepId: number,
): Promise<TeachingMapStepDetail> => {
  const { data } = await api.get<
    ApiResponse<TeachingMapStepDetail>
  >(
    `/api/v1/teaching-maps/${teachingMapId}/steps/${stepId}`,
  );

  return data.result;
};

export const getHighlightTeacherAnalysis = async (
  materialId: number,
  highlightId: number,
): Promise<AiTeacherFeedback> => {
  const { data } = await api.get<
    ApiResponse<AiTeacherFeedback>
  >(
    `/api/v1/teaching-maps/materials/${materialId}/highlights/${highlightId}/analysis`,
  );

  return data.result;
};