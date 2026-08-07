interface TrashRestoreToolbarProps {
  selectedCount: number;
  onToggleSelection: () => void;
  onRestore: () => void;
  onCancel: () => void;
}

const TrashRestoreToolbar = ({
  selectedCount,
  onToggleSelection,
  onRestore,
  onCancel,
}: TrashRestoreToolbarProps) => {
  const hasSelectedItems =
    selectedCount > 0;

  const isRestoreDisabled =
    selectedCount === 0;

  return (
    <div className="flex w-full items-center justify-between">
      <button
        type="button"
        role="checkbox"
        aria-checked={hasSelectedItems}
        onClick={onToggleSelection}
        aria-label={
          hasSelectedItems
            ? "전체 선택 취소"
            : "전체 선택"
        }
        className="flex items-center gap-[10px] lg:gap-[14px]"
      >
        <img
          src={
            hasSelectedItems
              ? "/checkbox.svg"
              : "/checkbox-frame.svg"
          }
          alt=""
          aria-hidden="true"
          className="h-[25px] w-[25px] shrink-0 lg:h-9 lg:w-9"
        />

        <span className="font-suit text-[12px] font-medium leading-[135%] tracking-[-0.3px] text-[#917DEC] lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.6px]">
          {hasSelectedItems
            ? `${selectedCount}개 선택됨`
            : "전체 선택"}
        </span>
      </button>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={isRestoreDisabled}
          onClick={onRestore}
          className={[
            "flex h-[26px] w-[95px] items-center justify-center gap-1 rounded-[5px] p-[5px]",
            "font-suit text-[12px] font-medium leading-[16px] tracking-[-0.3px]",
            "lg:h-10 lg:w-[147px] lg:gap-2 lg:px-2 lg:py-1",
            "lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.6px]",
            "transition-colors",
            isRestoreDisabled
              ? "cursor-not-allowed bg-[#42444C] text-[#717379]"
              : "bg-[#917DEC] text-[#FAFAFA] hover:bg-[#8068E2]",
          ].join(" ")}
        >
          <span
            aria-hidden="true"
            className={[
              "h-4 w-4 shrink-0 bg-current lg:h-6 lg:w-6",
              "[mask-image:url('/icon/flip-left.svg')]",
              "[mask-position:center]",
              "[mask-repeat:no-repeat]",
              "[mask-size:contain]",
              "[-webkit-mask-image:url('/icon/flip-left.svg')]",
              "[-webkit-mask-position:center]",
              "[-webkit-mask-repeat:no-repeat]",
              "[-webkit-mask-size:contain]",
            ].join(" ")}
          />

          <span>복구하기</span>
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="flex h-[26px] w-[95px] items-center justify-center rounded-[5px] bg-[#42444C] p-[5px] font-suit text-[12px] font-medium leading-[16px] tracking-[-0.3px] text-[#FAFAFA] transition-colors hover:bg-[#50515A] lg:h-10 lg:w-[147px] lg:px-2 lg:py-1 lg:text-[20px] lg:leading-[30px] lg:tracking-[-0.6px]"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default TrashRestoreToolbar;
