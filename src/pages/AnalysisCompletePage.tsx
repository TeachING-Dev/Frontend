import {
  useEffect,
  useState,
} from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  getFolders,
} from "../apis/folder";
import {
  finalizeMaterial,
  updateMaterialSummary,
  type MaterialTag,
} from "../apis/material";

import AnalysisHeader from "../components/home/AnalysisHeader";
import AnalysisSidebar from "../components/home/AnalysisSidebar";
import AnalysisSummary from "../components/home/AnalysisSummary";
import AnalysisUrl from "../components/home/AnalysisUrl";

type FolderOption = {
  id: number;
  name: string;
};

type AnalysisLocationState = {
  originalUrl?: string;
  materialId?: number;
  materialAnalysisId?: number;

  result?: {
    materialAnalysisId: number;
    resultType: string;
    materialId: number;
    existingMaterialId: number;
    originalUrl: string;
    title: string;
    platformType: string;
    status: string;
    chunkCount: number;

    recommendedFolderId:
      | number
      | null;

    recommendedFolderName:
      | string
      | null;

    tags: MaterialTag[];
  };
};

const AnalysisCompletePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state =
    location.state as AnalysisLocationState | null;

  const analysisResult =
    state?.result;

  const materialId =
    state?.materialId ??
    analysisResult?.materialId;

  const originalUrl =
    state?.originalUrl ??
    analysisResult?.originalUrl ??
    "";

  /* ==============================
     폴더
  ============================== */

  const [folders, setFolders] =
    useState<FolderOption[]>([]);

  const [
    selectedFolderId,
    setSelectedFolderId,
  ] = useState<number>(
    analysisResult?.recommendedFolderId ??
      0,
  );

  const [
    isFolderLoading,
    setIsFolderLoading,
  ] = useState(true);

  /* ==============================
     태그
  ============================== */

  const [
    selectedTags,
    setSelectedTags,
  ] = useState<MaterialTag[]>(
    analysisResult?.tags ?? [],
  );

  /* ==============================
     요약
  ============================== */

  const [summary, setSummary] =
    useState(
      "AI가 분석한 내용을 요약해드릴게요.",
    );

  const [isSaving, setIsSaving] =
    useState(false);

  /* ==============================
     폴더 목록 조회
  ============================== */

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        setIsFolderLoading(true);

        const folderData =
          await getFolders("recent");

        const mappedFolders: FolderOption[] =
          folderData.map(
            (folder) => ({
              id: folder.folderId,
              name: folder.folderName,
            }),
          );

        setFolders(mappedFolders);

        const recommendedFolderId =
          analysisResult
            ?.recommendedFolderId;

        const hasRecommendedFolder =
          recommendedFolderId != null &&
          mappedFolders.some(
            (folder) =>
              folder.id ===
              recommendedFolderId,
          );

        if (
          hasRecommendedFolder &&
          recommendedFolderId != null
        ) {
          setSelectedFolderId(
            recommendedFolderId,
          );

          return;
        }

        if (
          mappedFolders.length > 0
        ) {
          setSelectedFolderId(
            mappedFolders[0].id,
          );
        }
      } catch (error) {
        console.error(
          "폴더 목록 조회 실패:",
          error,
        );
      } finally {
        setIsFolderLoading(false);
      }
    };

    fetchFolders();
  }, [
    analysisResult
      ?.recommendedFolderId,
  ]);

  /* ==============================
     저장
  ============================== */

  const handleSave = async () => {
    if (!materialId) {
      console.error(
        "materialId가 없습니다.",
      );

      return;
    }

    if (!selectedFolderId) {
      console.error(
        "저장할 폴더를 선택해주세요.",
      );

      return;
    }

    try {
      setIsSaving(true);

      /*
       * 현재 활성화되어 있는 태그들의
       * tagId만 추출
       */
      const selectedTagIds =
        selectedTags.map(
          (tag) => tag.tagId,
        );

      /*
       * 1. 자료 저장 위치 / 태그 확정
       */
      const finalizeResult =
        await finalizeMaterial(
          materialId,
          {
            folderId:
              selectedFolderId,

            tagIds:
              selectedTagIds,
          },
        );

      console.log(
        "자료 저장 확정 성공:",
        finalizeResult,
      );

      /*
       * 2. AI 요약 수정
       */
      const summaryResult =
        await updateMaterialSummary(
          finalizeResult.folderId,
          finalizeResult.materialId,
          {
            shortSummary:
              summary,
          },
        );

      setSummary(
        summaryResult.shortSummary,
      );

      console.log(
        "AI 요약 수정 성공:",
        summaryResult,
      );

      /*
       * 3. 저장 완료 후
       * 해당 폴더로 이동
       */
      navigate(
        `/archive/folder/${finalizeResult.folderId}`,
      );
    } catch (error) {
      console.error(
        "자료 저장 실패:",
        error,
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="relative py-[55px]">
      {/* 좌측 고정 사이드바 */}
      {!isFolderLoading && (
        <AnalysisSidebar
          folders={folders}
          selectedFolderId={
            selectedFolderId
          }
          onFolderChange={
            setSelectedFolderId
          }
        />
      )}

      {/* 가운데 콘텐츠 */}
      <section className="mx-auto w-[1100px]">
        <div className="ml-[350px]">
          <div className="ml-[30px]">
            <AnalysisHeader
              date="2026-05-10"
              title={
                analysisResult
                  ?.title ??
                "분석된 콘텐츠"
              }
              tags={
                analysisResult
                  ?.tags ?? []
              }
              onSelectedTagsChange={
                setSelectedTags
              }
            />
          </div>

          {/* 본문 */}
          <div className="mt-[20px] flex flex-col gap-[20px]">
            <AnalysisUrl
              url={originalUrl}
            />

            <AnalysisSummary
              summary={summary}
              onSummaryChange={
                setSummary
              }
            />

            <button
              type="button"
              onClick={handleSave}
              disabled={
                isSaving ||
                isFolderLoading ||
                !materialId ||
                !selectedFolderId
              }
              className="
                h-[54px]
                w-full
                rounded-[5px]
                bg-[#917DEC]
                text-center
                text-[24px]
                font-semibold
                leading-[150%]
                tracking-[-0.72px]
                text-white
                transition-colors
                hover:bg-[#8269E7]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isSaving
                ? "저장 중..."
                : "저장하기"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AnalysisCompletePage;