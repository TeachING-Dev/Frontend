interface TeachingMapDeleteToolbarProps {
  selectedCount: number;
  onDeleteClick: () => void;
  onCancelClick: () => void;
}

const TeachingMapDeleteToolbar = ({
  selectedCount,
  onDeleteClick,
  onCancelClick,
}: TeachingMapDeleteToolbarProps) => {
  const isDeleteDisabled = selectedCount === 0;

  return (
    <section
      className="flex w-[1120px] items-center justify-between py-[10px]"
      aria-label="티칭맵 삭제 선택 도구"
    >
      <div className="flex items-center gap-[10px]">
        <div
          aria-hidden="true"
          className="flex h-9 w-9 items-center justify-center rounded-[5px] bg-[#917DEC]"
        >
          <svg
            width="36"
            height="36"
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
        </div>

        <p
          className="font-['SUIT'] text-[20px] font-medium leading-[30px] tracking-[-0.6px] text-[#C1AEFF]"
          aria-live="polite"
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
            "flex h-10 w-[147px] items-center justify-center",
            "rounded-[5px] px-2 py-1",
            "font-['SUIT'] text-[18px] font-semibold leading-[27px]",
            "tracking-[-0.54px] transition-colors",
            isDeleteDisabled
              ? "cursor-not-allowed bg-[#2B2C35] text-[#717379]"
              : "bg-[#917DEC] text-white hover:bg-[#856FE5]",
          ].join(" ")}
        >
          삭제하기
        </button>

        <button
          type="button"
          onClick={onCancelClick}
          className={[
            "flex h-10 w-[147px] items-center justify-center",
            "rounded-[5px] bg-[#2B2C35] px-2 py-1",
            "font-['SUIT'] text-[18px] font-semibold leading-[27px]",
            "tracking-[-0.54px] text-[#D0D0D2]",
            "transition-colors hover:bg-[#353641]",
          ].join(" ")}
        >
          취소
        </button>
      </div>
    </section>
  );
};

export default TeachingMapDeleteToolbar;