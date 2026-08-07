interface WithdrawalConfirmFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const WithdrawalConfirmField = ({
  checked,
  onChange,
}: WithdrawalConfirmFieldProps) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex h-[32px] w-full items-center gap-[10px] text-left lg:h-[40px] lg:w-[672px]"
    >
      <span
        className={[
          "flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-[5px] border lg:h-[32px] lg:w-[32px]",
          checked
            ? "border-[#917DEC] bg-[#917DEC]"
            : "border-[#5D5F67] bg-[#2B2C35]",
        ].join(" ")}
      >
        {checked && (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3.5 9.3L7.1 12.7L14.5 5.3"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>

      <span className="text-[13px] font-normal leading-[135%] tracking-[-0.325px] text-[#717379] lg:text-[20px] lg:font-semibold lg:leading-[140%] lg:tracking-[-0.6px]">
        네, 탈퇴할게요.
      </span>
    </button>
  );
};

export default WithdrawalConfirmField;
