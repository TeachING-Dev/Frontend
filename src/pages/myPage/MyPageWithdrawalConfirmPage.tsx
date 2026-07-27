import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { withdrawMe } from "../../apis/users";
import MyPageBackHeader from "../../components/myPage/MyPageBackHeader";
import WithdrawalConfirmField from "../../components/myPage/WithdrawalConfirmField";
import { clearTokens } from "../../utils/authToken";

const WITHDRAWAL_REASON_MAP = {
  rejoin: "REJOIN",
  unused: "RARELY_USED",
  accuracy: "LOW_ACCURANCY",
  other: "ETC",
} as const;

const MyPageWithdrawalConfirmPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [errorMessage, setErrorMessage] =
    useState("");

  const handleNextClick = async () => {
    if (!isConfirmed) {
      return;
    }

    const withdrawal = location.state as
      | {
          reason?: string;
          reasonDetail?: string;
        }
      | null;

    if (!withdrawal?.reason) {
      navigate("/mypage/withdrawal-reason");
      return;
    }

    const reason =
      WITHDRAWAL_REASON_MAP[
        withdrawal.reason as keyof typeof WITHDRAWAL_REASON_MAP
      ] ?? withdrawal.reason;
    const reasonDetail =
      withdrawal.reasonDetail ?? "";

    if (
      reason === "ETC" &&
      reasonDetail.trim().length === 0
    ) {
      setErrorMessage(
        "기타 사유를 입력해주세요.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");
      await withdrawMe({
        reason,
        reasonDetail,
        isConfirmed,
      });
      clearTokens();
      navigate("/mypage/withdrawal-complete", {
        replace: true,
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "회원 탈퇴에 실패했습니다. 잠시 후 다시 시도해주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-full px-[160px] pb-[100px] pt-[40px]">
      <MyPageBackHeader title="탈퇴하기" />

      <section className="mt-[50px]">
        <h2 className="text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#FAFAFA]">
          회원탈퇴를 진행하시겠습니까?
        </h2>

        <p className="mt-[4px] text-[18px] font-medium leading-[150%] tracking-[-0.54px] text-[#717379]">
          탈퇴 시, 가입된 회원 정보가 모두 삭제됩니다.
        </p>

        <div className="mt-[40px]">
          <WithdrawalConfirmField
            checked={isConfirmed}
            onChange={setIsConfirmed}
          />
        </div>

        {errorMessage && (
          <p
            role="alert"
            className="mt-[16px] text-[16px] font-medium leading-[150%] text-[#FF6B6B]"
          >
            {errorMessage}
          </p>
        )}
      </section>

      <button
        type="button"
        disabled={!isConfirmed || isSubmitting}
        onClick={handleNextClick}
        className={[
          "mx-auto mt-[590px] flex h-[60px] w-[640px] items-center justify-center rounded-[5px] px-[50px] py-[20px]",
          "text-[20px] font-medium leading-[150%] tracking-[-0.6px]",
          isConfirmed && !isSubmitting
            ? "bg-[#917DEC] text-[#FAFAFA]"
            : "cursor-default bg-[#1F212A] text-[#717379]",
        ].join(" ")}
      >
        {isSubmitting ? "탈퇴 처리 중..." : "다음"}
      </button>
    </main>
  );
};

export default MyPageWithdrawalConfirmPage;
