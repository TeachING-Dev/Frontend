const activeInfoIcon = "/myPage/activeiicon.svg";
const infoIcon = "/myPage/iicon.svg";

interface NicknameFieldProps {
  value: string;
  errorMessage?: string;
  onChange: (value: string) => void;
}

const NicknameField = ({
  value,
  errorMessage,
  onChange,
}: NicknameFieldProps) => {
  const isError = Boolean(errorMessage);

  return (
    <div className="flex w-[736px] flex-col">
      <label
        htmlFor="nickname"
        className="mb-[10px] w-fit text-[28px] font-bold leading-[150%] tracking-[-0.84px] text-[#717379]"
      >
        <span className="relative inline-block">
          닉네임

          <span className="absolute -right-[15px] top-[-7px] text-[28px] font-bold leading-none text-[#717379]">
            *
          </span>
        </span>
      </label>

      <div
        className={[
          "flex h-[60px] w-full items-center rounded-[5px] bg-[#1F212A] px-[20px]",
          isError
            ? "border border-[#917DEC]"
            : "border border-transparent",
        ].join(" ")}
      >
        <input
          id="nickname"
          type="text"
          value={value}
          maxLength={10}
          placeholder="(2~10자 이내의 한글, 영문, 숫자)"
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-[20px] font-semibold leading-[150%] tracking-[-0.6px] text-[#D0D0D2] outline-none placeholder:text-[#42444C]"
        />

        <span className="ml-[12px] shrink-0 text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#42444C]">
          {value.length}/10
        </span>
      </div>

      <div className="mt-[3px] flex h-[24px] items-center gap-[10px]">
        <img
          src={isError ? activeInfoIcon : infoIcon}
          alt=""
          className="h-[18px] w-[18px] shrink-0"
        />

        <p
          className={[
            "text-[16px] font-medium leading-[150%] tracking-[-0.48px]",
            isError ? "text-[#917DEC]" : "text-[#717379]",
          ].join(" ")}
        >
          {errorMessage || "다른 유저와 겹치지 않도록 입력해주세요."}
        </p>
      </div>
    </div>
  );
};

export default NicknameField;