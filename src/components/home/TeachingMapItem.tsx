import SourceImage from "../common/SourceImage";

type SourcePlatform = {
  type: string;
  imageUrl: string;
};

type TeachingMapItemProps = {
  title: string;
  description: string;
  sourcePlatforms: SourcePlatform[];
  extraCount?: number;
  onClick?: () => void;
  onShortcutClick?: () => void;
};

const TeachingMapItem = ({
  title,
  description,
  sourcePlatforms,
  extraCount = 0,
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
      className="group flex w-full cursor-pointer items-center gap-[10px] rounded-[8px] p-[10px] transition-colors hover:bg-white/5 md:gap-[15px] md:px-5 md:py-[10px]"
    >
      {/* 썸네일 */}
      <div className="flex h-[38px] w-[60px] shrink-0 items-center justify-center gap-[4px] rounded-[6px] bg-[#1F212A] p-[6px] md:h-[60px] md:w-[98px] md:gap-[6px] md:rounded-[10px] md:p-[10px]">
        {visibleThumbnails.length > 0 && (
          <div className="relative flex items-center">
            {visibleThumbnails.map((source, index) => (
              <SourceImage
                key={`${source}-${index}`}
                src={source}
                alt=""
                className={[
                  "relative h-[16.25px] w-[16.25px] rounded-full object-contain lg:h-9 lg:w-9",
                  index === 0 ? "" : "-ml-[5px] lg:-ml-3",
                ].join(" ")}
                style={{ zIndex: visibleThumbnails.length - index }}
              />
            ))}
            {extraThumbnailCount > 0 && (
              <span className="relative z-0 -ml-[5px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#2B2C35] px-0.5 text-[6px] font-medium text-white lg:-ml-3 lg:h-9 lg:min-w-9 lg:px-1 lg:text-[14px]">
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
        className="flex h-[20px] w-[54px] shrink-0 items-center justify-center rounded-[6px] border-[0.6px] border-[#917DEC] px-[4px] py-[2px] font-suit text-[10px] font-normal leading-[14px] tracking-[-0.2px] text-[#917DEC] transition-colors hover:bg-[#917DEC]/10 md:h-auto md:w-auto md:rounded-[8px] md:border md:px-3 md:py-1.5 md:text-[20px] md:font-semibold md:leading-[140%] md:tracking-[-0.6px]"
      >
        Short-cut
      </button>
    </article>
  );
};

export default TeachingMapItem;
