import AuthBrandLogo from "../components/auth/AuthBrandLogo";
import AuthPageLayout from "../components/auth/AuthPageLayout";

const LoginPage = () => {
  return (
    <AuthPageLayout contentClassName="relative min-h-screen">
      <div className="absolute left-1/2 top-0 hidden h-[1019.6px] w-full origin-top -translate-x-1/2 scale-[0.75] md:block">
        {/* 별 아이콘: 원본 기준 상단 206px */}
        <div className="absolute left-1/2 top-[206px] -translate-x-1/2">
          <AuthBrandLogo />
        </div>

        {/* 안내 문구: 원본 기준 상단 577px */}
        <div className="absolute left-1/2 top-[577px] flex w-[739px] -translate-x-1/2 flex-col items-center">
          <p className="text-center font-['SUIT'] text-[20px] font-normal leading-[150%] tracking-[-0.6px] text-[#F5F2FF]">
            간편 로그인으로
            <br />
            바로 학습을 시작해보세요!
          </p>

          <div className="mt-[24px] flex w-[739px] flex-col gap-[10px]">
            <button
  type="button"
  className="flex h-[60px] w-[739px] items-center pl-[280px] gap-[14px] rounded-[5px] bg-[#FDE500] font-['SUIT_Variable'] text-[20px] font-medium leading-[150%] tracking-[-0.6px] text-[#13151F]"
>
  <span className="flex w-[30px] justify-center">
    <img
      src="/Kakao.svg"
      alt=""
      className="h-[30px] w-[30px] shrink-0"
    />
  </span>

  <span>카카오로 시작하기</span>
</button>

            <button
  type="button"
  className="flex h-[60px] w-[739px] items-center pl-[280px] gap-[14px] rounded-[5px] bg-[#2B2C35] font-['SUIT_Variable'] text-[20px] font-medium leading-[150%] tracking-[-0.6px] text-[#A1A1A5]"
>
  <span className="flex w-[30px] justify-center">
    <img
      src="/Google.svg"
      alt=""
      className="h-[19.7px] w-[19.7px] shrink-0"
    />
  </span>

  <span>Google로 시작하기</span>
</button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 md:hidden">
        <div className="absolute left-1/2 top-[145px] -translate-x-1/2 [&>div>div>svg]:h-[36.1px] [&>div>div>svg]:w-[214.54px] [&>div>img]:h-[47px] [&>div>img]:w-[42px]">
          <AuthBrandLogo gapClassName="gap-7" />
        </div>

        <div className="absolute bottom-[75px] left-1/2 flex w-[361px] -translate-x-1/2 flex-col gap-[12px]">
          <p className="mb-[8px] text-center font-['SUIT'] text-[14px] font-normal leading-[150%] tracking-[-0.42px] text-[#F5F2FF]">
            간편 로그인으로
            <br />
            바로 학습을 시작해보세요!
          </p>

          <button
            type="button"
            className="flex h-[50px] w-[361px] items-center justify-center gap-[14px] rounded-[5px] bg-[#FDE500] font-['SUIT_Variable'] text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#13151F]"
          >
            <span className="flex w-[30px] justify-center">
              <img
                src="/Kakao.svg"
                alt=""
                className="h-[30px] w-[30px] shrink-0"
              />
            </span>

            <span>카카오로 시작하기</span>
          </button>

          <button
            type="button"
            className="flex h-[50px] w-[361px] items-center justify-center gap-[14px] rounded-[5px] bg-[#2B2C35] font-['SUIT_Variable'] text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#A1A1A5]"
          >
            <span className="flex w-[30px] justify-center">
              <img
                src="/Google.svg"
                alt=""
                className="h-[19.7px] w-[19.7px] shrink-0"
              />
            </span>

            <span>Google로 시작하기</span>
          </button>
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default LoginPage;
