import MarkdownContent from "../../common/MarkdownContent";
import TeachingMapAnalysisDropdown from "./TeachingMapAnalysisDropdown";
import TeachingMapOriginalButton from "./TeachingMapOriginalButton";
import type { TeachingMapContentSection } from "./teachingMapContentTypes";

interface TeachingMapAnalysisPanelProps {
  sections: TeachingMapContentSection[];
  openAnalysisIds: number[];
  originalUrl: string;
  onToggleAnalysis: (sectionId: number) => void;
  mobile?: boolean;
}

const TeachingMapAnalysisPanel = ({
  sections,
  openAnalysisIds,
  originalUrl,
  onToggleAnalysis,
  mobile = false,
}: TeachingMapAnalysisPanelProps) => {
  const mainSections = sections.filter(
    (section) => section.highlightType === "MAIN",
  );
  const cautionSections = sections.filter(
    (section) => section.highlightType === "CAUTION",
  );

  const renderSectionGroup = (
    label: string,
    groupedSections: TeachingMapContentSection[],
  ) => {
    if (groupedSections.length === 0) return null;

    return (
      <section>
        <p className="text-[15px] leading-[160%] text-white">{label}</p>
        <div className="mt-[12px] flex flex-col gap-[12px]">
          {groupedSections.map((section) => {
            const isOpen = openAnalysisIds.includes(section.id);

            return (
              <div key={section.id}>
                <TeachingMapAnalysisDropdown
                  title={section.analysisTitle}
                  isOpen={isOpen}
                  onToggle={() => onToggleAnalysis(section.id)}
                />
                {isOpen && (
                  <div className="mt-[12px] flex flex-col gap-[10px]">
                    {section.analysisDescriptions.map((description, index) => (
                      <div
                        key={`${section.id}-${index}`}
                        className="min-h-[84px] rounded-[5px] bg-[#13151F] p-[10px]"
                      >
                        <MarkdownContent
                          content={description}
                          className="text-[15px] font-normal leading-[160%] tracking-[-0.15px] text-[#F5F2FF]"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <aside className={mobile ? "w-full bg-[#090713]" : "flex h-full w-[635px] shrink-0 flex-col overflow-y-auto bg-[#1F212A]"}>
      <div className={mobile ? "px-[16px] pb-[40px] pt-[20px]" : "flex min-h-full flex-col px-[24px] pb-[32px] pt-[20px]"}>
        <div className={mobile ? "hidden" : "flex items-center justify-between"}>
          <h2 className="text-[28px] font-bold leading-[150%] tracking-[-0.84px] text-[#F5F2FF]">
            타카의 분석
          </h2>
          <TeachingMapOriginalButton originalUrl={originalUrl} />
        </div>

        <div className={mobile ? "flex flex-col gap-[20px]" : "mt-[51px] flex flex-col gap-[40px]"}>
          {renderSectionGroup("핵심:", mainSections)}
          {renderSectionGroup("주의할 점:", cautionSections)}
        </div>

        {!mobile && <div className="min-h-[40px] flex-1" />}
        {!mobile && (
        <img
          src="/character/teachingTIKI.svg"
          alt="티칭맵 안내 캐릭터"
          className="mr-[24px] h-[200px] w-[200px] shrink-0 self-end object-contain"
        />
        )}
      </div>
    </aside>
  );
};

export default TeachingMapAnalysisPanel;
