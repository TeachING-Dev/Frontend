import api from "./axios";

export type RecentMaterial = {
  materialId: number;
  folderId: number;
  title: string;
  summary: string;
  platformType: string;
  platformImageUrl: string;
  aiStatus: string;
  createdAt: string;
};

export type SourcePlatform = {
  type: string;
  imageUrl: string;
};

export type ActiveTeachingMap = {
  teachingMapId: number;
  title: string;
  description: string;
  type: string;
  status: string;
  currentSteps: number;
  totalSteps: number;
  sourcePlatforms: SourcePlatform[];
  createdAt: string;
};

type HomeResponse = {
  recentMaterials: RecentMaterial[];
  activeTeachingMaps: ActiveTeachingMap[];
};

type ApiResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

export const getHome = async () => {
  const { data } =
    await api.get<ApiResponse<HomeResponse>>(
      "/api/v1/home",
    );

  return data.result;
};