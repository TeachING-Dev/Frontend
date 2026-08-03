import {
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";

import {
  getHighlightTeacherAnalysis,
  getTeachingMapStep,
} from "../apis/teachingMap";
import TeachingMapAnalysisPanel from "../components/teachingMap/content/TeachingMapAnalysisPanel";
import TeachingMapContentHeader from "../components/teachingMap/content/TeachingMapContentHeader";
import TeachingMapContentLegend from "../components/teachingMap/content/TeachingMapContentLegend";
import TeachingMapContentSectionList from "../components/teachingMap/content/TeachingMapContentSectionList";
import TeachingMapTagList from "../components/teachingMap/content/TeachingMapTagList";

export interface TeachingMapContentSection {
  id: number;
  highlightId: number;
  highlightText: string;
  title: string;
  highlightType: "core" | "warning";
  analysisTitle: string;
  analysisDescriptions: string[];
}

const TeachingMapContentPage = () => {
  const { teachingMapId, contentId } =
    useParams<{
      teachingMapId: string;
      contentId: string;
    }>();

  const [title, setTitle] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [originalUrl, setOriginalUrl] = useState("");
  const [materialId, setMaterialId] =
    useState<number | null>(null);
  const [sections, setSections] = useState<
    TeachingMapContentSection[]
  >([]);
  const [openAnalysisIds, setOpenAnalysisIds] =
    useState<number[]>([]);
  const [loadError, setLoadError] = useState("");
  const mapId = Number(teachingMapId);
  const stepId = Number(contentId);
  const hasValidRouteParams =
    Number.isInteger(mapId) &&
    Number.isInteger(stepId);

  useEffect(() => {
    if (!hasValidRouteParams) return;

    let isCancelled = false;

    const loadStep = async () => {
      try {
        setLoadError("");
        const step = await getTeachingMapStep(
          mapId,
          stepId,
        );

        if (isCancelled) {
          return;
        }

        setTitle(step.title);
        setCreatedAt(step.createdAt);
        setTags(step.tags ?? []);
        setOriginalUrl(step.originalUrl);
        setMaterialId(step.materialId);

        const highlights =
          step.existingAiAnalysis?.highlights ?? [];
        const feedbacks =
          step.aiTeacherAnalysis?.feedbacks ?? [];

        setSections(
          highlights.map((highlight, index) => {
            const feedback = feedbacks[index];

            return {
              id: index + 1,
              highlightId: highlight.highlightId,
              highlightText: highlight.text,
              title: step.title,
              highlightType:
                highlight.type.toUpperCase() === "CORE"
                  ? "core"
                  : "warning",
              analysisTitle:
                feedback?.title ??
                "AI 선생님의 분석을 확인해보세요.",
              analysisDescriptions: feedback
                ? [feedback.content]
                : [],
            };
          }),
        );
      } catch (error) {
        if (!isCancelled) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "스텝 상세 정보를 불러오지 못했습니다.",
          );
        }
      }
    };

    void loadStep();

    return () => {
      isCancelled = true;
    };
  }, [mapId, stepId, hasValidRouteParams]);

  const handleToggleAnalysis = async (
    sectionId: number,
  ) => {
    if (openAnalysisIds.includes(sectionId)) {
      setOpenAnalysisIds((previousIds) =>
        previousIds.filter((id) => id !== sectionId),
      );
      return;
    }

    const section = sections.find(
      (item) => item.id === sectionId,
    );

    if (!section || materialId === null) {
      return;
    }

    try {
      const analysis =
        await getHighlightTeacherAnalysis(
          materialId,
          section.highlightId,
        );

      setSections((previousSections) =>
        previousSections.map((item) =>
          item.id === sectionId
            ? {
                ...item,
                analysisTitle: analysis.title,
                analysisDescriptions: [
                  analysis.content,
                ],
              }
            : item,
        ),
      );
      setOpenAnalysisIds((previousIds) => [
        ...previousIds,
        sectionId,
      ]);
    } catch (error) {
      setLoadError(
        error instanceof Error
          ? error.message
          : "AI 선생님 분석을 불러오지 못했습니다.",
      );
    }
  };

  if (
    !hasValidRouteParams ||
    (loadError && sections.length === 0)
  ) {
    return (
      <main className="flex h-[calc(100vh-80px)] items-center justify-center bg-[#13151F] text-[18px] text-[#F07A7A]">
        {hasValidRouteParams
          ? loadError
          : "유효하지 않은 티칭맵 스텝입니다."}
      </main>
    );
  }

  return (
    <main className="grid h-[calc(100vh-80px)] min-h-0 grid-cols-[minmax(0,1fr)_535px] bg-[#13151F]">
      <section className="min-w-0 overflow-y-auto bg-[#13151F]">
        <div className="w-full pb-[70px] pt-[40px]">
          <TeachingMapContentHeader
            title={title}
            createdAt={createdAt}
          />

          <div className="mt-[24px]">
            <TeachingMapTagList tags={tags} />
          </div>

          <div className="mt-[20px] h-px w-full bg-[#42444C]" />

          <div className="mt-[33px] px-[30px]">
            <TeachingMapContentLegend />
          </div>

          <div className="mt-[33px]">
            <TeachingMapContentSectionList
              sections={sections}
              onHighlightClick={handleToggleAnalysis}
            />
          </div>
        </div>
      </section>

      <TeachingMapAnalysisPanel
        sections={sections}
        openAnalysisIds={openAnalysisIds}
        originalUrl={originalUrl}
        onToggleAnalysis={handleToggleAnalysis}
      />
    </main>
  );
};

export default TeachingMapContentPage;
