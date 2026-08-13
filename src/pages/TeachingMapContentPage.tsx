import { useEffect, useState } from "react";
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
import type { TeachingMapContentSection } from "../components/teachingMap/content/teachingMapContentTypes";

const TeachingMapContentPage = () => {
  const [mobileTab, setMobileTab] = useState<"content" | "analysis">("content");
  const { teachingMapId, contentId } = useParams<{
    teachingMapId: string;
    contentId: string;
  }>();

  const [title, setTitle] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [originalUrl, setOriginalUrl] = useState("");
  const [materialId, setMaterialId] = useState<number | null>(null);
  const [detailAnalysis, setDetailAnalysis] = useState("");
  const [sections, setSections] = useState<TeachingMapContentSection[]>([]);
  const [openAnalysisIds, setOpenAnalysisIds] = useState<number[]>([]);
  const [loadError, setLoadError] = useState("");
  const mapId = Number(teachingMapId);
  const stepId = Number(contentId);
  const hasValidRouteParams =
    Number.isInteger(mapId) && Number.isInteger(stepId);

  useEffect(() => {
    if (!hasValidRouteParams) return;

    let isCancelled = false;

    const loadStep = async () => {
      try {
        setLoadError("");
        const step = await getTeachingMapStep(mapId, stepId);

        if (isCancelled) {
          return;
        }

        setTitle(step.title);
        setCreatedAt(step.createdAt);
        setTags(step.tags ?? []);
        setOriginalUrl(step.originalUrl);
        setMaterialId(step.materialId);
        setDetailAnalysis(
          step.existingAiAnalysis?.detailAnalysis ?? "",
        );

        const highlights = step.existingAiAnalysis?.highlights ?? [];
        const feedbacks = step.aiTeacherAnalysis?.feedbacks ?? [];

        setSections(
          highlights.map((highlight, index) => {
            const feedback = feedbacks[index];

            return {
              id: index + 1,
              highlightId: highlight.highlightId,
              highlightText: highlight.text,
              title: step.title,
              highlightType:
                highlight.type.trim().toUpperCase() === "CAUTION"
                  ? "CAUTION"
                  : "MAIN",
              analysisTitle: highlight.text,
              analysisDescriptions: feedback ? [feedback.content] : [],
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

  const handleToggleAnalysis = async (sectionId: number) => {
    if (openAnalysisIds.includes(sectionId)) {
      setOpenAnalysisIds((previousIds) =>
        previousIds.filter((id) => id !== sectionId),
      );
      return;
    }

    const section = sections.find((item) => item.id === sectionId);

    if (!section || materialId === null) {
      return;
    }

    try {
      const analysis = await getHighlightTeacherAnalysis(
        materialId,
        section.highlightId,
      );

      setSections((previousSections) =>
        previousSections.map((item) =>
          item.id === sectionId
            ? {
                ...item,
                analysisDescriptions: [analysis.content],
              }
            : item,
        ),
      );
      setOpenAnalysisIds((previousIds) => [...previousIds, sectionId]);
    } catch (error) {
      setLoadError(
        error instanceof Error
          ? error.message
          : "AI 선생님 분석을 불러오지 못했습니다.",
      );
    }
  };

  if (!hasValidRouteParams || (loadError && sections.length === 0)) {
    return (
      <main className="flex h-[calc(100vh-80px)] items-center justify-center bg-[#13151F] text-[18px] text-[#F07A7A]">
        {hasValidRouteParams ? loadError : "유효하지 않은 티칭맵 스텝입니다."}
      </main>
    );
  }

  return (
    <main className="grid h-[calc(100vh-80px)] min-h-0 grid-cols-[minmax(0,1fr)_635px] bg-[#13151F] max-lg:block max-lg:h-auto max-lg:min-h-screen max-lg:bg-[#090713]">
      <section className="scrollbar-hide min-w-0 overflow-y-auto bg-[#13151F] max-lg:overflow-visible max-lg:bg-[#090713]">
        <div className="w-full pb-[70px] pt-[40px] max-lg:pb-[40px] max-lg:pt-[24px]">
          <TeachingMapContentHeader title={title} createdAt={createdAt} originalUrl={originalUrl} />

          <div className="mt-[24px]">
            <TeachingMapTagList tags={tags} />
          </div>

          <div className="mx-[30px] mt-[20px] h-px w-[calc(100%-60px)] bg-[#42444C] max-lg:hidden" />

          <div className="mx-[16px] mt-[32px] hidden h-[35px] max-lg:flex">
            {(["content", "analysis"] as const).map((tab) => {
              const selected = mobileTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setMobileTab(tab)}
                  className={`flex-1 rounded-[5px] text-[14px] leading-[21px] ${selected ? "border border-[#917DEC] bg-[#13151F] text-[#F5F2FF] shadow-[inset_0_0_20px_rgba(145,125,236,0.60)]" : "bg-[#1F212A] text-[#717379]"}`}
                >
                  {tab === "content" ? "학습 내용" : "타카의 분석"}
                </button>
              );
            })}
          </div>

          <div className={`mt-[10px] px-[30px] max-lg:mt-[20px] max-lg:px-0 ${mobileTab === "analysis" ? "max-lg:hidden" : ""}`}>
            <TeachingMapContentLegend />
          </div>

          <div className={`mt-[0px] ${mobileTab === "analysis" ? "max-lg:hidden" : ""}`}>
            <TeachingMapContentSectionList
              title={title}
              summary={detailAnalysis}
              sections={sections}
              onHighlightClick={handleToggleAnalysis}
            />
          </div>

          <div className={mobileTab === "analysis" ? "hidden max-lg:block" : "hidden"}>
            <TeachingMapAnalysisPanel
              mobile
              sections={sections}
              openAnalysisIds={openAnalysisIds}
              originalUrl={originalUrl}
              onToggleAnalysis={handleToggleAnalysis}
            />
          </div>
        </div>
      </section>

      <div className="max-lg:hidden">
        <TeachingMapAnalysisPanel
          sections={sections}
          openAnalysisIds={openAnalysisIds}
          originalUrl={originalUrl}
          onToggleAnalysis={handleToggleAnalysis}
        />
      </div>
    </main>
  );
};

export default TeachingMapContentPage;
