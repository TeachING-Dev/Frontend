type SourcePlatform = {
  type: string;
  imageUrl: string;
};

type TeachingMapItemProps = {
  title: string;
  description: string;
  sourcePlatforms: SourcePlatform[];
  onClick?: () => void;
  onShortcutClick?: () => void;
};

const TeachingMapItem = ({
  title,
  description,
  sourcePlatforms,
  onClick,
  onShortcutClick,
}: TeachingMapItemProps) => {
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
      <div className="flex h-[38px] w-[60px] shrink-0 items-center justify-center gap-[4px] rounded-[6px] bg-[#1F212A] p-[6px] md:h-[60px] md:w-[98px] md:gap-[6px] md:rounded-[10px] md:p-[10px]">
        {sourcePlatforms.map(
          (platform) => (
            <img
              key={platform.type}
              src={platform.imageUrl}
              alt={platform.type}
              className="min-w-0 flex-1 object-contain"
            />
          ),
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