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
    <main className="flex min-h-[calc(100dvh-64px)] flex-col px-[20px] pb-[32px] pt-[20px] lg:block lg:min-h-0 lg:px-[160px] lg:pb-[100px] lg:pt-[40px]">
      <MyPageBackHeader title="탈퇴하기" />

      <section className="mt-[16px] lg:mt-[50px]">
        <h2 className="mb-[18px] text-[18px] font-medium leading-[150%] tracking-[-0.54px] text-[#D0D0D2] lg:mb-[50px] lg:ml-[53px] lg:text-[24px] lg:font-semibold lg:tracking-[-0.72px] lg:text-[#717379]">
          탈퇴 사유를 선택해주세요. <span aria-hidden="true">*</span>
        </h2>
        <WithdrawalReasonList
          selectedReason={selectedReason}
          onChange={handleReasonChange}
        />

        {isOtherReasonSelected && (
          <div className="ml-[35px] mt-[10px] lg:ml-[54.7px] lg:mt-[27px]">
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
          "mx-auto mt-auto flex h-[48px] w-full items-center justify-center rounded-[5px] p-[10px] lg:h-[60px] lg:w-[640px]",
          "text-[16px] font-medium leading-[150%] tracking-[-0.4px] lg:text-[20px] lg:tracking-[-0.6px]",
          isOtherReasonSelected ? "lg:mt-[262px]" : "lg:mt-[185px]",
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
