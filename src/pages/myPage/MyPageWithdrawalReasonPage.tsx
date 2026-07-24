import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyPageBackHeader from "../../components/myPage/MyPageBackHeader";
import WithdrawalOtherInput from "../../components/myPage/WithdrawalOtherInput";
import WithdrawalReasonList, {
  type WithdrawalReason,
} from "../../components/myPage/WithdrawalReasonList";

const MyPageWithdrawalReasonPage = () => {
  const navigate = useNavigate();

  const [selectedReason, setSelectedReason] =
    useState<WithdrawalReason | null>(null);

  const [otherReason, setOtherReason] = useState("");

  const isOtherReasonSelected = selectedReason === "other";

  const isNextEnabled =
    selectedReason !== null &&
    (!isOtherReasonSelected || otherReason.trim().length > 0);

  const handleReasonChange = (reason: WithdrawalReason) => {
    setSelectedReason(reason);

    if (reason !== "other") {
      setOtherReason("");
    }
  };

  const handleNextClick = () => {
    if (!isNextEnabled) {
      return;
    }

    navigate("/mypage/withdrawal-confirm", {
      state: {
        reason: selectedReason,
        reasonDetail: isOtherReasonSelected
          ? otherReason.trim()
          : "",
      },
    });
  };

  return (
    <main className="min-h-full px-[160px] pb-[100px] pt-[40px]">
      <MyPageBackHeader
        title="회원 정보 수정"
        description="탈퇴 사유를 선택해주세요."
      />

      <section className="mt-[50px]">
        <WithdrawalReasonList
          selectedReason={selectedReason}
          onChange={handleReasonChange}
        />

        {isOtherReasonSelected && (
          <div className="ml-[54.7px] mt-[27px]">
            <WithdrawalOtherInput
              value={otherReason}
              onChange={setOtherReason}
            />
          </div>
        )}
      </section>

      <button
        type="button"
        disabled={!isNextEnabled}
        onClick={handleNextClick}
        className={[
          "mx-auto flex h-[60px] w-[640px] items-center justify-center rounded-[5px] p-[10px]",
          "text-[20px] font-medium leading-[150%] tracking-[-0.6px]",
          isOtherReasonSelected ? "mt-[262px]" : "mt-[185px]",
          isNextEnabled
            ? "bg-[#917DEC] text-[#FAFAFA]"
            : "cursor-default bg-[#1F212A] text-[#717379]",
        ].join(" ")}
      >
        다음
      </button>
    </main>
  );
};

export default MyPageWithdrawalReasonPage;