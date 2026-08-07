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
    <div className="flex shrink-0 items-center gap-[5px] lg:gap-[8px]">
      <button
        type="button"
        disabled={isSaveDisabled}
        onClick={onSave}
        className={[
          "flex h-[26px] w-[52px] items-center justify-center rounded-[5px] lg:h-[40px] lg:w-[100px] lg:rounded-[10px]",
          "px-[5px] text-center text-[10px] font-medium lg:px-[8px] lg:py-[4px] lg:text-[16px]",
          "leading-[15px] tracking-[-0.2px] lg:leading-[24px] lg:tracking-[-0.48px]",
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
          "flex h-[26px] w-[52px] items-center justify-center rounded-[5px] lg:h-[40px] lg:w-[100px] lg:rounded-[10px]",
          "bg-[#42444C] px-[5px] lg:px-[8px] lg:py-[4px]",
          "text-center text-[10px] font-medium leading-[15px] lg:text-[16px] lg:leading-[24px]",
          "tracking-[-0.2px] text-[#FAFAFA] lg:tracking-[-0.48px]",
          "transition-colors hover:bg-[#50515A]",
        ].join(" ")}
      >
        취소
      </button>
    </div>
  );
};

export default TeachingMapSaveActions;
