import api from "./axios";

/* ==============================
   자료 상세 조회
============================== */

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

/* ==============================
   자료 태그 조회
============================== */

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

/* ==============================
   자료 원본 URL 조회
============================== */

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

/* ==============================
   URL 기반 AI 분석 요청
============================== */

export type AnalyzeMaterialRequest = {
  url: string;
  forceAnalyze: boolean;
};

export type AnalyzeMaterialResult = {
  materialAnalysisId: number;
  resultType: string;
  materialId: number;
  existingMaterialId: number;
  originalUrl: string;
  title: string;
  platformType: string;
  status: string;
  chunkCount: number;

  recommendedFolderId: number | null;
  recommendedFolderName: string | null;

  tags: MaterialTag[];
};

type AnalyzeMaterialResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: AnalyzeMaterialResult;
};

export const analyzeMaterial = async (
  data: AnalyzeMaterialRequest,
): Promise<AnalyzeMaterialResult> => {
  const response =
    await api.post<AnalyzeMaterialResponse>(
      "/api/v1/materials/analyze",
      data,
    );

  return response.data.result;
};

/* ==============================
   URL 분석 자료 저장 설정 확정
============================== */

export type FinalizeMaterialRequest = {
  folderId: number;
  tagIds: number[];
};

export type FinalizeMaterialResult = {
  materialId: number;
  folderId: number;
  tagIds: number[];
};

type FinalizeMaterialResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: FinalizeMaterialResult;
};

export const finalizeMaterial = async (
  materialId: number,
  data: FinalizeMaterialRequest,
): Promise<FinalizeMaterialResult> => {
  const response =
    await api.patch<FinalizeMaterialResponse>(
      `/api/v1/materials/${materialId}/finalize`,
      data,
    );

  return response.data.result;
};

/* ==============================
   최근 수집한 지식 목록 조회
============================== */

export type MaterialListItem = {
  materialId: number;
  dataTitle: string;
  analysisTitle: string;
  summary: string;
  platformType: string;
  platformImageUrl: string;
  difficultyScore: number;
  statusAi: string;
  createdAt: string;
};

type MaterialsResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: MaterialListItem[];
};

export const getMaterials = async (
  size?: number,
): Promise<MaterialListItem[]> => {
  const response =
    await api.get<MaterialsResponse>(
      "/materials",
      {
        params:
          size !== undefined
            ? { size }
            : undefined,
      },
    );

  return response.data.result;
};

/* ==============================
   자료 태그 삭제
============================== */

type DeleteMaterialTagResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
};

export const deleteMaterialTag = async (
  materialTagId: number,
): Promise<string> => {
  const response =
    await api.delete<DeleteMaterialTagResponse>(
      `/materials/tags/${materialTagId}`,
    );

  return response.data.result;
};