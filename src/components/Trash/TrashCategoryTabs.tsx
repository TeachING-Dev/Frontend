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
    <div className="flex h-[50px] w-[352px] items-center gap-[13px] rounded-[10px] bg-[#13151F] p-[5px_10px]">
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
              "flex h-[40px] w-[102px] items-center justify-center gap-[10px]",
              "rounded-[5px] px-[10px]",
              "font-suit text-[18px] font-medium leading-[27px] tracking-[-0.54px]",
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