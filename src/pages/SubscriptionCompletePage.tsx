import { useNavigate } from "react-router-dom";

import AuthPageLayout from "../components/auth/AuthPageLayout";
import PrimaryButton from "../components/common/PrimaryButton";

const SubscriptionCompletePage = () => {
  const navigate = useNavigate();

  return (
    <AuthPageLayout contentClassName="items-center">
      <div className="relative flex h-full w-full origin-top scale-[0.8] flex-col items-center pt-[16vh] max-md:scale-100 max-md:pt-0">
        <div className="flex w-full justify-center max-md:absolute max-md:left-1/2 max-md:top-28 max-md:w-[215px] max-md:-translate-x-1/2">
          <img
            src="/logo/login-brand-logo.png"
            alt="TeachING"
            className="h-auto w-[480px] object-contain max-md:h-[95.2px] max-md:w-[215px]"
          />
        </div>

        <div className="mt-[12vh] flex w-full flex-col items-center gap-[5vh] max-md:absolute max-md:left-1/2 max-md:top-[287.2px] max-md:mt-0 max-md:w-[170px] max-md:-translate-x-1/2">
          <div className="relative h-[min(32vh,330px)] w-[min(32vh,330px)] min-h-[290px] min-w-[290px] overflow-visible max-md:size-[170px] max-md:min-h-0 max-md:min-w-0">
            <img
              src="/character/Star17.svg"
              alt=""
              className="absolute -right-[8%] top-[7%] z-10 h-[16%] w-auto drop-shadow-[0_0_8px_rgba(145,125,236,0.9)] max-md:left-[158px] max-md:top-[5px] max-md:h-[31px] max-md:w-[28px] max-md:max-w-none"
            />
            <img
              src="/character/SignupCompleteCharacter.png"
              alt=""
              className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-contain"
            />
          </div>
        </div>

        <div className="mb-0 mt-auto flex w-full translate-y-[110px] flex-col items-center gap-6 max-md:absolute max-md:bottom-[66px] max-md:left-0 max-md:mt-0 max-md:translate-y-0 max-md:gap-0">
          <p className="w-96 text-center font-['SUIT'] text-[20px] font-normal text-white max-md:mb-[193px] max-md:w-full max-md:text-[16px] max-md:leading-[150%]">
            구독이 완료되었어요!
            <br />
            이제 무제한으로 서비스를 이용해 보세요.
          </p>

          <PrimaryButton className="max-w-[640px] max-md:h-12 max-md:w-[361px]" onClick={() => navigate("/")}>
            <span className="font-['SUIT'] text-[20px] font-normal leading-[150%] tracking-[-0.6px] max-md:text-[16px] max-md:tracking-normal">
              학습 시작하기
            </span>
          </PrimaryButton>
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default SubscriptionCompletePage;
