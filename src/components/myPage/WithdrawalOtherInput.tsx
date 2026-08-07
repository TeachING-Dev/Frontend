interface WithdrawalOtherInputProps {
  value: string;
  onChange: (value: string) => void;
}

const WithdrawalOtherInput = ({
  value,
  onChange,
}: WithdrawalOtherInputProps) => {
  return (
    <textarea
      value={value}
      placeholder="탈퇴 사유를 입력해주세요."
      onChange={(event) => onChange(event.target.value)}
      className="h-[79px] w-full resize-none rounded-[5px] bg-[#1F212A] p-[10px] text-[12px] font-normal leading-[150%] tracking-[-0.24px] text-[#D0D0D2] outline-none placeholder:text-[#A1A1A5] lg:h-[178px] lg:w-[736px] lg:px-[20px] lg:py-[14px] lg:text-[20px] lg:font-medium lg:tracking-[-0.6px] lg:placeholder:text-[#717379]"
    />
  );
};

export default WithdrawalOtherInput;
