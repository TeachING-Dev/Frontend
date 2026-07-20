import { useNavigate } from "react-router-dom";
import AuthBrandLogo from "../components/auth/AuthBrandLogo";
import AuthPageLayout from "../components/auth/AuthPageLayout";
import PrimaryButton from "../components/common/PrimaryButton";

const SignupCompletePage = () => {
  const navigate = useNavigate();

  return (
    <AuthPageLayout contentClassName="pt-[11vh]">
      <AuthBrandLogo gapClassName="gap-8" />

      <div className="mt-[7vh] flex flex-col items-center gap-[5vh]">
        <div className="relative h-[min(28vh,288px)] w-[min(28vh,288px)] min-h-[190px] min-w-[190px] overflow-visible">
          <img
            src="/Star17.svg"
            alt=""
            className="absolute -right-[8%] -top-[9%] z-10 h-[22%] w-auto drop-shadow-[0_0_8px_rgba(145,125,236,0.9)]"
          />
          <img
            src="/Star1.png"
            alt=""
            className="absolute left-[5.15%] top-[2.67%] h-[93.53%] w-[91.51%] drop-shadow-[0_0_20.6px_rgba(145,125,236,1)]"
          />
          <div className="absolute left-[39.48%] top-[39.83%] h-[15.28%] w-[8.33%] rounded-xl bg-violet-300" />
          <div className="absolute left-[56.02%] top-[39.83%] h-[15.28%] w-[8.33%] rounded-xl bg-violet-300" />
          <div className="absolute left-[48.69%] top-[51.25%] size-[6.94%] rounded-full bg-violet-300" />
          <div className="absolute left-[61.69%] top-[41.76%] h-[4.17%] w-[1.39%] rounded-full border-[2.77px] border-indigo-50" />
          <div className="absolute left-[45.27%] top-[41.68%] h-[4.17%] w-[1.39%] rounded-full border-[2.77px] border-indigo-50" />
        </div>
      </div>

      <div className="mb-[7vh] mt-auto flex w-full flex-col items-center gap-6">
        <p className="w-96 text-center font-['SUIT_Variable'] text-xl font-semibold leading-8 text-white">
          가입이 완료되었어요!
          <br />
          이제 나만의 학습을 시작해보세요.
        </p>

        <PrimaryButton className="max-w-[640px]" onClick={() => navigate("/")}>학습 시작하기</PrimaryButton>
      </div>
    </AuthPageLayout>
  );
};

export default SignupCompletePage;
