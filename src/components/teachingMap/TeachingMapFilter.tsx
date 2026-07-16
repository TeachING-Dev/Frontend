export type TeachingMapFilterType = "all" | "shortcut" | "deepDive";

interface TeachingMapFilterProps {
  selectedFilter: TeachingMapFilterType;
  onFilterChange: (filter: TeachingMapFilterType) => void;
}

const TeachingMapFilter = ({
  selectedFilter,
  onFilterChange,
}: TeachingMapFilterProps) => {
  const filterItems: {
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

  return (
    <div
      className="flex h-[50px] w-[352px] items-center gap-[13px] rounded-[10px] bg-[#13151F] px-[10px] py-[5px]"
      role="tablist"
      aria-label="티칭맵 학습 유형"
    >
      {filterItems.map((filterItem) => {
        const isActive = selectedFilter === filterItem.value;
        const isAllFilter = filterItem.value === "all";

        return (
          <button
            key={filterItem.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onFilterChange(filterItem.value)}
            className={[
              "flex h-10 items-center justify-center rounded-[5px] px-[10px]",
              "text-[18px] font-normal leading-[27px] tracking-[-0.54px]",
              "transition-colors duration-150",
              isAllFilter ? "min-w-[84px]" : "min-w-[96px] italic",
              isActive
                ? "bg-[#917DEC] text-[#F4F0FF]"
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