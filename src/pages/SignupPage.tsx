import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { ChevronLeft } from "lucide-react";
import PrimaryButton from "../components/common/PrimaryButton";

type SignupStep = "nickname" | "terms";
type TermKey = "age" | "service" | "marketing" | "event";

const REQUIRED_TERMS: TermKey[] = ["age", "service"];

const CheckIcon = ({
  checked,
  inverted = false,
}: {
  checked: boolean;
  inverted?: boolean;
}) => {
  if (checked) {
    return (
      <img
        src={inverted ? "/TermsCheckInverted.svg" : "/TermsCheck.svg"}
        alt=""
        className="size-6 shrink-0"
      />
    );
  }

  return (
    <span className="relative inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-zinc-700">
      <span className="h-2 w-3 translate-y-[-2px] rotate-[-45deg] border-b-[1.5px] border-l-[1.5px] border-zinc-500" />
    </span>
  );
};

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<SignupStep>("nickname");
  const [nickname, setNickname] = useState("");
  const [terms, setTerms] = useState<Record<TermKey, boolean>>({
    age: false,
    service: false,
    marketing: false,
    event: false,
  });

  const normalizedNickname = nickname.trim();
  const isNicknameTaken = normalizedNickname === "이미사용중";
  const isNicknameNextEnabled = normalizedNickname.length > 0 && !isNicknameTaken;
  const isAllTermsChecked = Object.values(terms).every(Boolean);
  const isTermsNextEnabled = REQUIRED_TERMS.every((key) => terms[key]);
  const isNextEnabled = step === "nickname" ? isNicknameNextEnabled : isTermsNextEnabled;

  const handleBack = () => {
    if (step === "terms") {
      setStep("nickname");
      return;
    }

    navigate("/login");
  };

  const handleNext = useCallback(() => {
    if (step === "nickname" && isNicknameNextEnabled) {
      setStep("terms");
      return;
    }

    if (step === "terms" && isTermsNextEnabled) {
      navigate("/signup/complete");
    }
  }, [isNicknameNextEnabled, isTermsNextEnabled, navigate, step]);

  useEffect(() => {
    const handleEnterKey = (event: KeyboardEvent) => {
      if (event.key !== "Enter" || event.isComposing || !isNextEnabled) {
        return;
      }

      const activeElement = document.activeElement as HTMLElement | null;
      const isNonNextButton =
        activeElement?.tagName === "BUTTON" &&
        activeElement.textContent?.trim() !== "다음";

      if (isNonNextButton) {
        return;
      }

      event.preventDefault();
      handleNext();
    };

    window.addEventListener("keydown", handleEnterKey);
    return () => window.removeEventListener("keydown", handleEnterKey);
  }, [handleNext, isNextEnabled]);

  const toggleTerm = (key: TermKey) => {
    setTerms((prevTerms) => ({
      ...prevTerms,
      [key]: !prevTerms[key],
    }));
  };

  const toggleAllTerms = () => {
    const nextChecked = !isAllTermsChecked;
    setTerms({
      age: nextChecked,
      service: nextChecked,
      marketing: nextChecked,
      event: nextChecked,
    });
  };

  return (
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-[#090713]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-violet-500/0 to-violet-500/30" />

       <div className="absolute left-1/2 top-0 h-[1019.6px] w-[1440px] origin-top -translate-x-1/2 scale-[0.75] max-md:w-[640px] max-md:scale-[0.5]">
        <div className="mb-10 flex items-center gap-2.5">
          <button
            type="button"
            aria-label="이전으로"
            onClick={handleBack}
            className="flex size-12 items-center justify-center text-[#FAFAFA]"
          >
            <ChevronLeft size={36} strokeWidth={2} />
          </button>
          <h1 className="font-['SUIT'] text-[28px] font-medium leading-[150%] tracking-[-0.84px] text-[#FAFAFA]">
            {step === "nickname" ? "회원가입" : "약관 동의"}
          </h1>
        </div>

        <div className="flex flex-1 flex-col justify-between">
          {step === "nickname" ? (
            <div className="flex flex-col gap-2.5">
              <h2 className="font-['SUIT'] text-[28px] font-medium leading-[150%] tracking-[-0.84px] text-[#717379]">
                닉네임
              </h2>

              <div className="flex w-full flex-col items-start gap-[10px]">
                <label className="flex h-14 w-[640px] items-center rounded-[5px] bg-[#1F212A] px-5 py-3.5">
                  <input
                    type="text"
                    value={nickname}
                    maxLength={10}
                    placeholder="(2~10자 이내의 한글, 영문, 숫자)"
                    onChange={(event) => setNickname(event.target.value.slice(0, 10))}
                    className="flex-1 bg-transparent font-['SUIT_Variable'] text-xl font-normal leading-8 text-neutral-50 outline-none placeholder:text-[#42444C]"
                  />
                  <span
                    className={`font-['SUIT_Variable'] text-base font-normal leading-6 ${
                      isNicknameNextEnabled ? "text-neutral-50" : "text-zinc-700"
                    }`}
                  >
                    {nickname.length}/10
                  </span>
                </label>

                {isNicknameTaken ? (
                  <div className="flex w-[1115px] items-start gap-2.5 max-md:w-[640px]">
                    <div className="flex h-12 items-start px-0.5 py-[3px]">
                      <img src="/SignupNoticeIcon.svg" alt="" className="size-5" />
                    </div>
                    <p className="w-80 justify-center font-['SUIT_Variable'] text-base font-normal leading-6 text-[#917DEC]">
                      이미 사용 중인 닉네임입니다.
                    </p>
                  </div>
                ) : isNicknameNextEnabled ? (
                  <div className="inline-flex w-[1115px] items-start justify-start gap-2.5 max-md:w-[640px]">
                    <p className="w-80 justify-center font-['SUIT_Variable'] text-base font-normal leading-6 text-[#917DEC]">
                      사용 가능한 아이디입니다.
                    </p>
                  </div>
                ) : (
                  <div className="flex w-[1115px] items-start gap-2.5 max-md:w-[640px]">
                    <div className="flex h-12 items-start px-0.5 py-[3px]">
                      <img src="/SignupNoticeIcon.svg" alt="" className="size-5" />
                    </div>
                    <p className="w-80 font-['SUIT_Variable'] text-base font-normal leading-6 text-[#717379]">
                      다른 유저와 겹치지 않도록 입력해주세요.
                      <br />
                      닉네임은 나중에 변경할 수 있습니다.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col items-start gap-2.5">
                <button
                  type="button"
                  onClick={toggleAllTerms}
                  className={`inline-flex h-14 w-[640px] items-center justify-start gap-[8px] rounded-[5px] px-7 py-3.5 ${
                    isAllTermsChecked ? "bg-[#917DEC]" : "bg-[#1F212A]"
                  }`}
                >
                  <CheckIcon checked={isAllTermsChecked} inverted />
                  <span
                    className={`font-['SUIT_Variable'] text-xl font-medium leading-8 ${
                      isAllTermsChecked ? "text-violet-50" : "text-[#717379]"
                    }`}
                  >
                    전체 동의하기 (선택 동의 포함)
                  </span>
                </button>
              </div>

              <div className="flex flex-col items-start gap-7">
                <div className="flex w-[640px] flex-col items-start gap-[4.56px] py-3">
                  <button
                    type="button"
                    onClick={() => toggleTerm("age")}
                    className="flex h-12 w-full items-center px-3.5 "
                  >
                    <div className="inline-flex w-48 items-center gap-[4.56px]">
                      <CheckIcon checked={terms.age} />
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <span className={`font-['SUIT'] text-base font-normal leading-6 ${terms.age ? "text-neutral-400" : "text-[#42444C]"}`}>
                          [필수]
                        </span>
                        <span className={`font-['SUIT'] text-base font-normal leading-6 ${terms.age ? "text-neutral-400" : "text-[#42444C]"}`}>
                          만 14세 이상입니다
                        </span>
                      </div>
                    </div>
                  </button>

                  <div className="inline-flex h-12 w-full items-center justify-between px-3.5">
                    <button type="button" onClick={() => toggleTerm("service")} className="flex w-48 items-center gap-[4.56px]">
                      <CheckIcon checked={terms.service} />
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <span className={`font-['SUIT'] text-base font-normal leading-6 ${terms.service ? "text-neutral-400" : "text-zinc-700"}`}>
                          [필수]
                        </span>
                        <span className={`font-['SUIT'] text-base font-normal leading-6 ${terms.service ? "text-neutral-400" : "text-zinc-700"}`}>
                          약관 이용동의
                        </span>
                      </div>
                    </button>
                    <button type="button" className="font-['SUIT'] text-sm font-normal leading-5 text-zinc-700 underline">
                      보기
                    </button>
                  </div>

                  <div className="inline-flex h-12 w-full items-center justify-between px-3.5">
                    <button type="button" onClick={() => toggleTerm("marketing")} className="flex items-center gap-[4.56px]">
                      <CheckIcon checked={terms.marketing} />
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <span className={`font-['SUIT'] text-base font-normal leading-6 ${terms.marketing ? "text-neutral-400" : "text-zinc-700"}`}>
                          [선택]
                        </span>
                        <span className={`font-['SUIT'] text-base font-normal leading-6 ${terms.marketing ? "text-neutral-400" : "text-zinc-700"}`}>
                          개인정보 마케팅 활용 동의
                        </span>
                      </div>
                    </button>
                    <button type="button" className="font-['SUIT'] text-sm font-normal leading-5 text-zinc-700 underline">
                      보기
                    </button>
                  </div>

                  <div className="inline-flex h-12 w-full items-center justify-between px-3.5">
                    <button type="button" onClick={() => toggleTerm("event")} className="flex items-center gap-[4.56px]">
                      <CheckIcon checked={terms.event} />
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <span className={`font-['SUIT'] text-base font-normal leading-6 ${terms.event ? "text-neutral-400" : "text-zinc-700"}`}>
                          [선택]
                        </span>
                        <span className={`font-['SUIT'] text-base font-normal leading-6 ${terms.event ? "text-neutral-400" : "text-zinc-700"}`}>
                          이벤트 및 혜택 안내 메일 및 SMS 수신
                        </span>
                      </div>
                    </button>
                    <button type="button" className="font-['SUIT'] text-sm font-normal leading-5 text-zinc-700 underline">
                      보기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
</div>
<div className="absolute bottom-[260px] left-1/2 w-[640px] -translate-x-1/2">
  <PrimaryButton
    disabled={!isNextEnabled}
    onClick={handleNext}
    className="!flex !h-[60px] !w-full !max-w-none items-center justify-center gap-[10px] rounded-[5px] bg-[#1F212A] px-[50px] py-[20px] !font-['SUIT'] !text-[20px] !font-normal !leading-[150%] !tracking-[-0.6px]"
  >
    다음
  </PrimaryButton>
</div>
        </div>
    </section>
  );
};

export default SignupPage;








