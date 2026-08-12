import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useCallback } from "react";

import {
  checkNickname,
  getTerms,
  signup,
  type Term,
} from "../apis/auth";
import PrimaryButton from "../components/common/PrimaryButton";
import {
  clearTokens,
  saveTokens,
} from "../utils/authToken";

type SignupStep = "nickname" | "terms";
type TermKey = "age" | "service" | "marketing" | "event";

type SignupLocationState = {
  step?: SignupStep;
  nickname?: string;
  terms?: Record<TermKey, boolean>;
  termList?: Term[];
};

const REQUIRED_TERMS: TermKey[] = ["age", "service"];
const TERM_ORDER: TermKey[] = [
  "age",
  "service",
  "marketing",
  "event",
];

const CheckIcon = ({
  checked,
  inverted = false,
}: {
  checked: boolean;
  inverted?: boolean;
}) => {
  return (
    <img
      src={
        checked
          ? inverted
            ? "/TermsCheckInverted.svg"
            : "/TermsCheck.svg"
          : "/TermsCheckUnchecked.svg"
      }
      alt=""
      className="size-6 shrink-0 max-md:size-[18px]"
    />
  );
};

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const signupState = location.state as SignupLocationState | null;
  const [step, setStep] = useState<SignupStep>(() =>
    signupState?.step === "terms" ? "terms" : "nickname",
  );
  const [nickname, setNickname] = useState(signupState?.nickname ?? "");
  const [terms, setTerms] = useState<Record<TermKey, boolean>>(
    signupState?.terms ?? {
      age: false,
      service: false,
      marketing: false,
      event: false,
    },
  );
  const [termList, setTermList] =
    useState<Term[]>(signupState?.termList ?? []);
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [
    nicknameErrorMessage,
    setNicknameErrorMessage,
  ] = useState("");


  const normalizedNickname = nickname.trim();
  const isNicknameTaken =
    nicknameErrorMessage.length > 0;
  const isNicknameNextEnabled = normalizedNickname.length > 0 && !isNicknameTaken;
  const isAllTermsChecked = Object.values(terms).every(Boolean);
  const isTermsNextEnabled = REQUIRED_TERMS.every((key) => terms[key]);
  const isNextEnabled = step === "nickname" ? isNicknameNextEnabled : isTermsNextEnabled;

  useEffect(() => {
    if (step !== "nickname") {
      return;
    }

    if (normalizedNickname.length === 0) {
      return;
    }

    let isCancelled = false;
    const timeoutId = window.setTimeout(() => {
      void checkNickname(normalizedNickname)
        .then(() => {
          if (isCancelled) {
            return;
          }

          setNicknameErrorMessage("");
        })
        .catch(() => {
          if (isCancelled) {
            return;
          }

          setNicknameErrorMessage(
            "이미 사용중인 닉네임입니다.",
          );
        });
    }, 300);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [normalizedNickname, step]);

  const handleBack = () => {
    if (step === "terms") {
      setStep("nickname");
      return;
    }

    clearTokens();
    navigate("/login", {
      replace: true,
      state: { skipAutoLogin: true },
    });
  };

  const handleNext = useCallback(async () => {
    if (isSubmitting) {
      return;
    }

    if (step === "nickname" && isNicknameNextEnabled) {
      try {
        setIsSubmitting(true);
        await checkNickname(
          normalizedNickname,
        );
        setNicknameErrorMessage("");

        const nextTerms = await getTerms();
        setTermList(nextTerms);
        setTerms({
          age: false,
          service: false,
          marketing: false,
          event: false,
        });
        setStep("terms");
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? "이미 사용중인 닉네임입니다."
            : "회원가입 정보를 확인하지 못했습니다.";

        setNicknameErrorMessage(
          errorMessage,
        );
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (step === "terms" && isTermsNextEnabled) {
      const agreedTermIds = TERM_ORDER
        .filter((key) => terms[key])
        .map(
          (key) =>
            termList[
              TERM_ORDER.indexOf(key)
            ]?.termId,
        )
        .filter(
          (termId): termId is number =>
            typeof termId === "number",
        );

      if (agreedTermIds.length === 0) {
        alert(
          "약관 정보를 불러오지 못했습니다.",
        );
        return;
      }

      try {
        setIsSubmitting(true);
        const accessToken = await signup({
          nickname: normalizedNickname,
          agreedTermIds,
        });

        saveTokens({ accessToken });
        navigate("/signup/complete");
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : "회원가입에 실패했습니다.",
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [
    isNicknameNextEnabled,
    isSubmitting,
    isTermsNextEnabled,
    navigate,
    normalizedNickname,
    step,
    termList,
    terms,
  ]);

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
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-[#090713] max-md:min-h-[100dvh]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-violet-500/0 to-violet-500/30" />

       <div className="absolute left-1/2 top-0 h-[1019.6px] w-[1440px] origin-top -translate-x-1/2 scale-[0.8] px-20 max-md:left-0 max-md:top-[72px] max-md:h-[calc(100dvh-72px)] max-md:w-full max-md:translate-x-0 max-md:scale-100 max-md:px-5">
        <div className="mb-10 mt-[30px] flex items-center gap-2.5 max-md:mb-[30px] max-md:mt-0 max-md:gap-2">
          <button
            type="button"
            aria-label="이전으로"
            onClick={handleBack}
            className="flex size-12 items-center justify-center text-[#FAFAFA] max-md:size-6"
          >
            <img
              src="/Chevron-down.svg"
              alt=""
              aria-hidden="true"
              className="size-12 max-md:hidden"
            />
            <img
              src="/Chevron-down-mobile.svg"
              alt=""
              aria-hidden="true"
              className="hidden size-6 max-md:block"
            />
          </button>
          <h1 className="font-['SUIT'] text-[28px] font-medium leading-[150%] tracking-[-0.84px] text-[#FAFAFA] max-md:text-[16px] max-md:font-normal max-md:tracking-[-0.48px]">
            {step === "nickname" ? "회원가입" : "약관 동의"}
          </h1>
        </div>

        <div className="flex flex-1 flex-col justify-between">
          {step === "nickname" ? (
            <div className="flex flex-col gap-2.5">
              <h2 className="font-['SUIT'] text-[28px] font-medium leading-[150%] tracking-[-0.84px] text-[#717379] max-md:text-[15px] max-md:tracking-[-0.45px]">
                닉네임
              </h2>

              <div className="flex w-full flex-col items-start gap-[10px] max-md:gap-[8px]">
                <label className="flex h-[60px] w-[640px] items-center rounded-[5px] bg-[#1F212A] px-5 py-3.5 max-md:h-[52px] max-md:w-[361px]">
                  <input
                    type="text"
                    value={nickname}
                    maxLength={10}
                    placeholder="(2~10자 이내의 한글, 영문, 숫자)"
                    onChange={(event) => {
                      setNickname(
                        event.target.value.slice(
                          0,
                          10,
                        ),
                      );
                      setNicknameErrorMessage(
                        "",
                      );
                    }}
                    className="flex-1 bg-transparent font-['SUIT_Variable'] text-xl font-normal leading-8 text-neutral-50 outline-none placeholder:text-[#42444C] max-md:font-['SUIT'] max-md:text-[16px] max-md:leading-[150%]"
                  />
                  <span
                    className={`font-['SUIT'] text-[15px] font-normal leading-6 ${
                      isNicknameNextEnabled ? "text-neutral-50" : "text-zinc-700"
                    }`}
                  >
                    {nickname.length}/10
                  </span>
                </label>

                {isNicknameTaken ? (
                  <div className="flex w-[1115px] items-start gap-2.5 max-md:w-[640px]">
                    <div className="flex h-12 items-start px-0.5 py-[3px]">
                      <img src="/SignupNoticeIcon.svg" alt="" className="size-5 max-md:size-3" />
                    </div>
                    <p className="w-80 justify-center font-['SUIT_Variable'] text-base font-normal leading-6 text-[#917DEC] max-md:font-['SUIT'] max-md:text-[14px] max-md:leading-[150%]">
                      {nicknameErrorMessage}
                    </p>
                  </div>
                ) : isNicknameNextEnabled ? (
                  <div className="inline-flex w-[1115px] items-start justify-start gap-2.5 max-md:w-[640px]">
                    <p className="w-80 justify-center font-['SUIT_Variable'] text-base font-normal leading-6 text-[#917DEC] max-md:text-[14px] max-md:leading-[150%]">
                      사용 가능한 아이디입니다.
                    </p>
                  </div>
                ) : (
                  <div className="flex w-[1115px] items-start gap-2.5 max-md:w-[640px]">
                    <div className="flex h-12 items-start px-0.5 py-[3px]">
                      <img src="/SignupNoticeIcon.svg" alt="" className="size-5 max-md:size-3" />
                    </div>
                    <p className="w-80 font-['SUIT_Variable'] text-base font-normal leading-6 text-[#717379] max-md:text-[14px] max-md:leading-[150%]">
                      다른 유저와 겹치지 않도록 입력해주세요.
                      <br />
                      닉네임은 나중에 변경할 수 있습니다.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-[25px] max-md:gap-[40.5px]">
              <div className="flex flex-col items-start gap-2.5">
                <button
                  type="button"
                  onClick={toggleAllTerms}
                  className={`inline-flex h-[60px] w-[640px] items-center justify-start gap-[8px] rounded-[5px] px-7 py-3.5 max-md:h-[54px] max-md:w-[346px] max-md:px-[20px] ${
                    isAllTermsChecked ? "bg-[#917DEC]" : "bg-[#1F212A]"
                  }`}
                >
                  <CheckIcon checked={isAllTermsChecked} inverted />
                  <span
                    className={`font-['SUIT'] text-xl font-bold leading-8 max-md:text-[16px] max-md:font-normal max-md:leading-[150%] ${
                      isAllTermsChecked ? "text-violet-50" : "text-[#717379]"
                    }`}
                  >
                    전체 동의하기 (선택 동의 포함)
                  </span>
                </button>
              </div>

              <div className="flex flex-col items-start gap-7 max-md:gap-0">
                <div className="flex w-[640px] flex-col items-start gap-[8px] py-3 max-md:w-[346px] max-md:gap-[19px] max-md:py-0">
                  <button
                    type="button"
                    onClick={() => toggleTerm("age")}
                    className="flex h-12 w-full items-center px-3.5 max-md:h-auto max-md:px-0 "
                  >
                    <div className="inline-flex w-48 items-center gap-[10px] max-md:w-auto max-md:gap-2">
                      <CheckIcon checked={terms.age} />
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <span className={`font-['SUIT'] text-[18px] font-normal leading-[150%] max-md:text-[13px] max-md:leading-[21px] ${terms.age ? "text-neutral-400 max-md:font-medium" : "text-[#42444C]"}`}>
                          [필수]
                        </span>
                        <span className={`font-['SUIT'] text-[18px] font-normal leading-[150%] max-md:text-[13px] max-md:leading-[21px] ${terms.age ? "text-neutral-400 max-md:font-medium" : "text-[#42444C]"}`}>
                          만 14세 이상입니다
                        </span>
                      </div>
                    </div>
                  </button>

                  <div className="inline-flex h-12 w-full items-center justify-between px-3.5 max-md:h-auto max-md:px-0">
                    <button type="button" onClick={() => toggleTerm("service")} className="flex w-48 items-center gap-[10px] max-md:w-auto max-md:gap-2">
                      <CheckIcon checked={terms.service} />
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <span className={`font-['SUIT'] text-[18px] font-normal leading-[150%] max-md:text-[13px] max-md:leading-[21px] ${terms.service ? "text-neutral-400 max-md:font-medium" : "text-zinc-700"}`}>
                          [필수]
                        </span>
                        <span className={`font-['SUIT'] text-[18px] font-normal leading-[150%] max-md:text-[13px] max-md:leading-[21px] ${terms.service ? "text-neutral-400 max-md:font-medium" : "text-zinc-700"}`}>
                          약관 이용동의
                        </span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/signup/terms/service", {
                          state: {
                            nickname,
                            terms,
                            termList,
                          },
                        })
                      }
                      className="font-['SUIT'] text-[16px] font-normal leading-[150%] text-zinc-700 underline max-md:text-[10px]"
                    >
                      보기
                    </button>
                  </div>

                  <div className="inline-flex h-12 w-full items-center justify-between px-3.5 max-md:h-auto max-md:px-0">
                    <button type="button" onClick={() => toggleTerm("marketing")} className="flex items-center gap-[10px] max-md:gap-2">
                      <CheckIcon checked={terms.marketing} />
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <span className={`font-['SUIT'] text-[18px] font-normal leading-[150%] max-md:text-[13px] max-md:leading-[21px] ${terms.marketing ? "text-neutral-400 max-md:font-medium" : "text-zinc-700"}`}>
                          [선택]
                        </span>
                        <span className={`font-['SUIT'] text-[18px] font-normal leading-[150%] max-md:text-[13px] max-md:leading-[21px] ${terms.marketing ? "text-neutral-400 max-md:font-medium" : "text-zinc-700"}`}>
                          개인정보 마케팅 활용 동의
                        </span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/signup/terms/marketing", {
                          state: {
                            nickname,
                            terms,
                            termList,
                          },
                        })
                      }
                      className="font-['SUIT'] text-[16px] font-normal leading-[150%] text-zinc-700 underline max-md:text-[10px]"
                    >
                      보기
                    </button>
                  </div>

                  <div className="inline-flex h-12 w-full items-center justify-between px-3.5 max-md:h-auto max-md:px-0">
                    <button type="button" onClick={() => toggleTerm("event")} className="flex items-center gap-[10px] max-md:gap-2">
                      <CheckIcon checked={terms.event} />
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <span className={`font-['SUIT'] text-[18px] font-normal leading-[150%] max-md:text-[13px] max-md:leading-[21px] ${terms.event ? "text-neutral-400 max-md:font-medium" : "text-zinc-700"}`}>
                          [선택]
                        </span>
                        <span className={`font-['SUIT'] text-[18px] font-normal leading-[150%] max-md:text-[13px] max-md:leading-[21px] ${terms.event ? "text-neutral-400 max-md:font-medium" : "text-zinc-700"}`}>
                          이벤트 및 혜택 안내 메일 및 SMS 수신
                        </span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/signup/terms/event", {
                          state: {
                            nickname,
                            terms,
                            termList,
                          },
                        })
                      }
                      className="font-['SUIT'] text-[16px] font-normal leading-[150%] text-zinc-700 underline max-md:text-[10px]"
                    >
                      보기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
</div>
<div className="absolute bottom-[150px] left-1/2 w-[640px] -translate-x-1/2 max-md:bottom-[66px] max-md:w-[361px]">
  <PrimaryButton
    disabled={!isNextEnabled || isSubmitting}
    onClick={handleNext}
    className={`!flex !h-[60px] !w-full !max-w-none items-center justify-center gap-[10px] rounded-[5px] px-[50px] py-[20px] !font-['SUIT'] !text-[20px] !font-normal !leading-[150%] !tracking-[-0.6px] ${
      !isNextEnabled || isSubmitting ? "!bg-[#1F212A]" : "!bg-[#917DEC]"
    } max-md:!h-[48px] max-md:!text-[16px] max-md:!tracking-[-0.48px]`}
  >
    <span className="max-md:hidden">다음</span>
    <span className="hidden max-md:inline">다음</span>
  </PrimaryButton>
</div>
        </div>
    </section>
  );
};

export default SignupPage;



