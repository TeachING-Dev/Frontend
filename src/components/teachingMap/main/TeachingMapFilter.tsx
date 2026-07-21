export type TeachingMapFilterType =
  | "all"
  | "shortcut"
  | "deepDive";

interface TeachingMapFilterProps {
  selectedFilter: TeachingMapFilterType;
  onFilterChange: (
    filter: TeachingMapFilterType,
  ) => void;
}

const FILTER_ITEMS: {
  label: string;
  value: TeachingMapFilterType;
}[] = [
  {
    label: "전체",
    value: "all",
  },
  {
    label: "Short-cut",
    value: "shortcut",
  },
  {
    label: "Deep-dive",
    value: "deepDive",
  },
];

const TeachingMapFilter = ({
  selectedFilter,
  onFilterChange,
}: TeachingMapFilterProps) => {
  return (
    <div
      role="tablist"
      aria-label="티칭맵 학습 유형"
      className="flex h-[50px] w-[352px] items-center gap-[13px] rounded-[10px] bg-[#13151F] px-[10px] py-[5px]"
    >
      {FILTER_ITEMS.map((filterItem) => {
        const isActive =
          selectedFilter === filterItem.value;

        return (
          <button
            key={filterItem.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() =>
              onFilterChange(filterItem.value)
            }
            className={[
              "flex h-[40px] w-[102px] shrink-0 items-center justify-center",
              "rounded-[5px] p-[10px]",
              "whitespace-nowrap",
              "font-['SUIT'] text-[18px] font-medium not-italic",
              "leading-[27px] tracking-[-0.54px]",
              "transition-colors duration-150",
              isActive
                ? "bg-[#917DEC] text-[#F5F2FF]"
                : "bg-transparent text-[#42444C] hover:text-[#8D8E94]",
            ].join(" ")}
          >
            {filterItem.label}
          </button>
        );
      })}
    </div>
  );
};

export default TeachingMapFilter;