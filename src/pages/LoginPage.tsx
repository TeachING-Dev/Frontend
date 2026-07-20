import AuthBrandLogo from "../components/auth/AuthBrandLogo";
import AuthPageLayout from "../components/auth/AuthPageLayout";

const LoginPage = () => {
  return (
    <AuthPageLayout contentClassName="pt-[19vh]">
      <AuthBrandLogo />

      <div className="mt-[12.5vh] flex w-full flex-col items-center">
        <p className="text-center font-['SUIT_Variable'] text-xl font-semibold leading-8 text-[#F5F2FF]">
          간편 로그인으로
          <br />
          바로 학습을 시작해보세요 !
        </p>

        <div className="mt-6 flex w-full max-w-[739px] flex-col gap-3.5">
          <button
            type="button"
            className="flex h-14 w-full items-center justify-center gap-3.5 rounded-[5px] bg-[#FDE500] font-['SUIT_Variable'] text-xl font-semibold leading-8 text-[#13151F]"
          >
            <span className="relative h-7 w-7 shrink-0 overflow-hidden bg-[#FDE500]">
              <span className="absolute left-[6px] top-[8px] h-4 w-4 rounded-full bg-black" />
              <span className="absolute left-[8px] top-[13px] h-1 w-3 rounded-full bg-[#FDE500]" />
            </span>
            카카오로 시작하기
          </button>

          <button
            type="button"
            className="flex h-14 w-full items-center justify-center gap-3.5 rounded-[5px] bg-[#2B2C35] font-['SUIT_Variable'] text-xl font-semibold leading-8 text-[#A1A1A5]"
          >
            <span className="relative h-7 w-7 shrink-0 overflow-hidden">
              <span className="absolute left-[4px] top-[5px] h-5 w-5 rounded-full border-[5px] border-[#4285F4]" />
              <span className="absolute left-[5px] top-[5px] h-[10px] w-[18px] rounded-t-full border-l-[5px] border-t-[5px] border-[#EA4335]" />
              <span className="absolute left-[4px] top-[13px] h-[9px] w-[17px] rounded-b-full border-b-[5px] border-l-[5px] border-[#34A853]" />
              <span className="absolute left-[4px] top-[10px] h-[9px] w-[6px] bg-[#FBBC05]" />
              <span className="absolute left-[15px] top-[13px] h-[5px] w-[10px] bg-[#4285F4]" />
            </span>
            Google로 시작하기
          </button>
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default LoginPage;
