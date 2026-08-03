interface SourcePlatform {
  type: string;
  imageUrl?: string;
}

const PLATFORM_ICON_MAP: Record<string, string> = {
  YOUTUBE: "/icon/youtube-icon.svg",
  VELOG: "/icon/velog-icon.svg",
  CAFE: "/icon/cafe-icon.svg",
  WEB: "/globe.svg",
  WEBSITE: "/globe.svg",
  BLOG: "/globe.svg",
};

const getSourcePlatformIcon = ({
  type,
  imageUrl,
}: SourcePlatform) => {
  const normalizedType = type.trim().toUpperCase();

  return (
    PLATFORM_ICON_MAP[normalizedType] ||
    imageUrl ||
    "/globe.svg"
  );
};

export default getSourcePlatformIcon;
