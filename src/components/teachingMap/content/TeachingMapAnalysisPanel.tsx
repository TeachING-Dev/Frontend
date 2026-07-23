import TeachingMapAnalysisSection from "./TeachingMapAnalysisSection";
import TeachingMapOriginalButton from "./TeachingMapOriginalButton";

const coreDescriptions = [
  "Lorem ipsum dolor sit amet consectetur. Est malesuada elit egestas rutrum dolor donec dolor. Arcu enim et eget ultricies cras est dignissim. Adipiscing lacus blandit scelerisque suspendisse rutrum varius ac. Dignissim purus risus proin dolor mauris cras mauris nulla tristique.",
  "Lorem ipsum dolor sit amet consectetur. Est malesuada elit egestas rutrum dolor donec dolor. Arcu enim et eget ultricies cras est dignissim. Adipiscing lacus blandit scelerisque suspendisse rutrum varius ac. Dignissim purus risus proin dolor mauris cras mauris nulla tristique.",
];

const warningDescriptions = [
  "Blocking과 Non-blocking의 차이를 헷갈리지 않기",
  "Blocking과 Non-blocking의 차이를 헷갈리지 않기",
];

const TeachingMapAnalysisPanel = () => {
  return (
    <aside className="flex h-full w-[535px] shrink-0 flex-col overflow-y-auto bg-[#1F212A]">
      <div className="flex min-h-full flex-col px-[24px] pb-[32px] pt-[20px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[28px] font-bold leading-[150%] tracking-[-0.84px] text-[#F5F2FF]">
            타카의 분석
          </h2>

          <TeachingMapOriginalButton />
        </div>

        <div className="mt-[51px]">
          <TeachingMapAnalysisSection
            label="핵심:"
            title="Node.js는 직접 다 처리하지 않고, 이벤트 루프를 통해 순서대로 관리해요."
            descriptions={
              coreDescriptions
            }
            defaultOpen
          />
        </div>

        <div className="mt-[40px] flex flex-col gap-[20px]">
          <TeachingMapAnalysisSection
            label="주의할 점:"
            title="Blocking과 Non-blocking의 차이를 헷갈리지 않기"
            descriptions={
              warningDescriptions
            }
          />

          <TeachingMapAnalysisSection
            label=""
            title="Callback Queue와 Microtask Queue의 실행 순서를 혼동하지 않기"
            descriptions={[
              "Promise와 queueMicrotask는 Callback Queue보다 먼저 실행됩니다.",
            ]}
          />
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