import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyPageBackHeader from "../../components/myPage/MyPageBackHeader";
import WithdrawalConfirmField from "../../components/myPage/WithdrawalConfirmField";

const MyPageWithdrawalConfirmPage = () => {
  const navigate = useNavigate();

  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleNextClick = () => {
    if (!isConfirmed) {
      return;
    }

    navigate("/mypage/withdrawal-complete");
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
      </section>

      <button
        type="button"
        disabled={!isConfirmed}
        onClick={handleNextClick}
        className={[
          "mx-auto mt-[590px] flex h-[60px] w-[640px] items-center justify-center rounded-[5px] px-[50px] py-[20px]",
          "text-[20px] font-medium leading-[150%] tracking-[-0.6px]",
          isConfirmed
            ? "bg-[#917DEC] text-[#FAFAFA]"
            : "cursor-default bg-[#1F212A] text-[#717379]",
        ].join(" ")}
      >
        다음
      </button>
    </main>
  );
};

export default MyPageWithdrawalConfirmPage;