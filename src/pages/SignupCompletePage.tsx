import { useNavigate } from "react-router-dom";
import AuthBrandLogo from "../components/auth/AuthBrandLogo";
import AuthPageLayout from "../components/auth/AuthPageLayout";
import PrimaryButton from "../components/common/PrimaryButton";

const SignupCompletePage = () => {
  const navigate = useNavigate();
  const completeText1 = "가입이 완료되었어요!";
  const completeText2 = "이제 나만의 학습을 시작해보세요.";
  const startText = "학습 시작하기";
  const mobileButtonText = "동의하고 가입하기";

  return (
    <AuthPageLayout contentClassName="relative min-h-screen">
      <div className="absolute left-1/2 top-0 h-[1019.6px] w-[1440px] origin-top -translate-x-1/2 scale-[0.75] max-md:left-0 max-md:h-screen max-md:w-full max-md:translate-x-0 max-md:scale-100">
        <div className="absolute left-1/2 top-[150px] -translate-x-1/2 max-md:hidden">
          <AuthBrandLogo />
        </div>

        <div className="absolute left-1/2 top-[172.5px] hidden h-[95.2px] w-[215px] -translate-x-1/2 max-md:block">
          <AuthBrandLogo
            gapClassName="gap-10 max-md:gap-[20px]"
            starClassName="max-md:h-[39px] max-md:w-[35px]"
            textClassName="max-md:w-[215px]"
          />
        </div>

        <div className="absolute left-[calc(50%-8px)] top-[440px] h-[300px] w-[300px] -translate-x-1/2 overflow-visible max-md:left-1/2 max-md:top-[328px] max-md:h-[136px] max-md:w-[136px]">
          <img
            src="/character/Star17.svg"
            alt=""
            className="absolute -right-[8%] top-[8%] z-10 h-[18%] w-auto drop-shadow-[0_0_8px_rgba(145,125,236,0)] max-md:top-[4px] max-md:h-[24.8px] max-md:w-[22.4px]"
          />

          <img
            src="/character/SignupCompleteCharacter.png"
            alt=""
            className="absolute left-[5.15%] top-[6%] h-[93.53%] w-[91.51%] object-contain max-md:hidden"
          />

          <img
            src="/SignupCompleteStar.svg"
            alt=""
            className="absolute left-[5.15%] top-[6%] hidden h-[93.53%] w-[91.51%] max-md:left-0 max-md:top-0 max-md:block max-md:h-[136px] max-md:w-[136px]"
          />
        </div>

        <p className="absolute bottom-[85px] left-1/2 w-[640px] -translate-x-1/2 text-center font-['SUIT'] text-[20px] font-normal leading-[150%] tracking-[-0.6px] text-white max-md:bottom-auto max-md:top-[483.4px] max-md:text-[16px] max-md:tracking-[-0.48px]">
          {completeText1}
          <br />
          {completeText2}
        </p>

        <div className="absolute bottom-[0px] left-1/2 w-[640px] -translate-x-1/2 max-md:hidden">
          <PrimaryButton
            onClick={() => navigate("/")}
            className="!flex !h-[60px] !w-full !max-w-none items-center justify-center rounded-[5px] px-[50px] py-[20px]"
          >
            <span className="font-['SUIT'] text-[20px] font-normal leading-[150%] tracking-[-0.6px]">
              {startText}
            </span>
          </PrimaryButton>
        </div>

        <div className="absolute bottom-[66px] left-1/2 hidden w-[361px] -translate-x-1/2 max-md:block">
          <PrimaryButton
            onClick={() => navigate("/")}
            className="!flex !h-[48px] !w-full !max-w-none items-center justify-center gap-[10px] rounded-[5px] px-[50px] py-[20px] !font-['SUIT'] !text-[16px] !font-normal !leading-[150%] !tracking-[-0.48px]"
          >
            {mobileButtonText}
          </PrimaryButton>
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default SignupCompletePage;
