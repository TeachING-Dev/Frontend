interface TeachingMapSaveActionsProps {
  onSave: () => void;
  onCancel: () => void;
}

const TeachingMapSaveActions = ({
  onSave,
  onCancel,
}: TeachingMapSaveActionsProps) => {
  return (
    <div className="flex shrink-0 items-center gap-[8px]">
      <button
        type="button"
        onClick={onSave}
        className="flex h-[40px] w-[100px] items-center justify-center rounded-[10px] bg-[#2B2C35] px-[8px] py-[4px] text-center text-[16px] font-medium leading-[24px] tracking-[-0.48px] text-[#717379]"
      >
        저장
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="flex h-[40px] w-[100px] items-center justify-center rounded-[10px] bg-[#42444C] px-[8px] py-[4px] text-center text-[16px] font-medium leading-[24px] tracking-[-0.48px] text-[#717379]"
      >
        취소
      </button>
    </div>
  );
};

export default TeachingMapSaveActions;