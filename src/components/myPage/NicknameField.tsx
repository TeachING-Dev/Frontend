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
    <div className="flex w-full flex-col lg:w-[736px]">
      <label
        htmlFor="nickname"
        className="mb-[10px] w-fit text-[16px] font-semibold leading-[24px] tracking-[-0.4px] text-[#717379] lg:text-[28px] lg:font-bold lg:leading-[150%] lg:tracking-[-0.84px]"
      >
        <span className="relative inline-block">
          닉네임

          <span className="absolute -right-[10px] top-[-3px] text-[16px] font-bold leading-none text-[#717379] lg:-right-[15px] lg:top-[-7px] lg:text-[28px]">
            *
          </span>
        </span>
      </label>

      <div
        className={[
          "flex h-[50px] w-full items-center rounded-[5px] bg-[#1F212A] px-[15px] lg:h-[60px] lg:px-[20px]",
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
          className="min-w-0 flex-1 bg-transparent text-[13px] font-medium leading-[150%] tracking-[-0.325px] text-[#D0D0D2] outline-none placeholder:text-[#42444C] lg:text-[20px] lg:font-semibold lg:tracking-[-0.6px]"
        />

        <span className="ml-[8px] shrink-0 text-[12px] font-medium leading-[150%] tracking-[-0.3px] text-[#42444C] lg:ml-[12px] lg:text-[16px] lg:tracking-[-0.48px]">
          {value.length}/10
        </span>
      </div>

      <div className="mt-[3px] flex min-h-[18px] items-center gap-[6px] lg:h-[24px] lg:gap-[10px]">
        <img
          src={isError ? activeInfoIcon : infoIcon}
          alt=""
          className="h-[14px] w-[14px] shrink-0 lg:h-[18px] lg:w-[18px]"
        />

        <p
          className={[
            "text-[12px] font-medium leading-[18px] tracking-[-0.3px] lg:text-[16px] lg:leading-[150%] lg:tracking-[-0.48px]",
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
