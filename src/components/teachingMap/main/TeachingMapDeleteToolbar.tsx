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
  const isDeleteDisabled =
    selectedCount === 0;

  return (
    <section
      aria-label="티칭맵 삭제 선택 도구"
      className="flex w-[1120px] items-center justify-between py-[10px]"
    >
      <div className="flex items-center gap-[10px]">
        <button
          type="button"
          role="checkbox"
          aria-checked={isAllSelected}
          aria-label={isAllSelected ? "현재 페이지 전체 선택 해제" : "현재 페이지 전체 선택"}
          onClick={onToggleSelectAll}
          className={[
            "flex h-9 w-9 items-center justify-center rounded-[5px] border transition-colors",
            isAllSelected
              ? "border-[#917DEC] bg-[#917DEC]"
              : "border-[#717379] bg-transparent hover:border-[#917DEC]",
          ].join(" ")}
        >
          {isAllSelected && <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="36"
              height="36"
              rx="5"
              fill="#917DEC"
            />

            <path
              d="M9 18.5L15 24.5L27 11.5"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>}
        </button>

        <p
          aria-live="polite"
          className="font-['SUIT'] text-[20px] font-medium leading-[30px] tracking-[-0.6px] text-[#C1AEFF]"
        >
          {selectedCount}개 선택됨
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={isDeleteDisabled}
          onClick={onDeleteClick}
          className={[
            "flex h-[40px] w-[147px] flex-col items-start",
            "gap-2 rounded-[5px] px-2 py-1",
            "transition-colors",
            isDeleteDisabled
              ? "cursor-not-allowed bg-[#2B2C35]"
              : "bg-[#917DEC] hover:bg-[#856FE5]",
          ].join(" ")}
        >
          <span
            className={[
              "flex flex-1 self-stretch items-center justify-center gap-2",
              "text-center font-['SUIT'] text-[20px] font-medium",
              "leading-[30px] tracking-[-0.6px]",
              isDeleteDisabled
                ? "text-[#717379]"
                : "text-white",
            ].join(" ")}
          >
            {actionLabel}
          </span>
        </button>

        <button
          type="button"
          onClick={onCancelClick}
          className="flex h-[40px] w-[147px] flex-col items-start gap-2 rounded-[5px] bg-[#2B2C35] px-2 py-1 transition-colors hover:bg-[#353641]"
        >
          <span className="flex flex-1 self-stretch items-center justify-center gap-2 text-center font-['SUIT'] text-[20px] font-medium leading-[30px] tracking-[-0.6px] text-white">
            취소
          </span>
        </button>
      </div>
    </section>
  );
};

export default TeachingMapDeleteToolbar;
