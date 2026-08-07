import {
  useEffect,
  useState,
} from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getMaterialAnalysis,
  updateMaterialAnalysisDetail,
  updateMaterialSummary,
  type MaterialAnalysis,
} from "../apis/material";
import ArchiveDataAnalysis from "../components/archive/detail/ArchiveDataAnalysis";
import ArchiveDataHeader from "../components/archive/detail/ArchiveDataHeader";
import ArchiveDataSummary from "../components/archive/detail/ArchiveDataSummary";

const ArchiveDataPage = () => {
  const navigate = useNavigate();

  const { folderId, materialId } =
    useParams<{
      folderId: string;
      materialId: string;
    }>();

  const [
    materialAnalysis,
    setMaterialAnalysis,
  ] = useState<MaterialAnalysis | null>(
    null,
  );

  const [isLoading, setIsLoading] =
    useState(true);

  const [
    isAnalysisLoading,
    setIsAnalysisLoading,
  ] = useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [
    analysisErrorMessage,
    setAnalysisErrorMessage,
  ] = useState("");

  useEffect(() => {
    let isCancelled = false;

    const fetchMaterialPageData = async () => {
      if (!folderId || !materialId) {
        setErrorMessage(
          "자료 정보를 확인할 수 없습니다.",
        );
        setIsLoading(false);
        setIsAnalysisLoading(false);
        return;
      }

      const parsedFolderId =
        Number(folderId);

      const parsedMaterialId =
        Number(materialId);

      if (
        !Number.isInteger(
          parsedFolderId,
        ) ||
        parsedFolderId <= 0 ||
        !Number.isInteger(
          parsedMaterialId,
        ) ||
        parsedMaterialId <= 0
      ) {
        setErrorMessage(
          "잘못된 자료 경로입니다.",
        );
        setIsLoading(false);
        setIsAnalysisLoading(false);
        return;
      }

      setIsLoading(true);
      setIsAnalysisLoading(true);
      setErrorMessage("");
      setAnalysisErrorMessage("");

      try {
        const analysisData =
          await getMaterialAnalysis(
            parsedFolderId,
            parsedMaterialId,
          );

        if (isCancelled) {
          return;
        }

        setMaterialAnalysis(
          analysisData,
        );
      } catch (error) {
        if (isCancelled) {
          return;
        }

        console.error(
          "AI 분석 조회 실패:",
          error,
        );

        setMaterialAnalysis(null);

        setErrorMessage(
          "자료를 불러오지 못했습니다.",
        );

        setAnalysisErrorMessage(
          "아직 생성된 AI 분석이 없습니다.",
        );
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
          setIsAnalysisLoading(false);
        }
      }
    };

    void fetchMaterialPageData();

    return () => {
      isCancelled = true;
    };
  }, [folderId, materialId]);

  const handleBack = () => {
    navigate(
      `/archive/folder/${folderId}`,
    );
  };

  const handleUpdateSummary = async (
    newSummary: string,
  ) => {
    if (!folderId || !materialId) {
      throw new Error(
        "자료 정보를 확인할 수 없습니다.",
      );
    }

    const parsedFolderId =
      Number(folderId);

    const parsedMaterialId =
      Number(materialId);

    try {
      const result =
        await updateMaterialSummary(
          parsedFolderId,
          parsedMaterialId,
          {
            shortSummary:
              newSummary,
          },
        );

      setMaterialAnalysis((prev) =>
        prev
          ? {
              ...prev,
              shortSummary:
                result.shortSummary,
              isUserEdited:
                result.isUserEdited,
              updatedAt:
                result.updatedAt,
            }
          : prev,
      );
    } catch (error) {
      console.error(
        "AI 요약 수정 실패:",
        error,
      );

      throw error;
    }
  };

  const handleUpdateAnalysis = async (
    newFullAnalysis: string,
  ) => {
    if (!folderId || !materialId) {
      throw new Error(
        "자료 정보를 확인할 수 없습니다.",
      );
    }

    const parsedFolderId =
      Number(folderId);

    const parsedMaterialId =
      Number(materialId);

    try {
      const result =
        await updateMaterialAnalysisDetail(
          parsedFolderId,
          parsedMaterialId,
          {
            fullAnalysis:
              newFullAnalysis,
          },
        );

      setMaterialAnalysis((prev) =>
        prev
          ? {
              ...prev,
              fullAnalysis:
                result.fullAnalysis,
              isUserEdited:
                result.isUserEdited,
              updatedAt:
                result.updatedAt,
            }
          : prev,
      );
    } catch (error) {
      console.error(
        "AI 상세 분석 수정 실패:",
        error,
      );

      throw error;
    }
  };

  if (isLoading) {
    return (
      <main className="py-10">
        <div className="mx-auto w-[1120px]">
          자료를 불러오는 중입니다.
        </div>
      </main>
    );
  }

  if (
    errorMessage ||
    !materialAnalysis
  ) {
    return (
      <main className="py-10">
        <div className="mx-auto w-[1120px]">
          {errorMessage ||
            "자료 정보가 없습니다."}
        </div>
      </main>
    );
  }

  return (
    <main className="py-10">
      <div className="mx-auto w-[1120px]">
        <ArchiveDataHeader
          date={
            materialAnalysis.generatedAt
          }
          title={
            materialAnalysis.title
          }
          originalUrl={
            materialAnalysis.originUrl
          }
          platformType={
            materialAnalysis.platformType
          }
          platformImageUrl={
            materialAnalysis.platformImageUrl
          }
          tags={materialAnalysis.tags.map(
            (tag) => tag.tagName,
          )}
          onBack={handleBack}
        />

        <ArchiveDataSummary
          summary={
            materialAnalysis.shortSummary
          }
          onUpdateSummary={
            handleUpdateSummary
          }
        />

        {isAnalysisLoading ? (
          <section className="w-full overflow-hidden rounded-[12px] border border-[#3A3946] bg-[#1F212A]">
            <div className="flex h-[60px] items-center px-[20px]">
              <h2 className="font-['SUIT_Variable'] text-[24px] font-bold leading-[150%] tracking-[-0.24px] text-[#D9CDFF]">
                AI 상세 분석
              </h2>
            </div>

            <div className="rounded-t-[10px] bg-[#13151F] px-[30px] py-[40px] text-center text-[18px] text-[#A1A1A5]">
              AI 분석을 불러오는
              중입니다.
            </div>
          </section>
        ) : materialAnalysis ? (
          <ArchiveDataAnalysis
            fullAnalysis={
              materialAnalysis.fullAnalysis
            }
            onUpdateAnalysis={
              handleUpdateAnalysis
            }
          />
        ) : (
          <section className="w-full overflow-hidden rounded-[12px] border border-[#3A3946] bg-[#1F212A]">
            <div className="flex h-[60px] items-center px-[20px]">
              <h2 className="font-['SUIT_Variable'] text-[24px] font-bold leading-[150%] tracking-[-0.24px] text-[#D9CDFF]">
                AI 상세 분석
              </h2>
            </div>

            <div className="rounded-t-[10px] bg-[#13151F] px-[30px] py-[40px] text-center text-[18px] text-[#A1A1A5]">
              {
                analysisErrorMessage
              }
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ArchiveDataPage;