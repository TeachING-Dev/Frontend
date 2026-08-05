import { useNavigate } from "react-router-dom";
import AuthBrandLogo from "../components/auth/AuthBrandLogo";
import AuthPageLayout from "../components/auth/AuthPageLayout";
import PrimaryButton from "../components/common/PrimaryButton";

const SignupCompletePage = () => {
  const navigate = useNavigate();

  return (
    <AuthPageLayout contentClassName="relative min-h-screen">
      <div className="absolute left-1/2 top-0 h-[1019.6px] w-[1440px] origin-top -translate-x-1/2 scale-[0.75]">
        {/* TeachING 로고 */}
        <div className="absolute left-1/2 top-[150px] -translate-x-1/2">
          <AuthBrandLogo />
        </div>

        {/* 메인 이모티콘 + 우측 상단 별 */}
        <div className="absolute left-[calc(50%-8px)] top-[440px] h-[300px] w-[300px] -translate-x-1/2 overflow-visible">
          <img
            src="/character/Star17.svg"
            alt=""
            className="absolute -right-[8%] top-[8%] z-10 h-[18%] w-auto drop-shadow-[0_0_8px_rgba(145,125,236,0)]"
          />

          <img
            src="/character/SignupCompleteCharacter.png"
            alt=""
            className="absolute left-[5.15%] top-[6%] h-[93.53%] w-[91.51%] object-contain"
          />
        </div>

        {/* 아이콘 아래 112.97px */}
        <p className="absolute bottom-[85px] left-1/2 w-[640px] -translate-x-1/2 text-center font-['SUIT'] text-[20px] font-normal leading-[150%] tracking-[-0.6px] text-white">
          가입이 완료되었어요!
          <br />
          이제 나만의 학습을 시작해보세요.
        </p>

        {/* 텍스트 아래 24px */}
        <div className="absolute bottom-[0px] left-1/2 w-[640px] -translate-x-1/2">
          <PrimaryButton
            onClick={() => navigate("/")}
            className="!flex !h-[60px] !w-full !max-w-none items-center justify-center rounded-[5px] px-[50px] py-[20px]"
          >
            <span className="font-['SUIT'] text-[20px] font-normal leading-[150%] tracking-[-0.6px]">
              학습 시작하기
            </span>
          </PrimaryButton>
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default SignupCompletePage;
