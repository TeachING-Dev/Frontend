export type TemporaryTeachingMapType = "shortcut" | "deepDive";

export interface TemporaryTeachingMapData {
  id: number;
  title: string;
  description: string;
  type: TemporaryTeachingMapType;
  thumbnailSrc: string;
  thumbnailSrcs?: string[];
  extraThumbnailCount: number;
  folderId: number | null;
  savedAt: string;
}

export const TEMPORARY_TEACHING_MAPS: TemporaryTeachingMapData[] = [
  {
    id: 1,
    title: "로드맵 제목",
    description:
      "로드맵에 대한 상세설명들 몇자까지 처음에 보이나요? 로드맵에 대한 상세설명들 몇자까지 처음에 보이나요?",
    type: "shortcut",
    thumbnailSrc: "/icons.svg",
    thumbnailSrcs: ["/icon/youtube-app-icon.png", "/Google.svg", "/icons.svg"],
    extraThumbnailCount: 3,
    folderId: 1,
    savedAt: "2026-07-18T12:00:00",
  },
  {
    id: 2,
    title: "로드맵 제목",
    description:
      "로드맵에 대한 상세설명들 몇자까지 처음에 보이나요? 로드맵에 대한 상세설명들 몇자까지 처음에 보이나요?",
    type: "deepDive",
    thumbnailSrc: "/icons.svg",
    thumbnailSrcs: ["/icon/youtube-app-icon.png", "/Google.svg", "/icons.svg"],
    extraThumbnailCount: 3,
    folderId: 1,
    savedAt: "2026-07-17T12:00:00",
  },
  {
    id: 3,
    title: "로드맵 제목",
    description:
      "로드맵에 대한 상세설명들 몇자까지 처음에 보이나요? 로드맵에 대한 상세설명들 몇자까지 처음에 보이나요?",
    type: "shortcut",
    thumbnailSrc: "/icons.svg",
    thumbnailSrcs: ["/icon/youtube-app-icon.png", "/Google.svg", "/icons.svg"],
    extraThumbnailCount: 3,
    folderId: 1,
    savedAt: "2026-07-16T12:00:00",
  },
  {
    id: 4,
    title: "백엔드 개발자 티칭맵",
    description:
      "로드맵에 대한 상세설명들 몇자까지 처음에 보이나요? 로드맵에 대한 상세설명들 몇자까지 처음에 보이나요?",
    type: "deepDive",
    thumbnailSrc: "/icons.svg",
    thumbnailSrcs: ["/icon/youtube-app-icon.png", "/Google.svg", "/icons.svg"],
    extraThumbnailCount: 3,
    folderId: 1,
    savedAt: "2026-07-15T12:00:00",
  },
];
