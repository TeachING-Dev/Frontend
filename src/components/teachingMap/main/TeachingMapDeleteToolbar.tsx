interface TeachingMapDeleteToolbarProps {
  selectedCount: number;
  isAllSelected: boolean;
  actionLabel?: string;
  onToggleSelectAll: () => void;
  onDeleteClick: () => void;
  onCancelClick: () => void;
}

const TeachingMapDeleteToolbar = ({
  selectedCount,
  isAllSelected,
  actionLabel = "삭제하기",
  onToggleSelectAll,
  onDeleteClick,
  onCancelClick,
}: TeachingMapDeleteToolbarProps) => {
  const isDeleteDisabled = selectedCount === 0;

  return (
    <section
      aria-label="티칭맵 삭제 선택 도구"
      className="flex w-full items-center justify-between py-[5px] lg:py-[10px]"
    >
      <div className="flex items-center gap-[10px]">
        <button
          type="button"
          role="checkbox"
          aria-checked={isAllSelected}
          aria-label={
            isAllSelected
              ? "현재 페이지 전체 선택 해제"
              : "현재 페이지 전체 선택"
          }
          onClick={onToggleSelectAll}
          className={[
            "flex h-[25px] w-[25px] items-center justify-center rounded-[5px] border transition-colors lg:h-9 lg:w-9",
            isAllSelected
              ? "border-[#917DEC] bg-[#917DEC]"
              : "border-[#717379] bg-transparent hover:border-[#917DEC]",
          ].join(" ")}
        >
          {isAllSelected && (
            <svg
              width="25"
              height="25"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="5" fill="#917DEC" />

              <path
                d="M9 18.5L15 24.5L27 11.5"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        <p
          aria-live="polite"
          className="font-['SUIT'] text-[12px] font-medium leading-[135%] tracking-[-0.3px] text-[#C1AEFF] lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.6px]"
        >
          {selectedCount}개 선택됨
        </p>
      </div>

      <div className="flex items-center gap-[10px] lg:gap-2">
        <button
          type="button"
          disabled={isDeleteDisabled}
          onClick={onDeleteClick}
          className={[
            "flex h-[26px] w-[95px] flex-col items-start lg:h-[40px] lg:w-[147px]",
            "rounded-[5px] p-[5px] lg:gap-2 lg:px-2 lg:py-1",
            "transition-colors",
            isDeleteDisabled
              ? "cursor-not-allowed bg-[#2B2C35]"
              : "bg-[#917DEC] hover:bg-[#856FE5]",
          ].join(" ")}
        >
          <span
            className={[
              "flex flex-1 self-stretch items-center justify-center gap-2",
              "whitespace-nowrap text-center font-['SUIT'] text-[12px] font-medium",
              "leading-[16px] tracking-[-0.3px] lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.6px]",
              isDeleteDisabled ? "text-[#717379]" : "text-white",
            ].join(" ")}
          >
            {actionLabel}
          </span>
        </button>

        <button
          type="button"
          onClick={onCancelClick}
          className="flex h-[26px] w-[95px] flex-col items-start rounded-[5px] bg-[#2B2C35] p-[5px] transition-colors hover:bg-[#353641] lg:h-[40px] lg:w-[147px] lg:gap-2 lg:px-2 lg:py-1"
        >
          <span className="flex flex-1 self-stretch items-center justify-center gap-2 whitespace-nowrap text-center font-['SUIT'] text-[12px] font-medium leading-[16px] tracking-[-0.3px] text-white lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.6px]">
            취소
          </span>
        </button>
      </div>
    </section>
  );
};

export default TeachingMapDeleteToolbar;
