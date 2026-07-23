import WithdrawalReasonItem from "./WithdrawalReasonItem";

export type WithdrawalReason =
  | "rejoin"
  | "unused"
  | "accuracy"
  | "other";

interface WithdrawalReasonListProps {
  selectedReason: WithdrawalReason | null;
  onChange: (reason: WithdrawalReason) => void;
}

const WithdrawalReasonList = ({
  selectedReason,
  onChange,
}: WithdrawalReasonListProps) => {
  const reasons: Array<{
    value: WithdrawalReason;
    label: string;
  }> = [
    {
      value: "rejoin",
      label: "재가입을 희망해요",
    },
    {
      value: "unused",
      label: "자주 사용하지 않아요.",
    },
    {
      value: "accuracy",
      label: "AI 요약이나 티칭맵의 정확도가 아쉬워요.",
    },
    {
      value: "other",
      label: "기타",
    },
  ];

  return (
    <div className="flex w-[1120px] flex-col items-start gap-[17px]">
      {reasons.map((reason) => (
        <WithdrawalReasonItem
          key={reason.value}
          label={reason.label}
          selected={selectedReason === reason.value}
          onClick={() => onChange(reason.value)}
        />
      ))}
    </div>
  );
};

export default WithdrawalReasonList;