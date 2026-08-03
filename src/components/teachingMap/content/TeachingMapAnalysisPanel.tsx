import MarkdownContent from "../../common/MarkdownContent";
import TeachingMapAnalysisDropdown from "./TeachingMapAnalysisDropdown";
import TeachingMapOriginalButton from "./TeachingMapOriginalButton";
import type { TeachingMapContentSection } from "./teachingMapContentTypes";

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
}: TeachingMapAnalysisPanelProps) => (
  <aside className="flex h-full w-[535px] shrink-0 flex-col overflow-y-auto bg-[#1F212A]">
    <div className="flex min-h-full flex-col px-[24px] pb-[32px] pt-[20px]">
      <div className="flex items-center justify-between">
        <h2 className="text-[28px] font-bold leading-[150%] tracking-[-0.84px] text-[#F5F2FF]">
          타카의 분석
        </h2>
        <TeachingMapOriginalButton originalUrl={originalUrl} />
      </div>

      <div className="mt-[51px] flex flex-col gap-[40px]">
        {sections.map((section) => {
          const isOpen = openAnalysisIds.includes(section.id);
          return (
            <section key={section.id}>
              <p className="text-[15px] leading-[160%] text-white">
                {section.highlightType === "MAIN" ? "핵심:" : "주의할 점:"}
              </p>
              <div className="mt-[12px]">
                <TeachingMapAnalysisDropdown
                  title={section.analysisTitle}
                  isOpen={isOpen}
                  onToggle={() => onToggleAnalysis(section.id)}
                />
              </div>
              {isOpen && (
                <div className="mt-[12px] flex flex-col gap-[10px]">
                  {section.analysisDescriptions.map((description, index) => (
                    <div key={`${section.id}-${index}`} className="min-h-[84px] rounded-[5px] bg-[#13151F] p-[10px]">
                      <MarkdownContent
                        content={description}
                        className="text-[15px] font-normal leading-[160%] tracking-[-0.15px] text-[#F5F2FF]"
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>

      <div className="min-h-[40px] flex-1" />
      <img src="/character/teachingTIKI.png" alt="티칭맵 안내 캐릭터" className="mr-[24px] h-[200px] w-[200px] shrink-0 self-end object-contain" />
    </div>
  </aside>
);

export default TeachingMapAnalysisPanel;
