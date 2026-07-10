import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

type SignupStep = "nickname" | "terms";
type TermKey = "age" | "service" | "marketing" | "event";

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
  const isTermsNextEnabled = terms.age && terms.service;
  const isNextEnabled = step === "nickname" ? isNicknameNextEnabled : isTermsNextEnabled;

  const handleBack = () => {
    if (step === "terms") {
      setStep("nickname");
      return;
    }

    navigate("/login");
  };

  const handleNext = () => {
    if (step === "nickname" && isNicknameNextEnabled) {
      setStep("terms");
      return;
    }

    if (step === "terms" && isTermsNextEnabled) {
      navigate("/signup/complete");
    }
  };

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

  const CheckIcon = ({
    checked,
    inverted = false,
  }: {
    checked: boolean;
    inverted?: boolean;
  }) => (
    <span
      className={`relative inline-flex size-6 shrink-0 items-center justify-center rounded-full ${
        checked ? (inverted ? "bg-violet-50" : "bg-[#917DEC]") : "bg-zinc-700"
      }`}
    >
      <span
        className={`h-2 w-3 rotate-[-45deg] border-b-2 border-l-2 ${
          checked
            ? inverted
              ? "border-[#917DEC]"
              : "border-violet-50"
            : "border-zinc-500"
        }`}
      />
    </span>
  );

  return (
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-[#090713]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-violet-500/0 to-violet-500/30" />

      <div className="relative mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-[1440px] flex-col px-40 pb-16 pt-[27px]">
        <div className="mb-10 flex items-center gap-2.5">
          <button
            type="button"
            aria-label="이전으로"
            onClick={handleBack}
            className="flex size-12 items-center justify-center text-neutral-50"
          >
            <ChevronLeft size={36} strokeWidth={2} />
          </button>
          <h1 className="font-['SUIT_Variable'] text-3xl font-semibold leading-10 text-neutral-50">
            {step === "nickname" ? "회원가입" : "약관 동의"}
          </h1>
        </div>

        <div className="flex flex-1 flex-col justify-between">
          {step === "nickname" ? (
            <div className="flex flex-col gap-2.5">
              <h2 className="font-['SUIT_Variable'] text-3xl font-semibold leading-10 text-zinc-500">
                닉네임
              </h2>

              <div className="flex w-full flex-col items-start gap-2.5">
                <label className="flex h-14 w-[640px] items-center rounded-[5px] bg-neutral-800 px-5 py-3.5">
                  <input
                    type="text"
                    value={nickname}
                    maxLength={10}
                    placeholder="(2~10자 이내의 한글, 영문, 숫자)"
                    onChange={(event) => setNickname(event.target.value)}
                    className="flex-1 bg-transparent font-['SUIT_Variable'] text-xl font-semibold leading-8 text-neutral-50 outline-none placeholder:text-zinc-700"
                  />
                  <span
                    className={`font-['SUIT_Variable'] text-base font-medium leading-6 ${
                      isNicknameNextEnabled ? "text-neutral-50" : "text-zinc-700"
                    }`}
                  >
                    {nickname.length}/10
                  </span>
                </label>

                {isNicknameTaken ? (
                  <div className="flex w-[1115px] items-start gap-2.5">
                    <div className="flex h-12 items-start px-0.5 py-[3px]">
                      <span className="mt-1 size-4 rounded-full border-2 border-zinc-500" />
                    </div>
                    <p className="w-80 justify-center font-['SUIT_Variable'] text-base font-medium leading-6 text-[#917DEC]">
                      이미 사용 중인 닉네임입니다.
                    </p>
                  </div>
                ) : isNicknameNextEnabled ? (
                  <div className="inline-flex w-[1115px] items-start justify-start gap-2.5">
                    <p className="w-80 justify-center font-['SUIT_Variable'] text-base font-medium leading-6 text-[#917DEC]">
                      사용 가능한 아이디입니다.
                    </p>
                  </div>
                ) : (
                  <div className="flex w-[1115px] items-start gap-2.5">
                    <div className="flex h-12 items-start px-0.5 py-[3px]">
                      <span className="mt-1 size-4 rounded-full border-2 border-zinc-500" />
                    </div>
                    <p className="w-80 font-['SUIT_Variable'] text-base font-medium leading-6 text-zinc-500">
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
                  className={`inline-flex h-14 w-[640px] items-center justify-start gap-2 rounded-[5px] px-7 py-3.5 ${
                    isAllTermsChecked ? "bg-[#917DEC]" : "bg-neutral-800"
                  }`}
                >
                  <CheckIcon checked={isAllTermsChecked} inverted />
                  <span
                    className={`font-['SUIT_Variable'] text-xl font-semibold leading-8 ${
                      isAllTermsChecked ? "text-violet-50" : "text-zinc-500"
                    }`}
                  >
                    전체 동의하기 (선택 동의 포함)
                  </span>
                </button>
              </div>

              <div className="flex flex-col items-start gap-7">
                <div className="flex w-[640px] flex-col items-start gap-3.5 py-3">
                  <button
                    type="button"
                    onClick={() => toggleTerm("age")}
                    className="flex h-12 w-full items-center px-3.5"
                  >
                    <div className="inline-flex w-48 items-center gap-2.5">
                      <CheckIcon checked={terms.age} />
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <span className={`font-['Pretendard'] text-base font-normal leading-6 ${terms.age ? "text-neutral-400" : "text-zinc-700"}`}>
                          [필수]
                        </span>
                        <span className={`font-['Pretendard'] text-base font-normal leading-6 ${terms.age ? "text-neutral-400" : "text-zinc-700"}`}>
                          만 14세 이상입니다
                        </span>
                      </div>
                    </div>
                  </button>

                  <div className="inline-flex h-12 w-full items-center justify-between px-3.5">
                    <button type="button" onClick={() => toggleTerm("service")} className="flex w-48 items-center gap-2.5">
                      <CheckIcon checked={terms.service} />
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <span className={`font-['Pretendard'] text-base font-normal leading-6 ${terms.service ? "text-neutral-400" : "text-zinc-700"}`}>
                          [필수]
                        </span>
                        <span className={`font-['Pretendard'] text-base font-normal leading-6 ${terms.service ? "text-neutral-400" : "text-zinc-700"}`}>
                          약관 이용동의
                        </span>
                      </div>
                    </button>
                    <button type="button" className="font-['Pretendard'] text-sm font-normal leading-5 text-zinc-700 underline">
                      보기
                    </button>
                  </div>

                  <div className="inline-flex h-12 w-full items-center justify-between px-3.5">
                    <button type="button" onClick={() => toggleTerm("marketing")} className="flex items-center gap-2.5">
                      <CheckIcon checked={terms.marketing} />
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <span className={`font-['Pretendard'] text-base font-normal leading-6 ${terms.marketing ? "text-neutral-400" : "text-zinc-700"}`}>
                          [선택]
                        </span>
                        <span className={`font-['Pretendard'] text-base font-normal leading-6 ${terms.marketing ? "text-neutral-400" : "text-zinc-700"}`}>
                          개인정보 마케팅 활용 동의
                        </span>
                      </div>
                    </button>
                    <button type="button" className="font-['Pretendard'] text-sm font-normal leading-5 text-zinc-700 underline">
                      보기
                    </button>
                  </div>

                  <div className="inline-flex h-12 w-full items-center justify-between px-3.5">
                    <button type="button" onClick={() => toggleTerm("event")} className="flex items-center gap-2.5">
                      <CheckIcon checked={terms.event} />
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <span className={`font-['Pretendard'] text-base font-normal leading-6 ${terms.event ? "text-neutral-400" : "text-zinc-700"}`}>
                          [선택]
                        </span>
                        <span className={`font-['Pretendard'] text-base font-normal leading-6 ${terms.event ? "text-neutral-400" : "text-zinc-700"}`}>
                          이벤트 및 혜택 안내 메일 및 SMS 수신
                        </span>
                      </div>
                    </button>
                    <button type="button" className="font-['Pretendard'] text-sm font-normal leading-5 text-zinc-700 underline">
                      보기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex w-full justify-center">
            <button
              type="button"
              disabled={!isNextEnabled}
              onClick={handleNext}
              className={`inline-flex h-14 w-[640px] items-center justify-center gap-2.5 rounded-[5px] px-12 py-5 font-['SUIT_Variable'] text-xl font-semibold leading-8 ${
                isNextEnabled
                  ? "bg-[#917DEC] text-violet-50"
                  : "bg-neutral-800 text-zinc-500"
              }`}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;

