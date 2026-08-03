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
        <button
          type="button"
          onClick={() => onHighlightClick(section.id)}
          className={[
            "underline underline-offset-auto",
            highlightClass,
          ].join(" ")}
        >
          {section.highlightText}
        </button>
      </p>
    </article>
  );
};

export default TeachingMapContentSectionItem;
