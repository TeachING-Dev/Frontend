import { useNavigate } from "react-router-dom";

import AuthPageLayout from "../components/auth/AuthPageLayout";
import PrimaryButton from "../components/common/PrimaryButton";

const SubscriptionCompletePage = () => {
  const navigate = useNavigate();

  return (
    <AuthPageLayout contentClassName="items-center">
      <div className="flex h-full w-full origin-top scale-[0.8] flex-col items-center pt-[16vh]">
      <div className="flex w-full justify-center">
        <img
          src="/logo/login-brand-logo.png"
          alt="TeachING"
          className="h-auto w-[480px] object-contain"
        />
      </div>

      <div className="mt-[8vh] flex w-full flex-col items-center gap-[5vh]">
        <div className="relative h-[min(32vh,330px)] w-[min(32vh,330px)] min-h-[290px] min-w-[290px] overflow-visible">
          <img
            src="/character/Star17.svg"
            alt=""
            className="absolute -right-[8%] top-[7%] z-10 h-[16%] w-auto drop-shadow-[0_0_8px_rgba(145,125,236,0.9)]"
          />
          <img
            src="/character/SignupCompleteCharacter.png"
            alt=""
            className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        </div>
      </div>

      <div className="mb-0 mt-auto flex w-full translate-y-[110px] flex-col items-center gap-6">
        <p className="w-96 text-center font-['SUIT'] text-[20px] font-normal leading-8 text-white">
          구독이 완료되었어요!
          <br />
          이제 무제한으로 서비스를 이용해 보세요.
        </p>

        <PrimaryButton className="max-w-[640px]" onClick={() => navigate("/")}>
          <span className="font-['SUIT'] text-[20px] font-normal leading-[150%] tracking-[-0.6px]">
            학습 시작하기
          </span>
        </PrimaryButton>
      </div>
      </div>
    </AuthPageLayout>
  );
};

export default SubscriptionCompletePage;
