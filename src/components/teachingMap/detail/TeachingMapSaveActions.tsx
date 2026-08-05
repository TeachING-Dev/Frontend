interface TeachingMapSaveActionsProps {
  isSaveDisabled: boolean;
  onSave: () => void;
  onCancel: () => void;
}

const TeachingMapSaveActions = ({
  isSaveDisabled,
  onSave,
  onCancel,
}: TeachingMapSaveActionsProps) => {
  return (
    <div className="flex shrink-0 items-center gap-[8px]">
      <button
        type="button"
        disabled={isSaveDisabled}
        onClick={onSave}
        className={[
          "flex h-[40px] w-[100px] items-center justify-center rounded-[10px]",
          "px-[8px] py-[4px] text-center text-[16px] font-medium",
          "leading-[24px] tracking-[-0.48px]",
          "transition-colors",
          isSaveDisabled
            ? "cursor-not-allowed bg-[#2B2C35] text-[#717379]"
            : "bg-[#917DEC] text-[#FAFAFA] hover:bg-[#8068E2]",
        ].join(" ")}
      >
        저장
      </button>

      <button
        type="button"
        onClick={onCancel}
        className={[
          "flex h-[40px] w-[100px] items-center justify-center rounded-[10px]",
          "bg-[#42444C] px-[8px] py-[4px]",
          "text-center text-[16px] font-medium leading-[24px]",
          "tracking-[-0.48px] text-[#FAFAFA]",
          "transition-colors hover:bg-[#50515A]",
        ].join(" ")}
      >
        취소
      </button>
    </div>
  );
};

export default TeachingMapSaveActions;