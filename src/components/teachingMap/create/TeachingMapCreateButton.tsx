type TeachingMapCreateButtonProps = {
  isSaveDisabled: boolean;
  isCreateDisabled: boolean;
  onSave: () => void;
  onCreate: () => void;
};

const TeachingMapCreateButton = ({
  isSaveDisabled,
  isCreateDisabled,
  onSave,
  onCreate,
}: TeachingMapCreateButtonProps) => {
  return (
    <div className="flex w-full items-center gap-[10px]">
      <button
        type="button"
        disabled={isSaveDisabled}
        onClick={onSave}
        className={[
          "flex h-[64px] flex-1 items-center justify-center",
          "rounded-[4px] px-5 py-[10px]",
          "font-['SUIT'] text-[20px] font-semibold leading-[28px]",
          "tracking-[-0.6px] transition-colors",
          isSaveDisabled
            ? [
                "cursor-not-allowed",
                "bg-[#24252B]",
                "text-[#5D5D5D]",
              ].join(" ")
            : [
                "bg-[#42444C]",
                "text-white",
                "hover:bg-[#4B4D56]",
              ].join(" "),
        ].join(" ")}
      >
        임시 저장
      </button>

      <button
        type="button"
        disabled={isCreateDisabled}
        onClick={onCreate}
        className={[
          "flex h-[64px] flex-1 items-center justify-center",
          "rounded-[4px] px-5 py-[10px]",
          "font-['SUIT'] text-[20px] font-semibold leading-[28px]",
          "tracking-[-0.6px] transition-colors",
          isCreateDisabled
            ? [
                "cursor-not-allowed",
                "bg-[#24252B]",
                "text-[#5D5D5D]",
              ].join(" ")
            : [
                "bg-[#917DEC]",
                "text-white",
                "hover:bg-[#8068E2]",
              ].join(" "),
        ].join(" ")}
      >
        티칭맵 생성
      </button>
    </div>
  );
};

export default TeachingMapCreateButton;