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
      className="h-[178px] w-[736px] resize-none rounded-[5px] bg-[#1F212A] px-[20px] py-[14px] text-[20px] font-medium leading-[150%] tracking-[-0.6px] text-[#D0D0D2] outline-none placeholder:text-[#717379]"
    />
  );
};

export default WithdrawalOtherInput;