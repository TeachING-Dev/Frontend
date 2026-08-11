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
      className="flex h-[40px] w-[230px] items-center gap-[5px] rounded-[5px] bg-[#13151F] p-[5px] lg:h-[50px] lg:w-[352px] lg:gap-[13px] lg:rounded-[10px] lg:px-[10px] lg:py-[5px]"
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
              "flex h-[30px] w-[70px] shrink-0 items-center justify-center lg:h-[40px] lg:w-[102px]",
              "rounded-[5px] px-[5px] lg:p-[10px]",
              "whitespace-nowrap",
              "font-['SUIT'] text-[13px] font-normal not-italic lg:text-[18px] lg:font-medium",
              "leading-[150%] tracking-[-0.35px] lg:leading-[27px] lg:tracking-[-0.54px]",
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