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
      className="flex h-[36px] items-center gap-[10px] lg:h-[56px] lg:gap-[22.7px]"
    >
      <span
        className={[
          "h-[25px] w-[25px] shrink-0 rounded-full border lg:h-[32px] lg:w-[32px]",
          selected
            ? "border-[#C5BCFF] bg-[#917DEC]"
            : "border-[#42444C] bg-transparent",
        ].join(" ")}
      />

      <span className="text-[13px] font-normal leading-[135%] tracking-[-0.325px] text-[#717379] lg:text-[20px] lg:font-semibold lg:leading-[140%] lg:tracking-[-0.6px] lg:text-[#A1A1A5]">
        {label}
      </span>
    </button>
  );
};

export default WithdrawalReasonItem;
