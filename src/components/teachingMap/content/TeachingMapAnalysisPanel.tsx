import TeachingMapAnalysisSection from "./TeachingMapAnalysisSection";
import TeachingMapOriginalButton from "./TeachingMapOriginalButton";
import type { TeachingMapContentSection } from "../../../pages/TeachingMapContentPage";

interface TeachingMapAnalysisPanelProps {
  sections: TeachingMapContentSection[];
  openAnalysisIds: number[];
  originalUrl: string;
  onToggleAnalysis: (sectionId: number) => void;
}

const TeachingMapAnalysisPanel = ({
  sections,
  openAnalysisIds,
  originalUrl,
  onToggleAnalysis,
}: TeachingMapAnalysisPanelProps) => {
  return (
    <aside className="flex h-full w-[535px] shrink-0 flex-col overflow-y-auto bg-[#1F212A]">
      <div className="flex min-h-full flex-col px-[24px] pb-[32px] pt-[20px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[28px] font-bold leading-[150%] tracking-[-0.84px] text-[#F5F2FF]">
            타카의 분석
          </h2>

          <TeachingMapOriginalButton
            originalUrl={originalUrl}
          />
        </div>

        <div className="mt-[51px] flex flex-col gap-[40px]">
          {sections.map((section, index) => (
            <TeachingMapAnalysisSection
              key={section.id}
              label={
                section.highlightType === "core"
                  ? "핵심:"
                  : index === 1
                    ? "주의할 점:"
                    : ""
              }
              title={section.analysisTitle}
              descriptions={section.analysisDescriptions}
              isOpen={openAnalysisIds.includes(section.id)}
              onToggle={() => onToggleAnalysis(section.id)}
            />
          ))}
        </div>

        <div className="flex min-h-[40px] flex-1" />

        <img
          src="/teachingTIKI.png"
          alt="티칭맵 안내 캐릭터"
          className="mr-[24px] h-[200px] w-[200px] shrink-0 self-end object-contain"
        />
      </div>
    </aside>
  );
};

export default TeachingMapAnalysisPanel;
