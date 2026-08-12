import { useNavigate } from "react-router-dom";
import AuthBrandLogo from "../components/auth/AuthBrandLogo";
import AuthPageLayout from "../components/auth/AuthPageLayout";
import PrimaryButton from "../components/common/PrimaryButton";

const SignupCompletePage = () => {
  const navigate = useNavigate();

  return (
    <AuthPageLayout contentClassName="relative min-h-screen">
      <div className="absolute left-1/2 top-0 h-[1019.6px] w-[1440px] origin-top -translate-x-1/2 scale-[0.75] max-md:left-0 max-md:h-screen max-md:w-full max-md:translate-x-0 max-md:scale-100">
        {/* TeachING 로고 */}
        <div className="absolute left-1/2 top-[120px] -translate-x-1/2 max-md:top-[172.5px] max-md:h-[95.2px] max-md:w-[215px]">
          <AuthBrandLogo
            gapClassName="gap-10 max-md:gap-[20px]"
            starClassName="max-md:h-[39px] max-md:w-[35px]"
            textClassName="max-md:w-[215px]"
          />
        </div>

        {/* 메인 이모티콘 + 우측 상단 별 */}
        <div className="absolute left-1/2 top-[368px] h-[260px] w-[260px] -translate-x-1/2 overflow-visible max-md:top-[328px] max-md:h-[136px] max-md:w-[136px]">
          <img
            src="/character/Star17.svg"
            alt=""
            className="absolute -right-[8%] -top-[9%] z-10 h-[22%] w-auto drop-shadow-[0_0_8px_rgba(145,125,236,0.9)] max-md:top-[4px] max-md:h-[24.8px] max-md:w-[22.4px]"
          />

          <img
            src="/SignupCompleteStar.svg"
            alt=""
            className="absolute left-[5.15%] top-[6%] h-[93.53%] w-[91.51%] max-md:left-0 max-md:top-0 max-md:h-[136px] max-md:w-[136px]"
          />
        </div>

        {/* 아이콘 아래 112.97px */}
        <p className="absolute bottom-[260px] left-1/2 w-[640px] -translate-x-1/2 text-center font-['SUIT'] text-[20px] font-normal leading-[150%] tracking-[-0.6px] text-white max-md:bottom-auto max-md:top-[483.4px] max-md:text-[16px] max-md:tracking-[-0.48px]">
          가입이 완료되었어요!
          <br />
          이제 나만의 학습을 시작해보세요.
        </p>

        {/* 텍스트 아래 24px */}
        <div className="absolute bottom-[176px] left-1/2 w-[640px] -translate-x-1/2 max-md:hidden">
          <PrimaryButton
            onClick={() => navigate("/")}
            className="!flex !h-[60px] !w-full !max-w-none items-center justify-center rounded-[5px] px-[50px] py-[20px]"
          >
            <span className="font-['SUIT'] text-[20px] font-normal leading-[150%] tracking-[-0.6px]">
              학습 시작하기
            </span>
          </PrimaryButton>
        </div>

        <div className="absolute bottom-[66px] left-1/2 hidden w-[361px] -translate-x-1/2 max-md:block">
          <PrimaryButton
            onClick={() => navigate("/")}
            className="!flex !h-[48px] !w-full !max-w-none items-center justify-center gap-[10px] rounded-[5px] px-[50px] py-[20px] !font-['SUIT'] !text-[16px] !font-normal !leading-[150%] !tracking-[-0.48px]"
          >
            학습 시작하기
          </PrimaryButton>
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default SignupCompletePage;
