import {
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  analyzeMaterial,
  moveMaterialsToTrash,
  type AnalyzeMaterialResult,
} from "../../apis/material";
import Toast from "../common/Toast";
import AiAnalysisModal from "./modal/AiAnalysisModal";
import AnalysisFailModal, {
  type AnalysisFailType,
} from "./modal/AnalysisFailModal";
import DuplicateKnowledgeModal from "./modal/DuplicateKnowledgeModal";

const HomeHeader = () => {
  const navigate = useNavigate();

  const [url, setUrl] =
    useState("");

  const [
    showToast,
    setShowToast,
  ] = useState(false);

  const [
    isAnalysisModalOpen,
    setIsAnalysisModalOpen,
  ] = useState(false);

  const [
    isAnalysisComplete,
    setIsAnalysisComplete,
  ] = useState(false);

  const [
    isDuplicateModalOpen,
    setIsDuplicateModalOpen,
  ] = useState(false);

  const [
    analysisFailType,
    setAnalysisFailType,
  ] =
    useState<AnalysisFailType | null>(
      null,
    );

  const [
    existingAnalysisResult,
    setExistingAnalysisResult,
  ] =
    useState<AnalyzeMaterialResult | null>(
      null,
    );

  const [
    isAnalyzing,
    setIsAnalyzing,
  ] = useState(false);

  const toastTimerRef =
    useRef<
      ReturnType<typeof setTimeout> | null
    >(null);

  const analysisFormRef =
    useRef<HTMLFormElement | null>(null);

  const isValidUrl = (
    value: string,
  ) => {
    try {
      const parsedUrl =
        new URL(value);

      return (
        parsedUrl.protocol ===
          "http:" ||
        parsedUrl.protocol ===
          "https:"
      );
    } catch {
      return false;
    }
  };

  const showInvalidUrlToast =
    () => {
      setShowToast(true);

      if (
        toastTimerRef.current
      ) {
        clearTimeout(
          toastTimerRef.current,
        );
      }

      toastTimerRef.current =
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
    };

  /*
   * URL 분석
   */
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const trimmedUrl =
      url.trim();

    if (
      !isValidUrl(trimmedUrl)
    ) {
      showInvalidUrlToast();
      return;
    }

    if (isAnalyzing) {
      return;
    }

    setShowToast(false);
    setAnalysisFailType(null);
    setExistingAnalysisResult(null);
    setIsDuplicateModalOpen(false);

    setIsAnalysisComplete(false);
    setIsAnalysisModalOpen(true);
    setIsAnalyzing(true);

    try {
      const result =
        await analyzeMaterial({
          url: trimmedUrl,
          forceAnalyze: false,
        });

      console.log(
        "URL 분석 요청 결과:",
        result,
      );

      setIsAnalysisComplete(true);

      await new Promise((resolve) =>
        setTimeout(resolve, 400),
      );

      setIsAnalysisModalOpen(
        false,
      );

      /*
       * 이미 분석된 자료인 경우
       *
       * DuplicateKnowledgeModal 표시
       */
      if (
        result.resultType ===
        "ALREADY_ANALYZED"
      ) {
        if (
          result.existingFolderId != null
        ) {
          setExistingAnalysisResult(
            result,
          );

          setIsDuplicateModalOpen(
            true,
          );

          return;
        }

        if (
          result.existingMaterialId == null
        ) {
          console.error(
            "저장되지 않은 기존 분석 결과에 existingMaterialId가 없습니다.",
            result,
          );

          setAnalysisFailType(
            "analysisFailed",
          );

          return;
        }

        navigate(
          "/analysis/complete",
          {
            state: {
              originalUrl:
                result.originalUrl ||
                trimmedUrl,

              materialId:
                result.existingMaterialId,

              materialAnalysisId:
                result.materialAnalysisId,

              result,
            },
          },
        );

        return;
      }

      /*
       * 새 분석 결과의 materialId 확인
       */
      if (
        result.materialId == null
      ) {
        console.error(
          "새 분석 결과의 materialId가 없습니다.",
        );

        setAnalysisFailType(
          "analysisFailed",
        );

        return;
      }

      /*
       * 새 분석 결과
       */
      navigate(
        "/analysis/complete",
        {
          state: {
            originalUrl:
              result.originalUrl ||
              trimmedUrl,

            materialId:
              result.materialId,

            materialAnalysisId:
              result.materialAnalysisId,

            result,
          },
        },
      );
    } catch (error) {
      console.error(
        "URL 분석 요청 실패:",
        error,
      );

      setIsAnalysisModalOpen(
        false,
      );

      setAnalysisFailType(
        "analysisFailed",
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  /*
   * 이미 분석된 자료
   * → 기존 자료 상세 보기
   */
  const handleViewExisting =
    () => {
      if (
        !existingAnalysisResult
      ) {
        return;
      }

      const existingMaterialId =
        existingAnalysisResult
          .existingMaterialId;

      const existingFolderId =
        existingAnalysisResult
          .existingFolderId;

      if (
        existingMaterialId == null ||
        existingFolderId == null
      ) {
        console.error(
          "기존 자료의 materialId 또는 folderId가 없습니다.",
        );

        setIsDuplicateModalOpen(
          false,
        );

        setAnalysisFailType(
          "analysisFailed",
        );

        return;
      }

      setIsDuplicateModalOpen(
        false,
      );

      setAnalysisFailType(null);

      setExistingAnalysisResult(
        null,
      );

      navigate(
        `/archive/folder/${existingFolderId}/materials/${existingMaterialId}`,
      );
    };

  /*
   * 이미 분석된 자료
   * → 같은 URL 새로 분석
   * → 재분석 성공 후 기존 자료 휴지통 이동
   */
  const handleForceAnalyze =
    async () => {
      const trimmedUrl =
        url.trim();

      if (
        !isValidUrl(trimmedUrl)
      ) {
        setIsDuplicateModalOpen(
          false,
        );

        setAnalysisFailType(
          null,
        );

        showInvalidUrlToast();

        return;
      }

      if (isAnalyzing) {
        return;
      }

      if (
        !existingAnalysisResult
      ) {
        console.error(
          "기존 분석 결과가 없습니다.",
        );

        setIsDuplicateModalOpen(
          false,
        );

        setAnalysisFailType(
          "analysisFailed",
        );

        return;
      }

      const existingMaterialId =
        existingAnalysisResult
          .existingMaterialId;

      const existingFolderId =
        existingAnalysisResult
          .existingFolderId;

      if (
        existingMaterialId == null ||
        existingFolderId == null
      ) {
        console.error(
          "기존 자료의 materialId 또는 folderId가 없습니다.",
        );

        setIsDuplicateModalOpen(
          false,
        );

        setAnalysisFailType(
          "analysisFailed",
        );

        return;
      }

      setIsDuplicateModalOpen(
        false,
      );

      setAnalysisFailType(
        null,
      );

      setIsAnalysisComplete(false);

      setIsAnalysisModalOpen(
        true,
      );

      setIsAnalyzing(true);

      try {
        /*
         * 기존 자료 휴지통 이동
         */
        const trashResult =
          await moveMaterialsToTrash(
            existingFolderId,
            {
              materialIds: [
                existingMaterialId,
              ],
            },
          );

        console.log(
          "기존 자료 휴지통 이동 결과:",
          trashResult,
        );

        if (
          trashResult.deletedCount < 1
        ) {
          throw new Error(
            "기존 자료가 휴지통으로 이동되지 않았습니다.",
          );
        }

        /*
         * 같은 URL 강제 재분석
         */
        const result =
          await analyzeMaterial({
            url: trimmedUrl,
            forceAnalyze: true,
          });

        console.log(
          "URL 강제 재분석 결과:",
          result,
        );

        /*
         * 강제 재분석 결과의
         * materialId 확인
         */
        if (
          result.materialId == null
        ) {
          console.error(
            "강제 재분석 결과의 materialId가 없습니다.",
            result,
          );

          setIsAnalysisModalOpen(
            false,
          );

          setAnalysisFailType(
            "analysisFailed",
          );

          return;
        }

        setIsAnalysisComplete(true);

        await new Promise((resolve) =>
          setTimeout(resolve, 400),
        );

        setIsAnalysisModalOpen(
          false,
        );

        setExistingAnalysisResult(
          null,
        );

        navigate(
          "/analysis/complete",
          {
            state: {
              originalUrl:
                result.originalUrl ||
                trimmedUrl,

              materialId:
                result.materialId,

              materialAnalysisId:
                result.materialAnalysisId,

              result,
            },
          },
        );
      } catch (error) {
        console.error(
          "URL 재분석 또는 기존 자료 휴지통 이동 실패:",
          error,
        );

        setIsAnalysisModalOpen(
          false,
        );

        setAnalysisFailType(
          "analysisFailed",
        );
      } finally {
        setIsAnalyzing(false);
      }
    };

  useEffect(() => {
    return () => {
      if (
        toastTimerRef.current
      ) {
        clearTimeout(
          toastTimerRef.current,
        );
      }
    };
  }, []);

  return (
    <>
      <section
        className="
          mt-[120px]
          flex
          flex-col
          items-center
          text-center
          md:mt-[170px]
          lg:mt-[225px]
        "
      >
        <p
          className="
            hidden
            max-w-[680px]
            break-keep
            px-2
            text-center
            font-semibold
            text-[#C1AEFF]
            md:mt-[60px]
            md:block
            md:text-[18px]
            md:leading-[150%]
            md:tracking-[-0.54px]
            lg:mt-[80px]
            lg:text-[20px]
            lg:leading-[140%]
            lg:tracking-[-0.6px]
          "
        >
          TeachING은 링크 속
          내용을 분석하여 쉬운 학습
          콘텐츠로 정리해드려요.
        </p>

        <form
          ref={analysisFormRef}
          onSubmit={
            handleSubmit
          }
          className="
            relative
            mt-5
            w-full
            md:mt-7
            lg:mt-8
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[90px]
              w-[105%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#917DEC]/35
              blur-[45px]
              md:h-[110px]
              md:blur-[55px]
              lg:h-[130px]
              lg:w-[104%]
              lg:blur-[60px]
            "
          />

          <input
            type="text"
            value={url}
            onChange={(event) =>
              setUrl(
                event.target.value,
              )
            }
            placeholder="저장할 url을 붙여넣어주세요."
            disabled={isAnalyzing}
            className="
              relative
              h-[45px]
              w-full
              rounded-[10px]
              border
              border-[#917DEC]
              bg-[#11111B]
              px-4
              pr-[64px]
              text-[15px]
              font-semibold
              leading-[140%]
              tracking-[-0.45px]
              text-white
              outline-none
              shadow-[0_0_40px_rgba(145,125,236,0.25)]
              placeholder:text-[15px]
              placeholder:font-semibold
              placeholder:leading-[140%]
              placeholder:tracking-[-0.45px]
              placeholder:text-[#42444C]
              transition
              focus:shadow-[0_0_70px_rgba(145,125,236,0.45)]
              disabled:cursor-not-allowed
              disabled:opacity-60
              md:h-[64px]
              md:px-6
              md:pr-[80px]
              md:text-[18px]
              md:placeholder:text-[18px]
              lg:h-[72px]
              lg:rounded-[12px]
              lg:px-8
              lg:pr-24
              lg:text-[20px]
              lg:tracking-[-0.6px]
              lg:placeholder:text-[20px]
              lg:placeholder:tracking-[-0.6px]
            "
          />

          <button
            type="submit"
            aria-label="URL 분석"
            disabled={isAnalyzing}
            className="
              absolute
              right-2
              top-1/2
              flex
              h-6
              w-6
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-[#917DEC]
              transition
              hover:bg-[#A996FF]
              disabled:cursor-not-allowed
              disabled:opacity-60
              md:right-3
              md:h-11
              md:w-11
              lg:right-5
            "
          >
            <ArrowRight
              size={18}
              strokeWidth={2}
              className="
                text-[#11111B]
                md:h-6
                md:w-6
              "
            />
          </button>
        </form>
      </section>

      {showToast && (
        <Toast message="올바른 URL 형식이 아닙니다." />
      )}

      {isAnalysisModalOpen && (
        <AiAnalysisModal
          isComplete={
            isAnalysisComplete
          }
          onClose={() =>
            setIsAnalysisModalOpen(
              false,
            )
          }
        />
      )}

      {isDuplicateModalOpen && (
        <DuplicateKnowledgeModal
          onClose={() => {
            setIsDuplicateModalOpen(
              false,
            );

            setExistingAnalysisResult(
              null,
            );
          }}
          onViewKnowledge={
            handleViewExisting
          }
          onAnalyzeAgain={() => {
            void handleForceAnalyze();
          }}
        />
      )}

      {analysisFailType && (
        <AnalysisFailModal
          type={
            analysisFailType
          }
          onClose={() => {
            setAnalysisFailType(
              null,
            );

            setExistingAnalysisResult(
              null,
            );
          }}
          onSecondaryAction={() => {
            setAnalysisFailType(
              null,
            );
          }}
          onPrimaryAction={() => {
            if (
              analysisFailType ===
              "loginRequired"
            ) {
              console.log(
                "로그인",
              );
            } else {
              setAnalysisFailType(
                null,
              );

              analysisFormRef.current?.requestSubmit();

              return;
            }

            setAnalysisFailType(
              null,
            );
          }}
        />
      )}
    </>
  );
};

export default HomeHeader;
