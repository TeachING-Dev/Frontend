import TeachingMapAnalysisPanel from "../components/teachingMap/content/TeachingMapAnalysisPanel";
import TeachingMapContentHeader from "../components/teachingMap/content/TeachingMapContentHeader";
import TeachingMapContentLegend from "../components/teachingMap/content/TeachingMapContentLegend";
import TeachingMapContentSectionList from "../components/teachingMap/content/TeachingMapContentSectionList";
import TeachingMapTagList from "../components/teachingMap/content/TeachingMapTagList";

export interface TeachingMapContentSection {
  id: number;
  title: string;
  highlightType: "core" | "warning";
  analysisTitle: string;
  analysisDescriptions: string[];
}

const tags = [
  "여기는 10자의 태그",
  "여기는 10자의 태그",
  "여기는 10자의 태그",
  "여기는 10자의 태그"
];

const sections: TeachingMapContentSection[] = [
  {
    id: 1,
    title: "Node.js 비동기 아키텍처의 핵심 구조",
    highlightType: "core",
    analysisTitle: "Node.js는 직접 다 처리하지 않고, 이벤트 루프를 통해 순서대로 관리해요.",
    analysisDescriptions: [
      "접근이 가능해질 수 있습니다. 그래서 웹 서비스를 배포할 때는 서비스에 꼭 필요한 포트만 허용하는 습관이 중요해요.",
    ],
  },
  {
    id: 2,
    title: "개발자가 가장 자주 실수하는 우선순위",
    highlightType: "warning",
    analysisTitle: "Blocking과 Non-blocking의 차이를 헷갈리지 않기",
    analysisDescriptions: [
      "Blocking과 Non-blocking은 작업을 기다리는 방식이 다릅니다.",
    ],
  },
  {
    id: 3,
    title: "개발자가 가장 자주 실수하는 우선순위",
    highlightType: "warning",
    analysisTitle: "Callback Queue와 Microtask Queue의 실행 순서를 혼동하지 않기",
    analysisDescriptions: [
      "Promise와 queueMicrotask는 Callback Queue보다 먼저 실행됩니다.",
    ],
  },
];

const TeachingMapContentPage = () => {
  const [openAnalysisIds, setOpenAnalysisIds] =
    useState<number[]>([1]);

  const handleToggleAnalysis = (sectionId: number) => {
    setOpenAnalysisIds((previousIds) =>
      previousIds.includes(sectionId)
        ? previousIds.filter((id) => id !== sectionId)
        : [...previousIds, sectionId],
    );
  };

  return (
    <main className="grid h-[calc(100vh-80px)] min-h-0 grid-cols-[minmax(0,1fr)_535px] bg-[#13151F]">
      <section className="min-w-0 overflow-y-auto bg-[#13151F]">
        <div className="w-full pb-[70px] pt-[40px]">
          <TeachingMapContentHeader />

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
        onToggleAnalysis={handleToggleAnalysis}
      />
    </main>
  );
};

export default TeachingMapContentPage;
import { useState } from "react";
