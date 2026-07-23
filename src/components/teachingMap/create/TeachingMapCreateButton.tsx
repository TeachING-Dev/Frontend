type TeachingMapCreateButtonProps = {
  disabled: boolean;
  onSave: () => void;
  onCreate: () => void;
};

const TeachingMapCreateButton = ({
  disabled,
  onSave,
  onCreate,
}: TeachingMapCreateButtonProps) => {
  const disabledClassName =
    "cursor-not-allowed bg-[#24252B] text-[#5D5D5D]";

  return (
    <div className="flex w-full items-center gap-[10px]">
      <button
        type="button"
        disabled={disabled}
        onClick={onSave}
        className={`flex h-[64px] flex-1 items-center justify-center rounded-[4px] px-5 py-[10px] font-['SUIT_Variable'] text-[20px] font-semibold leading-[140%] tracking-[-0.6px] transition ${
          disabled
            ? disabledClassName
            : "bg-[#42444C] text-white hover:bg-[#4B4D56]"
        }`}
      >
        임시 저장
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={onCreate}
        className={`flex h-[64px] flex-1 items-center justify-center rounded-[4px] px-5 py-[10px] font-['SUIT_Variable'] text-[20px] font-semibold leading-[140%] tracking-[-0.6px] transition ${
          disabled
            ? disabledClassName
            : "bg-[#917DEC] text-white hover:bg-[#8068E2]"
        }`}
      >
        티칭맵 생성
      </button>
    </div>
  );
};

export default TeachingMapCreateButton;