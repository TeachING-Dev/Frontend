interface WithdrawalReasonItemProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const WithdrawalReasonItem = ({
  label,
  selected,
  onClick,
}: WithdrawalReasonItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[56px] items-center gap-[22.7px]"
    >
      <span
        className={[
          "h-[32px] w-[32px] shrink-0 rounded-full border",
          selected
            ? "border-[#C5BCFF] bg-[#917DEC]"
            : "border-[#42444C] bg-transparent",
        ].join(" ")}
      />

      <span className="text-[20px] font-semibold leading-[140%] tracking-[-0.6px] text-[#A1A1A5]">
        {label}
      </span>
    </button>
  );
};

export default WithdrawalReasonItem;