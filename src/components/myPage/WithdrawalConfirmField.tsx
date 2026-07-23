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
      className="flex h-[40px] w-[672px] items-center gap-[10px] text-left"
    >
      <span
        className={[
          "flex h-[32px] w-[32px] items-center justify-center rounded-[5px] border",
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

      <span className="text-[20px] font-semibold leading-[140%] tracking-[-0.6px] text-[#717379]">
        네, 탈퇴할게요.
      </span>
    </button>
  );
};

export default WithdrawalConfirmField;