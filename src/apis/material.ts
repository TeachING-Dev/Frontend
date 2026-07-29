import api from "./axios";

export type MaterialDetail = {
  materialId: number;
  folderId: number;
  title: string;
  originUrl: string;
  summary: string;
  tags: string[];
  statusAi: string;
  createdAt: string;
  updatedAt: string;
};

type MaterialDetailResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: MaterialDetail;
};

export const getMaterialDetail = async (
  folderId: number,
  materialId: number,
): Promise<MaterialDetail> => {
  const response =
    await api.get<MaterialDetailResponse>(
      `/api/folders/${folderId}/materials/${materialId}`,
    );

  return response.data.result;
};

export type MaterialTag = {
  tagId: number;
  tagName: string;
};

type MaterialTagsResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: MaterialTag[];
};

export const getMaterialTags = async (
  folderId: number,
  materialId: number,
): Promise<MaterialTag[]> => {
  const response =
    await api.get<MaterialTagsResponse>(
      `/api/folders/${folderId}/materials/${materialId}/tags`,
    );

  return response.data.result;
};

export type MaterialOriginUrl = {
  materialId: number;
  originUrl: string;
};

type MaterialOriginUrlResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: MaterialOriginUrl;
};

export const getMaterialOriginUrl = async (
  folderId: number,
  materialId: number,
): Promise<MaterialOriginUrl> => {
  const response =
    await api.get<MaterialOriginUrlResponse>(
      `/api/folders/${folderId}/materials/${materialId}/origin-url`,
    );

  return response.data.result;
};

/* ==============================
   AI 상세 분석 조회
============================== */

export type MaterialAnalysis = {
  materialAnalysisId: number;
  materialId: number;

  title: string;
  originUrl: string;
  platformType: string;
  platformImageUrl: string;

  tags: MaterialTag[];

  shortSummary: string;
  fullAnalysis: string;

  isUserEdited: boolean;

  generatedAt: string;
  updatedAt: string;
};

type MaterialAnalysisResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: MaterialAnalysis;
};

export const getMaterialAnalysis = async (
  folderId: number,
  materialId: number,
): Promise<MaterialAnalysis> => {
  const response =
    await api.get<MaterialAnalysisResponse>(
      `/api/folders/${folderId}/materials/${materialId}/analysis`,
    );

  return response.data.result;
};

/* ==============================
   AI 요약 수정
============================== */

export type UpdateMaterialSummaryRequest = {
  shortSummary: string;
};

export type UpdateMaterialSummaryResult = {
  materialId: number;
  shortSummary: string;
  isUserEdited: boolean;
  updatedAt: string;
};

type UpdateMaterialSummaryResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: UpdateMaterialSummaryResult;
};

export const updateMaterialSummary = async (
  folderId: number,
  materialId: number,
  data: UpdateMaterialSummaryRequest,
): Promise<UpdateMaterialSummaryResult> => {
  const response =
    await api.patch<UpdateMaterialSummaryResponse>(
      `/api/folders/${folderId}/materials/${materialId}/analysis/summary`,
      data,
    );

  return response.data.result;
};

/* ==============================
   자료 이동
============================== */

export type MoveMaterialsRequest = {
  materialIds: number[];
  targetFolderId: number;
};

type MoveMaterialsResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: unknown;
};

export const moveMaterials = async (
  folderId: number,
  data: MoveMaterialsRequest,
): Promise<void> => {
  await api.patch<MoveMaterialsResponse>(
    `/api/folders/${folderId}/materials/move`,
    data,
  );
};

/* ==============================
   자료 휴지통 이동
============================== */

export type MoveMaterialsToTrashRequest = {
  materialIds: number[];
};

type MoveMaterialsToTrashResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: unknown;
};

export const moveMaterialsToTrash = async (
  folderId: number,
  data: MoveMaterialsToTrashRequest,
): Promise<void> => {
  await api.patch<MoveMaterialsToTrashResponse>(
    `/api/folders/${folderId}/materials/trash`,
    data,
  );
};

/* ==============================
   자료 복구
============================== */

export type RestoreMaterialsRequest = {
  materialIds: number[];
};

export type RestoreMaterialsResult = {
  restoredIds: number[];
  failedIds: number[];
};

type RestoreMaterialsResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: RestoreMaterialsResult;
};

export const restoreMaterials = async (
  folderId: number,
  data: RestoreMaterialsRequest,
): Promise<RestoreMaterialsResult> => {
  const response =
    await api.patch<RestoreMaterialsResponse>(
      `/api/folders/${folderId}/materials/restore`,
      data,
    );

  return response.data.result;
};