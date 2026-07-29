interface TrashRestoredMenuProps {
  onRestore: () => void;
}

const TrashRestoredMenu = ({
  onRestore,
}: TrashRestoredMenuProps) => {
  return (
    <button
      type="button"
      onClick={onRestore}
      className={[
        "flex h-[60px] w-[254px] flex-col items-start justify-center p-[10px]",
        "rounded-[5px] bg-[#13151F]",
        "shadow-[0_0_50px_rgba(145,125,236,0.5)]",
      ].join(" ")}
    >
      <span className="flex items-center gap-1">
        <img
          src="/icon/flip-left.svg"
          alt=""
          aria-hidden="true"
          className="h-[18px] w-[18px] shrink-0"
        />

        <span className="font-suit text-[18px] font-medium leading-[27px] tracking-[-0.54px] text-[#D9CDFF]">
          복구하기
        </span>
      </span>
    </button>
  );
};

export default TrashRestoredMenu;