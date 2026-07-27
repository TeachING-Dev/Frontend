import type { TeachingMapContentSection } from "../../../pages/TeachingMapContentPage";

interface TeachingMapContentSectionItemProps {
  section: TeachingMapContentSection;
  isLast: boolean;
  onHighlightClick: (sectionId: number) => void;
}

const TeachingMapContentSectionItem = ({
  section,
  isLast,
  onHighlightClick,
}: TeachingMapContentSectionItemProps) => {
  const highlightClass =
    section.highlightType === "core"
      ? "text-[#83E2FF] decoration-[#83E2FF]"
      : "text-[#FAC3A5] decoration-[#FAC3A5]";

  return (
    <article
      className={[
        "pb-[40px]",
        isLast ? "" : "mb-[40px] border-b border-[#42444C]",
      ].join(" ")}
    >
      <div className="flex items-center gap-[16px]">
        <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[5px] bg-[#917DEC] px-[9px] text-[20px] font-bold leading-[32px] text-white">
          {section.id}
        </span>

        <h2 className="text-[20px] font-medium leading-[160%] text-[#F5F2FF]">
          {section.title}
        </h2>
      </div>

      <p className="mt-[16px] text-[15px] font-normal leading-[160%] tracking-[-0.15px] text-[#A1A1A5]">
        Node.js는 싱글 스레드(Single Thread)로 동작하지만, I/O 작업이
        발생했을 때 이를 백그라운드(libuv 시스템)로{" "}
        <button
          type="button"
          onClick={() => onHighlightClick(section.id)}
          className={[
            "underline underline-offset-auto",
            highlightClass,
          ].join(" ")}
        >
          위임하여 동시다발적인 대규모 요청을 차단(Blocking) 없이
          효율적으로 처리합니다.
        </button>{" "}
        이를 가능하게 하는 것이 바로 이벤트 루프(Event Loop)입니다. 이벤트
        루프는 총 6가지 단계(Timers → Pending I/O → Idle → Poll → Check →
        Close)를 순서대로 무한 루프를 돌며 대기 중인 콜백 함수들을 실행합니다.
      </p>
    </article>
  );
};

export default TeachingMapContentSectionItem;
