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

export type MaterialAnalysis = {
  materialAnalysisId: number;
  materialId: number;
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