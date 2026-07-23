import TeachingMapAnalysisPanel from "../components/teachingMap/content/TeachingMapAnalysisPanel";
import TeachingMapContentHeader from "../components/teachingMap/content/TeachingMapContentHeader";
import TeachingMapContentLegend from "../components/teachingMap/content/TeachingMapContentLegend";
import TeachingMapContentSectionList from "../components/teachingMap/content/TeachingMapContentSectionList";
import TeachingMapTagList from "../components/teachingMap/content/TeachingMapTagList";

export interface TeachingMapContentSection {
  id: number;
  title: string;
  highlightType: "core" | "warning";
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
  },
  {
    id: 2,
    title: "개발자가 가장 자주 실수하는 우선순위",
    highlightType: "warning",
  },
  {
    id: 3,
    title: "개발자가 가장 자주 실수하는 우선순위",
    highlightType: "warning",
  },
];

const TeachingMapContentPage = () => {
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
            <TeachingMapContentSectionList sections={sections} />
          </div>
        </div>
      </section>

      <TeachingMapAnalysisPanel />
    </main>
  );
};

export default TeachingMapContentPage;