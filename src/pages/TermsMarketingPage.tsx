import {
  useLocation,
  useNavigate,
} from "react-router-dom";

const marketingTermsContent = `수신 목적
신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여 기회 제공, 서비스 이용 통계 분석 및 이를 통한 서비스 개선·마케팅 활용

수집 항목
닉네임, 이메일(소셜 계정 정보), 서비스 이용기록(저장한 URL, 검색 이력, 학습 이력 등), 접속 로그, 기기정보

보유 및 이용 기간
회원 탈퇴 시 또는 동의 철회 시까지(단, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관)

동의 거부 권리 및 불이익 안내
회원은 본 동의를 거부할 권리가 있으며, 동의하지 않아도 서비스의 기본 기능 이용에는 제한이 없습니다. 다만, 맞춤형 콘텐츠 추천 및 혜택 안내 등 일부 부가 서비스 제공에 제한이 있을 수 있습니다.`;

const TermsMarketingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const signupState = location.state;

  return (
    <main className="min-h-screen overflow-y-auto bg-[#0B0A18] text-[#D0D0D2]">
      <header className="sticky top-0 z-20 flex h-[64px] items-center justify-center bg-[#090713] shadow-[0_0_80px_rgba(145,125,236,0.1)]">
        <img
          src="/logo/logo2.png"
          alt="TeachING"
          className="h-auto w-[170px]"
        />
      </header>

      <section className="mx-auto w-full max-w-[1440px] px-[120px] py-[7.5px]">
        <button
          type="button"
          onClick={() =>
            navigate("/signup", {
              state: {
                ...(signupState && typeof signupState === "object"
                  ? signupState
                  : {}),
                step: "terms",
              },
            })
          }
          className="mb-[25.5px] mt-[21px] flex items-center gap-[7.5px] font-['SUIT'] text-[28px] font-bold leading-[150%] tracking-[-0.84px] text-[#E8E8E8]"
        >
          <img
            src="/Chevron-down.svg"
            alt=""
            aria-hidden="true"
            className="size-12"
          />
          <span>[TeachING] 개인정보 마케팅 활용 동의</span>
        </button>

        <div className="inline-flex self-stretch items-center justify-start gap-[7.5px] px-0 py-[7.5px]">
          <h1 className="font-['SUIT'] text-[28px] font-bold leading-[150%] tracking-[-0.84px] text-neutral-300">
            회사는 회원에게 최적화된 맞춤형 서비스, 콘텐츠 추천 및 프로모션 정보를 제공하기 위해 아래와 같이 개인정보를 수집·이용하고자 합니다.
          </h1>
        </div>

        <article className="mt-6 w-full pb-[72px]">
          <p className="whitespace-pre-wrap font-['SUIT'] text-[18px] font-medium leading-[150%] tracking-[-0.54px] text-zinc-500">
            {marketingTermsContent}
          </p>
        </article>
      </section>
    </main>
  );
};

export default TermsMarketingPage;
