import type { TrashCategory } from "./trashTypes";

interface TrashCategoryTabsProps {
  selectedCategory: TrashCategory;
  onCategoryChange: (
    category: TrashCategory,
  ) => void;
}

const categories: {
  label: string;
  value: TrashCategory;
}[] = [
  {
    label: "폴더",
    value: "folder",
  },
  {
    label: "자료",
    value: "data",
  },
  {
    label: "티칭맵",
    value: "teachingMap",
  },
];

const TrashCategoryTabs = ({
  selectedCategory,
  onCategoryChange,
}: TrashCategoryTabsProps) => {
  return (
    <div className="flex h-10 w-[230px] shrink-0 items-center gap-[10px] rounded-[7px] bg-[#13151F] p-[5px_6px] lg:h-[50px] lg:w-[352px] lg:gap-[13px] lg:rounded-[10px] lg:p-[5px_10px]">
      {categories.map((category) => {
        const isSelected =
          selectedCategory === category.value;

        return (
          <button
            key={category.value}
            type="button"
            onClick={() =>
              onCategoryChange(category.value)
            }
            className={[
              "flex h-[30px] w-[66px] shrink-0 items-center justify-center lg:h-[40px] lg:w-[102px]",
              "rounded-[5px] px-[5px] lg:px-[10px]",
              "font-suit text-[14px] font-normal leading-[21px] tracking-[-0.35px] lg:text-[18px] lg:font-medium lg:leading-[27px] lg:tracking-[-0.54px]",
              "transition-colors",
              isSelected
                ? "bg-[#917DEC] text-[#F5F2FF]"
                : "bg-transparent text-[#42444C]",
            ].join(" ")}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
};

export default TrashCategoryTabs;
