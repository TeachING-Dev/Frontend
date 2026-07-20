type TeachingMapItemProps = {
  title: string;
  description: string;
  thumbnailSrc: string;
  onClick?: () => void;
  onShortcutClick?: () => void;
};

const TeachingMapItem = ({
  title,
  description,
  thumbnailSrc,
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
      className="group flex w-full cursor-pointer items-center gap-[15px] rounded-[8px] px-5 py-[10px] transition-colors hover:bg-white/5"
    >
      {/* 썸네일 */}
      <div className="flex h-[60px] w-[98px] shrink-0 flex-col items-start justify-center gap-[10px] rounded-[10px] bg-[#1F212A] p-[10px]">
        <img
          src={thumbnailSrc}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>

      {/* 제목 + 설명 */}
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 text-left text-[24px] font-bold leading-[150%] tracking-[-0.24px] text-[#F5F2FF]">
          {title}
        </h3>

        <p className="truncate text-left text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#717379]">
          {description}
        </p>
      </div>

      {/* 바로가기 버튼 */}
      <button
        type="button"
        onClick={handleShortcutClick}
        className="shrink-0 rounded-[8px] border border-[#917DEC] px-3 py-1.5 text-[20px] font-semibold leading-[140%] tracking-[-0.6px] text-[#917DEC] transition-colors hover:bg-[#917DEC]/10"
      >
        Short-cut
      </button>
    </article>
  );
};

export default TeachingMapItem;