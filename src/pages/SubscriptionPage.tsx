type Plan = {
  name: string;
  subtitle: string;
  price?: string;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "무료 (Free Tier)",
    subtitle: "핵심 기능을 가볍게 경험해보는 기본 요금제",
    features: [
      "폴더 생성 : 최대 6개",
      "폴더 내 자료 보관 : 최대 15개 제한(폴더당)",
      "티칭맵 생성 : 최대 5개 제한",
      "AI 챗봇 : 채팅 목록 저장 최대 10개 제한",
      "AI 챗봇 검색 하루 5회 제한",
    ],
  },
  {
    name: "구독형 (Premium Tier)",
    subtitle: "무제한 학습 분석 및 보관을 위한 고도화 요금제",
    price: "월 10,900원",
    features: [
      "폴더 생성 : 무제한 제공",
      "폴더 내 자료 보관 : 무제한 제공 (대용량 URL 아카이빙)",
      "티칭맵 생성 : 무제한 제공",
      "AI 챗봇 : 채팅 목록 무제한 저장",
    ],
  },
];

const SubscriptionPage = () => {
  const handlePayment = () => {
    console.log("구독 결제 시작");
  };

  return (
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden px-6 pt-[165px] text-[#bdb6ef]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-b from-[#917DEC00] to-[#30265F]" />

      <div className="relative mx-auto flex w-full max-w-[1070px] flex-col items-center">
        <div className="grid w-full grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-[118px]">
          {plans.map((plan) => (
            <article key={plan.name} className="flex flex-col items-center">
              <div className="mb-5 text-center font-['SUIT_Variable']">
                <h1 className="text-[13px] font-semibold leading-5 text-[#8f7cf0]">
                  {plan.name}
                </h1>
                <p className="mt-1 text-[11px] font-semibold leading-4 text-violet-300">
                  {plan.subtitle}
                </p>
              </div>

              <div className="relative flex h-[266px] w-full max-w-[470px] flex-col rounded-md border border-[#2a2937] bg-[#11121a] px-8 py-5">
                <h2 className="mb-12 text-center font-['Pretendard'] text-xs font-semibold leading-5 text-violet-100">
                  Service
                </h2>

                <ul className="list-disc space-y-[5px] pl-5 font-['SUIT_Variable'] text-xs font-medium leading-4 text-violet-200 marker:text-[#8f7cf0]">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                {plan.price && (
                  <div className="absolute -bottom-4 left-1/2 inline-flex h-10 min-w-[154px] -translate-x-1/2 items-center justify-center rounded-[5px] bg-[#8d78eb] px-6 font-['SUIT_Variable'] text-base font-medium leading-6 text-violet-50 outline outline-2 outline-violet-200">
                    {plan.price}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={handlePayment}
          className="mt-[162px] h-14 w-full max-w-[600px] rounded-[5px] bg-[#8d78eb] font-['SUIT_Variable'] text-base font-medium leading-6 text-violet-50 transition hover:bg-[#9b87f0] focus:outline-none focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 focus:ring-offset-[#090713]"
        >
          결제하기
        </button>
      </div>
    </section>
  );
};

export default SubscriptionPage;
