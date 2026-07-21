import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Toast from "../common/Toast";
import AiAnalysisModal from "./modal/AiAnalysisModal";
import AnalysisFailModal from "./modal/AnalysisFailModal";

type AnalysisFailType =
  | "loginRequired"
  | "analysisFailed"
  | "complexLink";

const HomeHeader = () => {
  const navigate = useNavigate();

  const [url, setUrl] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] =
    useState(false);
  const [analysisFailType, setAnalysisFailType] =
    useState<AnalysisFailType | null>(null);

  const toastTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const isValidUrl = (value: string) => {
    try {
      const parsedUrl = new URL(value);

      return (
        parsedUrl.protocol === "http:" ||
        parsedUrl.protocol === "https:"
      );
    } catch {
      return false;
    }
  };

  const showInvalidUrlToast = () => {
    setShowToast(true);

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const trimmedUrl = url.trim();

    if (!isValidUrl(trimmedUrl)) {
      showInvalidUrlToast();
      return;
    }

    setShowToast(false);
    setIsAnalysisModalOpen(true);
  };

  const handleAnalysisComplete = () => {
    const trimmedUrl = url.trim();

    setIsAnalysisModalOpen(false);

    navigate("/analysis/complete", {
      state: {
        originalUrl: trimmedUrl,
      },
    });
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <section className="flex flex-col items-center text-center">
        <img
          src="/home-logo.png"
          alt=""
          aria-hidden="true"
          className="mb-5 h-[210px] w-[450px]"
        />

        <p className="mt-[80px] text-center text-[20px] font-semibold leading-[140%] tracking-[-0.6px] text-[#C1AEFF]">
          TeachING은 링크 속 내용을 분석하여 쉬운 학습 콘텐츠로
          정리해드려요.
        </p>

        <form
          onSubmit={handleSubmit}
          className="relative mt-8 w-full"
        >
          <input
            type="text"
            value={url}
            onChange={(event) =>
              setUrl(event.target.value)
            }
            placeholder="저장할 url을 붙여넣어주세요."
            className="h-[82px] w-full rounded-[12px] border border-[#917DEC] bg-[#11111B] px-8 pr-24 text-[18px] font-semibold text-white placeholder:text-[#4D4F59] outline-none shadow-[0_0_100px_rgba(145,125,236,0.35)]"
          />

          <button
            type="submit"
            aria-label="URL 검색"
            className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#917DEC] transition hover:bg-[#A996FF]"
          >
            <ArrowRight
              size={24}
              strokeWidth={2.5}
              className="text-[#11111B]"
            />
          </button>
        </form>
      </section>

      {showToast && (
        <Toast message="올바른 URL 형식이 아닙니다." />
      )}

      {isAnalysisModalOpen && (
        <AiAnalysisModal
          onClose={() =>
            setIsAnalysisModalOpen(false)
          }
          onComplete={handleAnalysisComplete}
          duration={5000}
        />
      )}

      {analysisFailType && (
        <AnalysisFailModal
          type={analysisFailType}
          onClose={() => setAnalysisFailType(null)}
          onPrimaryAction={() => {
            if (analysisFailType === "loginRequired") {
              console.log("로그인");
            } else {
              console.log("다시 시도하기");
            }

            setAnalysisFailType(null);
          }}
        />
      )}
    </>
  );
};

export default HomeHeader;