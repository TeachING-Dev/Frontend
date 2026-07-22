export type TrashCategory =
  | "folder"
  | "data"
  | "teachingMap";

export type TrashSortType =
  | "latest"
  | "oldest";

export interface TrashFolderItem {
  id: number;
  name: string;
  itemCount: number;
  deletedAt: string;
}

export interface TrashDataItem {
  id: number;
  tag: string;
  deletedAt: string;
  title: string;
  description: string;
  thumbnail: string;
}

export interface TrashTeachingMapItem {
  id: number;
  title: string;
  description: string;
  currentStep: number;
  totalStep: number;
  thumbnails: string[];
  deletedAt: string;
}