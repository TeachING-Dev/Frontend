import { Check } from "lucide-react";

import type { TeachingMapType } from "./TeachingMapCreateHeader";

type TeachingMapTypeSelectProps = {
  selectedType: TeachingMapType;
  onChange: (type: TeachingMapType) => void;
};

type TypeOption = {
  value: TeachingMapType;
  label: string;
  description: string;
};

const TYPE_OPTIONS: TypeOption[] = [
  {
    value: "shortcut",
    label: "Short-cut",
    description:
      "시간이 없나요? 핵심만 골라 단기 커리큘럼을 짭니다",
  },
  {
    value: "deepDive",
    label: "Deep-dive",
    description:
      "기초부터 심화까지, 모든 자료를 체계적으로 연결합니다",
  },
];

const TeachingMapTypeSelect = ({
  selectedType,
  onChange,
}: TeachingMapTypeSelectProps) => {
  return (
    <fieldset className="flex flex-col gap-[10px] lg:gap-3">
      <legend className="sr-only">티칭맵 학습 유형</legend>

      {TYPE_OPTIONS.map((option) => {
        const isSelected = option.value === selectedType;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            className="flex items-center text-left"
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-[5px] border p-[5px] transition lg:h-9 lg:w-9 lg:p-0 ${
                isSelected
                  ? "border-[#917DEC] bg-[#917DEC]"
                  : "border-[#5D5D5D] bg-transparent"
              }`}
            >
              {isSelected && (
                <Check
                  size={24}
                  strokeWidth={1.5}
                  className="text-white"
                  aria-hidden="true"
                />
              )}
            </span>

            <span
              className={`ml-[5px] flex h-[25px] w-[70px] shrink-0 items-center justify-center rounded-[5px] px-[10px] py-[5px] font-['SUIT_Variable'] text-[10px] font-normal leading-[14px] tracking-[-0.2px] lg:ml-4 lg:h-9 lg:w-auto lg:min-w-[110px] lg:px-4 lg:text-[18px] lg:font-medium lg:leading-[27px] lg:tracking-[-0.54px] ${
                isSelected
                  ? "bg-[#917DEC] text-white"
                  : "bg-[#917DEC] text-white"
              }`}
            >
              {option.label}
            </span>

            <span className="ml-[5px] whitespace-nowrap font-['SUIT_Variable'] text-[12px] font-medium leading-[135%] tracking-[-0.3px] text-[#F5F2FF] lg:ml-3 lg:text-[18px] lg:leading-[150%] lg:tracking-[-0.54px] lg:text-[#E8E8E8]">
              {option.description}
            </span>
          </button>
        );
      })}
    </fieldset>
  );
};

export default TeachingMapTypeSelect;
