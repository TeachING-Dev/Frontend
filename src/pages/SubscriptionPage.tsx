import { useNavigate } from "react-router-dom";

import { activateSubscription } from "../utils/subscription";

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
    name: "TeachING Free (무료플랜)",
    subtitle: "핵심 기능을 가볍게 경험해보는 기본 요금제",
    features: [
      { label: "폴더 생성", value: "최대 6개" },
      { label: "폴더 내 자료 보관", value: "최대 15개 제한(폴더당)" },
      { label: "티칭맵 생성", value: "최대 5개 제한" },
      { label: "AI 챗봇", value: "채팅 목록 저장 최대 10개 제한" },
      { label: "AI 챗봇 검색 하루 5회 제한", value: "" },
    ],
  },
  {
    name: "TeachING Plus (구독형)",
    subtitle: "무제한 학습 분석 및 보관을 위한 고도화 요금제",
    price: "월 10,900원",
    features: [
      { label: "폴더 생성", value: "무제한 제공" },
      {
        label: "폴더 내 자료 보관",
        value: "무제한 제공 (대용량 URL 아카이빙)",
      },
      { label: "티칭맵 생성", value: "무제한 제공" },
      { label: "AI 챗봇", value: "채팅 목록 무제한 저장" },
    ],
  },
];

const SubscriptionPage = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    activateSubscription();
    navigate("/subscription/complete");
  };

  return (
    <section className="relative h-[calc(100vh-64px)] overflow-hidden px-6 text-violet-50">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-b from-[#917DEC00] to-[#30265F]" />

      <div className="relative flex h-full origin-top justify-center pt-[80px]">
        <div className="w-[125%] max-w-[1406px] origin-top scale-[0.8]">
          <div className="mx-auto flex w-full max-w-[1125px] flex-col items-center">
            <div className="grid w-full grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-[125px]">
              {plans.map((plan) => (
                <article
                  key={plan.name}
                  className="flex flex-col items-center"
                >
                  <div className="mb-5 text-center font-['SUIT']">
                    <h1 className="text-xl font-normal leading-[140%] tracking-normal text-[#917DEC]">
                      {plan.name}
                    </h1>

                    <p className="mt-[5px] text-base font-normal leading-6 tracking-normal text-violet-300">
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* 그라데이션 테두리 wrapper */}
                  <div className="relative w-full max-w-[500px] rounded-[10px] bg-gradient-to-r from-[#FFFFFF]/20 to-[#4E4E4E]/30 p-[1px]">
                    <div className="relative flex h-72 w-full flex-col rounded-[9px] bg-[#13151F] p-5 text-left">
                      <h2 className="mb-10 text-center font-['SUIT'] text-[17.5px] font-normal leading-7 tracking-normal text-violet-200">
                        {plan.price ? "추천 플랜" : "현재 플랜"}
                      </h2>

                      <ul className="list-disc space-y-0.5 pl-7 font-['SUIT'] text-[17.5px] font-normal leading-[150%] tracking-normal marker:text-[#917DEC]">
                        {plan.features.map((feature) => (
                          <li key={`${feature.label}-${feature.value}`}>
                            {feature.value ? (
                              <>
                                <span className="text-[#917DEC]">
                                  {feature.label}
                                </span>

                                <span className="text-[#D9CDFF]">
                                  {" "}
                                  : {feature.value}
                                </span>
                              </>
                            ) : (
                              <span className="text-[#D9CDFF]">
                                {feature.label}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>

                      {plan.price && (
  <div className="absolute -bottom-5 left-1/2 min-w-40 -translate-x-1/2 rounded-[6px] bg-gradient-to-r from-white to-[#917DEC] p-[1px]">
    <div className="flex h-10 w-full items-center justify-center rounded-[5px] bg-[#917DEC] px-6 font-['SUIT'] text-xl font-normal leading-8 tracking-normal text-violet-50">
      {plan.price}
    </div>
  </div>
)}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              onClick={handlePayment}
               className="mt-[82px] h-14 w-full max-w-[640px] rounded-[5px] border border-[rgba(145,125,236,0)] bg-[#917DEC] font-['SUIT'] text-xl font-normal leading-8 tracking-normal text-violet-50 shadow-[0_0_30px_0_#917DEC] transition hover:bg-[#9b87f0] focus:outline-none"
            >
              TeachING Plus로 시작하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPage;
