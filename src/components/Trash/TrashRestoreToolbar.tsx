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
        onClick={onToggleSelection}
        aria-label={
          hasSelectedItems
            ? "전체 선택 취소"
            : "전체 선택"
        }
        className="flex items-center gap-[14px]"
      >
        <img
          src={
            hasSelectedItems
              ? "/checkbox.svg"
              : "/checkbox-frame.svg"
          }
          alt=""
          aria-hidden="true"
          className="h-9 w-9 shrink-0"
        />

        <span className="font-suit text-[20px] font-medium leading-[30px] tracking-[-0.6px] text-[#917DEC]">
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
            "flex h-10 w-[147px] items-center justify-center gap-2 rounded-[5px] px-2 py-1",
            "font-suit text-[20px] font-medium leading-[30px] tracking-[-0.6px]",
            "transition-colors",
            isRestoreDisabled
              ? "cursor-not-allowed bg-[#42444C] text-[#717379]"
              : "bg-[#917DEC] text-[#FAFAFA] hover:bg-[#8068E2]",
          ].join(" ")}
        >
          <span
            aria-hidden="true"
            className={[
              "h-6 w-6 shrink-0 bg-current",
              "[mask-image:url('/flip-left.svg')]",
              "[mask-position:center]",
              "[mask-repeat:no-repeat]",
              "[mask-size:contain]",
              "[-webkit-mask-image:url('/flip-left.svg')]",
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
          className="flex h-10 w-[147px] items-center justify-center rounded-[5px] bg-[#42444C] px-2 py-1 font-suit text-[20px] font-medium leading-[30px] tracking-[-0.6px] text-[#FAFAFA] transition-colors hover:bg-[#50515A]"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default TrashRestoreToolbar;