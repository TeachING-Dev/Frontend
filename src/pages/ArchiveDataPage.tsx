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
  getMaterialDetail,
  getMaterialOriginUrl,
  getMaterialTags,
  updateMaterialSummary,
  type MaterialAnalysis,
  type MaterialDetail,
  type MaterialTag,
} from "../apis/material";
import ArchiveDataAnalysis from "../components/archive/ArchiveDataAnalysis";
import ArchiveDataHeader from "../components/archive/ArchiveDataHeader";
import ArchiveDataSummary from "../components/archive/ArchiveDataSummary";

const ArchiveDataPage = () => {
  const navigate = useNavigate();

  const { folderId, materialId } =
    useParams<{
      folderId: string;
      materialId: string;
    }>();

  const [material, setMaterial] =
    useState<MaterialDetail | null>(null);

  const [materialTags, setMaterialTags] =
    useState<MaterialTag[]>([]);

  const [
    materialAnalysis,
    setMaterialAnalysis,
  ] = useState<MaterialAnalysis | null>(
    null,
  );

  const [originUrl, setOriginUrl] =
    useState("");

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

      const parsedFolderId = Number(folderId);
      const parsedMaterialId =
        Number(materialId);

      if (
        !Number.isInteger(parsedFolderId) ||
        parsedFolderId <= 0 ||
        !Number.isInteger(parsedMaterialId) ||
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
        const [
          materialDetail,
          tags,
          originUrlData,
        ] = await Promise.all([
          getMaterialDetail(
            parsedFolderId,
            parsedMaterialId,
          ),
          getMaterialTags(
            parsedFolderId,
            parsedMaterialId,
          ),
          getMaterialOriginUrl(
            parsedFolderId,
            parsedMaterialId,
          ),
        ]);

        if (isCancelled) {
          return;
        }

        setMaterial(materialDetail);
        setMaterialTags(tags);
        setOriginUrl(
          originUrlData.originUrl,
        );
      } catch (error) {
        if (isCancelled) {
          return;
        }

        console.error(
          "자료 기본 정보 조회 실패:",
          error,
        );

        setMaterial(null);
        setMaterialTags([]);
        setOriginUrl("");

        setErrorMessage(
          "자료를 불러오지 못했습니다.",
        );
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }

      try {
        const analysisData =
          await getMaterialAnalysis(
            parsedFolderId,
            parsedMaterialId,
          );

        if (isCancelled) {
          return;
        }

        setMaterialAnalysis(analysisData);
      } catch (error) {
        if (isCancelled) {
          return;
        }

        console.error(
          "AI 분석 조회 실패:",
          error,
        );

        setMaterialAnalysis(null);
        setAnalysisErrorMessage(
          "아직 생성된 AI 분석이 없습니다.",
        );
      } finally {
        if (!isCancelled) {
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
    navigate(`/archive/folder/${folderId}`);
  };

  const handleUpdateSummary = async (
    newSummary: string,
  ) => {
    if (!folderId || !materialId) {
      throw new Error(
        "자료 정보를 확인할 수 없습니다.",
      );
    }

    const parsedFolderId = Number(folderId);
    const parsedMaterialId =
      Number(materialId);

    try {
      const result =
        await updateMaterialSummary(
          parsedFolderId,
          parsedMaterialId,
          {
            shortSummary: newSummary,
          },
        );

      setMaterial((prev) =>
        prev
          ? {
              ...prev,
              summary: result.shortSummary,
              updatedAt: result.updatedAt,
            }
          : prev,
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

  if (isLoading) {
    return (
      <main className="py-10">
        <div className="mx-auto w-[1120px] py-[100px] text-center text-[18px] text-[#B8B9BC]">
          자료를 불러오는 중입니다.
        </div>
      </main>
    );
  }

  if (errorMessage || !material) {
    return (
      <main className="py-10">
        <div className="mx-auto w-[1120px] py-[100px] text-center text-[18px] text-[#B8B9BC]">
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
          date={material.createdAt}
          title={material.title}
          originalUrl={originUrl}
          tags={materialTags.map(
            (tag) => tag.tagName,
          )}
          onBack={handleBack}
        />

        <ArchiveDataSummary
          summary={material.summary}
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
              AI 분석을 불러오는 중입니다.
            </div>
          </section>
        ) : materialAnalysis ? (
          <ArchiveDataAnalysis
            fullAnalysis={
              materialAnalysis.fullAnalysis
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
              {analysisErrorMessage}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ArchiveDataPage;