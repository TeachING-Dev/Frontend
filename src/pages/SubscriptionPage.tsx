import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Feature = {
  label: string;
  value: string;
};

type Plan = {
  name: string;
  subtitle: string;
  price?: string;
  features: Feature[];
};

const plans: Plan[] = [
  {
    name: "무료 (Free Tier)",
    subtitle: "핵심 기능을 가볍게 경험해보는 기본 요금제",
    features: [
      { label: "폴더 생성", value: "최대 6개" },
      { label: "폴더 내 자료 보관", value: "최대 15개 제한(폴더당)" },
      { label: "티칭맵 생성", value: "최대 5개 제한" },
      { label: "AI 챗봇", value: "채팅 목록 저장 최대 10개 제한" },
      { label: "AI 챗봇 검색", value: "하루 5회 제한" },
    ],
  },
  {
    name: "구독형 (Premium Tier)",
    subtitle: "무제한 학습 분석 및 보관을 위한 고도화 요금제",
    price: "월 10,900원",
    features: [
      { label: "폴더 생성", value: "무제한 제공" },
      { label: "폴더 내 자료 보관", value: "무제한 제공 (대용량 URL 아카이빙)" },
      { label: "티칭맵 생성", value: "무제한 제공" },
      { label: "AI 챗봇", value: "채팅 목록 무제한 저장" },
    ],
  },
];

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate("/subscription/complete");
  };

  return (
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden px-6 pb-[120px] pt-[124px] text-violet-50">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-b from-[#917DEC00] to-[#30265F]" />

      <div className="relative mx-auto flex w-full max-w-[1125px] flex-col items-center">
        <div className="grid w-full grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-[125px]">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.name;

            return (
              <article key={plan.name} className="flex flex-col items-center">
                <div className="mb-5 text-center font-['SUIT']">
                  <h1 className="text-xl font-semibold leading-[140%] tracking-normal text-[#917DEC]">
                    {plan.name}
                  </h1>
                  <p className="mt-[5px] text-base font-medium leading-6 tracking-normal text-violet-300">
                    {plan.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPlan(plan.name)}
                  aria-pressed={isSelected}
                  className={`relative flex h-72 w-full max-w-[500px] flex-col rounded-[7px] border-2 border-[rgba(145,125,236,0)] bg-[#13151F] p-5 text-left transition ${
                    isSelected ? "shadow-[0_0_50px_0_rgba(145,125,236,0.50)]" : ""
                  }`}
                >
                  <h2 className="mb-10 text-center font-['Pretendard'] text-lg font-semibold leading-7 tracking-normal text-violet-200">
                    Service
                  </h2>

                  <ul className="list-disc space-y-0.5 pl-7 font-['SUIT'] text-lg font-medium leading-[150%] tracking-normal marker:text-[#917DEC]">
                    {plan.features.map((feature) => (
                      <li key={`${feature.label}-${feature.value}`}>
                        <span className="text-[#917DEC]">{feature.label}</span>
                        <span className="text-[#D9CDFF]"> : {feature.value}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.price && (
                    <div className="absolute -bottom-5 left-1/2 inline-flex h-10 min-w-40 -translate-x-1/2 items-center justify-center rounded-[5px] bg-[#917DEC] px-6 font-['SUIT'] text-xl font-medium leading-8 tracking-normal text-violet-50 outline outline-2 outline-violet-200">
                      {plan.price}
                    </div>
                  )}
                </button>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handlePayment}
          className="mt-[82px] h-14 w-full max-w-[640px] rounded-[5px] bg-[#917DEC] font-['SUIT'] text-xl font-medium leading-8 tracking-normal text-violet-50 transition hover:bg-[#9b87f0] focus:outline-none focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 focus:ring-offset-[#090713]"
        >
          결제하기
        </button>
      </div>
    </section>
  );
};

export default SubscriptionPage;
