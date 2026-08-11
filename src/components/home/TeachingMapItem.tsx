import SourceImage from "../common/SourceImage";

type SourcePlatform = {
  type: string;
  imageUrl: string;
};

type TeachingMapItemProps = {
  title: string;
  description: string;
  sourcePlatforms: SourcePlatform[];
  extraCount: number;
  onClick?: () => void;
  onShortcutClick?: () => void;
};

const TeachingMapItem = ({
  title,
  description,
  sourcePlatforms,
  extraCount,
  onClick,
  onShortcutClick,
}: TeachingMapItemProps) => {
  const visibleThumbnails = sourcePlatforms
    .map((platform) => platform.imageUrl)
    .slice(0, 3);
  const extraThumbnailCount = Math.max(
    extraCount,
    sourcePlatforms.length - visibleThumbnails.length,
    0,
  );

  const handleShortcutClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    onShortcutClick?.();
  };

  return (
    <article
      onClick={onClick}
      className="group flex w-full cursor-pointer items-center gap-[10px] rounded-[8px] px-[23px] py-[8px] transition-colors hover:bg-white/5 md:gap-[15px] md:px-5 md:py-[10px]"
    >
      {/* 썸네일 */}
      <div className="flex h-[35px] w-[45px] shrink-0 items-center justify-center overflow-hidden rounded-[5px] bg-[#1F212A] p-[4.5px] lg:h-[60px] lg:w-[110px] lg:rounded-[10px] lg:p-[10px]">
        {visibleThumbnails.length > 0 && (
          <div className="relative flex items-center">
            {visibleThumbnails.map((source, index) => (
              <SourceImage
                key={`${source}-${index}`}
                src={source}
                alt=""
                className={[
                  "relative h-[16.25px] w-[16.25px] rounded-full object-contain lg:h-9 lg:w-9",
                  index === 0 ? "" : "-ml-[5px] lg:-ml-4",
                ].join(" ")}
                style={{ zIndex: visibleThumbnails.length - index }}
              />
            ))}
            {extraThumbnailCount > 0 && (
              <span className="relative z-50 -ml-[5px] flex h-[16px] min-w-[16px] translate-y-[3px] items-center justify-center rounded-full bg-[#2B2C35] px-0.5 text-[6px] font-medium text-white lg:-ml-3 lg:h-[28px] lg:min-w-[28px] lg:translate-y-[6px] lg:text-[12px]">
                +{extraThumbnailCount}
              </span>
            )}
          </div>
        )}
      </div>

      {/* 제목 + 설명 */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-left text-[12px] font-bold leading-[150%] tracking-[-0.12px] text-[#F5F2FF] md:mb-1 md:text-[24px] md:tracking-[-0.24px]">
          {title}
        </h3>

        <p className="truncate text-left text-[9px] font-medium leading-[150%] tracking-[-0.27px] text-[#717379] md:text-[16px] md:tracking-[-0.48px]">
          {description}
        </p>
      </div>

      {/* 바로가기 버튼 */}
      <button
        type="button"
        onClick={handleShortcutClick}
        className="shrink-0 rounded-[6px] border border-[#917DEC] px-[8px] py-[3px] text-[9px] font-semibold leading-[140%] tracking-[-0.27px] text-[#917DEC] transition-colors hover:bg-[#917DEC]/10 md:rounded-[8px] md:px-3 md:py-1.5 md:text-[20px] md:tracking-[-0.6px]"
      >
        Short-cut
      </button>
    </article>
  );
};

export default TeachingMapItem;
