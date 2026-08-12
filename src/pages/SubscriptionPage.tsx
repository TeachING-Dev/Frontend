import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  PaymentApiError,
  readyKakaoPay,
} from "../apis/payments";
import { getMyProfile } from "../apis/users";
import Toast from "../components/common/Toast";
import {
  activateSubscription,
  isPremiumMembership,
  isSubscriptionActive,
} from "../utils/subscription";

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
        value: "무제한 제공 (대량의 URL 아카이빙)",
      },
      { label: "티칭맵 생성", value: "무제한 제공" },
      { label: "AI 챗봇", value: "채팅 목록 무제한 저장" },
    ],
  },
];

const getPaymentToastMessage = (toast: string | null) => {
  if (toast === "canceled" || toast === "failed") {
    return "결제가 취소되었습니다.";
  }

  return "";
};

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedMobilePlan, setSelectedMobilePlan] =
    useState<"free" | "plus">("free");
  const [toastMessage, setToastMessage] = useState(() =>
    getPaymentToastMessage(
      new URLSearchParams(location.search).get("toast"),
    ),
  );
  const [isPaymentReadyLoading, setIsPaymentReadyLoading] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(isSubscriptionActive);
  const [isSubscriptionStatusLoaded, setIsSubscriptionStatusLoaded] =
    useState(isSubscriptionActive);
  const selectedMobilePlanData =
    selectedMobilePlan === "plus" ? plans[1] : plans[0];
  const paymentButtonText = !isSubscriptionStatusLoaded
    ? "구독 상태 확인 중"
    : isPremiumUser
      ? "TeachING Plus 구독 중"
      : "TeachING Plus로 시작하기";
  const locationState = location.state as
    | { showMyPageBack?: boolean; backTarget?: "mypage" | "chatbot" }
    | null;
  const backTarget =
    locationState?.backTarget ??
    (locationState?.showMyPageBack === true ? "mypage" : null);
  const shouldShowBackButton = backTarget !== null;

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    if (searchParams.has("toast")) {
      setSearchParams({}, { replace: true });
    }

    const toastTimer = window.setTimeout(() => {
      setToastMessage("");
    }, 2000);

    return () => {
      window.clearTimeout(toastTimer);
    };
  }, [searchParams, setSearchParams, toastMessage]);

  useEffect(() => {
    const loadSubscriptionStatus = async () => {
      try {
        const profile = await getMyProfile();
        const hasPremiumMembership =
          isPremiumMembership(
            profile.membershipType,
          );

        if (hasPremiumMembership) {
          activateSubscription();
        }

        setIsPremiumUser(hasPremiumMembership);
        setIsSubscriptionStatusLoaded(true);
      } catch (error) {
        console.error(error);
        setIsSubscriptionStatusLoaded(
          isSubscriptionActive(),
        );
      }
    };

    void loadSubscriptionStatus();
  }, []);

  const syncSubscriptionStatus = async () => {
    const profile = await getMyProfile();
    const hasPremiumMembership =
      isPremiumMembership(
        profile.membershipType,
      );

    if (hasPremiumMembership) {
      activateSubscription();
    }

    setIsPremiumUser(hasPremiumMembership);
    setIsSubscriptionStatusLoaded(true);
    return hasPremiumMembership;
  };

  const handlePayment = async () => {
    if (
      !isSubscriptionStatusLoaded ||
      isPremiumUser ||
      isPaymentReadyLoading
    ) {
      return;
    }

    try {
      setIsPaymentReadyLoading(true);
      const hasPremiumMembership =
        await syncSubscriptionStatus();

      if (hasPremiumMembership) {
        setToastMessage("");
        return;
      }

      const redirectUrl = await readyKakaoPay();
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);

      if (
        error instanceof PaymentApiError &&
        error.code === "PAYMENT4091"
      ) {
        activateSubscription();
        setIsPremiumUser(true);
        setToastMessage("");
        return;
      }
      setToastMessage("결제가 취소되었습니다.");
    } finally {
      setIsPaymentReadyLoading(false);
    }
  };

  return (
    <section className="relative h-[calc(100vh-64px)] overflow-hidden px-6 text-violet-50">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-b from-[#917DEC00] to-[#30265F]" />

      <button
        type="button"
        onClick={() => {
          if (backTarget === "mypage") {
            navigate("/mypage");
            return;
          }

          if (backTarget === "chatbot") {
            navigate("/chatbot");
            return;
          }

          navigate(-1);
        }}
        className={`absolute left-[138px] top-[20px] z-10 flex origin-top-left scale-[0.75] items-center gap-[8px] text-[#E8E8E8] max-md:left-5 max-md:top-2 max-md:scale-100 ${
          shouldShowBackButton ? "" : "md:hidden"
        }`}
      >
        <img
          src="/Chevron-down.svg"
          alt=""
          className="size-12 max-md:hidden"
        />
        <img
          src="/Chevron-down-mobile.svg"
          alt=""
          className="hidden size-6 max-md:block"
        />
        <span className="hidden font-['SUIT'] text-[36px] font-medium leading-[150%] tracking-[-1.08px]">
          구독하기
        </span>
        <span className="font-['SUIT'] text-[36px] font-medium leading-[150%] tracking-[-1.08px] max-md:text-[16px] max-md:font-normal max-md:tracking-normal">
          구독하기
        </span>
      </button>

      <div className="hidden max-md:absolute max-md:left-4 max-md:top-[53px] max-md:block max-md:w-[calc(100%-32px)] max-md:text-left">
        <h1 className="font-['SUIT'] text-[18px] font-normal leading-[150%] text-white">
          학습의 한계를 없애보세요
        </h1>
        <p className="mt-1 font-['SUIT'] text-[13px] font-normal leading-[150%] text-[#A1A1A5]">
          정리부터 분석까지, 더 자유롭게 이용하세요.
        </p>
      </div>

      <div className="hidden max-md:absolute max-md:left-2.5 max-md:top-[147.5px] max-md:flex max-md:w-[calc(100%-20px)] max-md:gap-2.5">
        <button
          type="button"
          onClick={() => setSelectedMobilePlan("free")}
          className={`h-[41px] w-[181.5px] rounded-[5px] font-['SUIT'] text-[14px] font-normal leading-[150%] text-[#F4F1FF] ${
            selectedMobilePlan === "free"
              ? "border-[0.7px] border-[#917DEC] bg-[#13151F] shadow-[inset_0_0_20px_0_rgba(145,125,236,0.60)]"
              : "bg-[#1F212A]"
          }`}
        >
          현재 플랜
        </button>
        <button
          type="button"
          onClick={() => setSelectedMobilePlan("plus")}
          className={`h-[41px] w-[181.5px] rounded-[5px] font-['SUIT'] text-[14px] font-normal leading-[150%] text-[#F4F1FF] ${
            selectedMobilePlan === "plus"
              ? "border-[0.7px] border-[#917DEC] bg-[#13151F] shadow-[inset_0_0_20px_0_rgba(145,125,236,0.60)]"
              : "bg-[#1F212A]"
          }`}
        >
          TeachING Plus (구독형)
        </button>
      </div>

      <p className="hidden max-md:absolute max-md:left-4 max-md:top-[229.5px] max-md:block max-md:w-[calc(100%-32px)] max-md:font-['SUIT'] max-md:text-[13px] max-md:font-normal max-md:leading-[150%] max-md:text-[#D9CDFF]">
        {selectedMobilePlanData.subtitle}
      </p>

      <ul className="hidden max-md:absolute max-md:left-6 max-md:top-[268px] max-md:block max-md:w-[calc(100%-48px)] max-md:space-y-1 max-md:font-['SUIT'] max-md:text-[16px] max-md:font-medium max-md:leading-[200%] max-md:tracking-[-0.48px]">
        {selectedMobilePlanData.features.map((feature) => (
          <li key={`${feature.label}-${feature.value}`}>
            <span className="mr-2 text-[#917DEC]">
              •
            </span>
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

      {selectedMobilePlan === "plus" ? (
        <div className="hidden max-md:absolute max-md:bottom-[171px] max-md:left-4 max-md:flex max-md:h-[70px] max-md:w-[361px] max-md:items-center max-md:rounded-[5px] max-md:border-[1.25px] max-md:border-[#917DEC] max-md:bg-[#0B0A18]">
          <img
            src="/TermsCheck.svg"
            alt=""
            className="ml-[14px] size-7"
          />
          <div className="ml-3 font-['SUIT']">
            <p className="text-[16px] font-normal leading-[150%] text-white">
              월간 구독
            </p>
            <p className="text-[13px] font-normal leading-[150%] text-[#717379]">
              매월 자동 갱신
            </p>
          </div>
          <p className="ml-auto mr-[14px] font-['SUIT'] text-[20px] font-normal leading-[150%] text-[#917DEC]">
            ₩10,900 / 월
          </p>
        </div>
      ) : null}

      <div className="hidden max-md:absolute max-md:bottom-[95px] max-md:left-4 max-md:block max-md:w-[361px] max-md:text-center">
        <button
          type="button"
          onClick={() => void handlePayment()}
          disabled={
            !isSubscriptionStatusLoaded ||
            isPremiumUser ||
            isPaymentReadyLoading
          }
          className="h-12 w-[361px] rounded-[5px] bg-[#917DEC] font-['SUIT'] text-[16px] font-normal leading-[150%] text-[#F4F1FF] shadow-[0_0_50px_0_rgba(145,125,236,0.50)] disabled:cursor-default"
        >
          {paymentButtonText}
        </button>
      </div>

      <div className="hidden max-md:absolute max-md:bottom-[56px] max-md:left-4 max-md:block max-md:w-[361px] max-md:text-center">
        <p className="font-['SUIT'] text-[10px] font-normal leading-[150%] text-[#8F91A3]">
          언제든지 취소할 수 있어요
        </p>
        <p className="font-['SUIT'] text-[10px] font-normal leading-[150%] text-[#6B6E80] underline">
          이용약관  ·  개인정보 처리방침
        </p>
      </div>

      {toastMessage ? (
        <Toast message={toastMessage} variant="compact" />
      ) : null}

      <div className="relative flex h-full origin-top justify-center pt-[130px] max-md:hidden">
        <div className="w-[125%] max-w-[1406px] origin-top scale-[0.8]">
          <div className="mx-auto flex w-full max-w-[1300px] flex-col items-center">
            <div className="grid w-full grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-[210px]">
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

                  <div
                    className={`relative w-[540px] rounded-[10px] ${
                      plan.price
                        ? "border-2 border-[#917DEC]"
                        : "bg-gradient-to-r from-[#FFFFFF]/20 to-[#4E4E4E]/30 p-[1px]"
                    }`}
                  >
                    <div className="relative flex h-72 w-full flex-col rounded-[9px] bg-[#13151F] p-5 text-left">
                      <h2 className="mb-10 text-center font-['SUIT'] text-[18px] font-normal leading-7 tracking-normal text-violet-200">
                        {plan.price ? "추천 플랜" : "현재 플랜"}
                      </h2>

                      <ul className="list-disc space-y-0.5 pl-7 font-['SUIT'] text-[18px] font-normal leading-[150%] tracking-normal marker:text-[#917DEC]">
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
              onClick={() => void handlePayment()}
              disabled={
                !isSubscriptionStatusLoaded ||
                isPremiumUser ||
                isPaymentReadyLoading
              }
              className="mt-[82px] h-14 w-full max-w-[640px] rounded-[5px] border border-[rgba(145,125,236,0)] bg-[#917DEC] font-['SUIT'] text-xl font-normal leading-8 tracking-normal text-violet-50 shadow-[0_0_30px_0_#917DEC] transition hover:bg-[#9b87f0] focus:outline-none disabled:cursor-default"
            >
              {paymentButtonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPage;
