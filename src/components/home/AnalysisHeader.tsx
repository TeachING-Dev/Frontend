import { useState } from "react";

type AnalysisHeaderProps = {
  date: string;
  title: string;
  tags: string[];
};

const AnalysisHeader = ({
  date,
  title,
  tags,
}: AnalysisHeaderProps) => {
  const [removedTagIndexes, setRemovedTagIndexes] =
    useState<number[]>([]);

  const handleToggleTag = (index: number) => {
    setRemovedTagIndexes((prev) => {
      if (prev.includes(index)) {
        return prev.filter(
          (item) => item !== index,
        );
      }

      return [...prev, index];
    });
  };

  return (
    <header className="mb-[46px] min-w-0">
      {/* 날짜 */}
      <p className="mb-[6px] text-[18px] font-medium leading-[150%] tracking-[-0.54px] text-[#B8B9BC]">
        {date}
      </p>

      {/* 제목 */}
      <h1 className="mb-[20px] break-words text-[24px] font-bold leading-[150%] tracking-[-0.24px] text-[#FAFAFA]">
        {title}
      </h1>

      {/* 태그 제목 */}
      <div className="mb-[12px] flex items-center gap-[5px]">
        <img
          src="/icon/tag.png"
          alt=""
          aria-hidden="true"
          className="h-[20px] w-[20px] object-contain"
        />

        <span className="font-['Pretendard'] text-[20px] font-medium leading-normal tracking-[-0.4px] text-[#717379]">
          태그
        </span>
      </div>

      {/* 태그 목록 */}
      <div className="flex flex-wrap items-center gap-[12px]">
        {tags.map((tag, index) => {
          const isRemoved =
            removedTagIndexes.includes(index);

          return (
            <div
              key={`${tag}-${index}`}
              className={`
                flex h-[32px] items-center
                rounded-full
                pl-[12px] pr-[8px]
                ${
                  isRemoved
                    ? "border border-dashed border-[#4B3F72]"
                    : "border border-solid border-[#917DEC]"
                }
              `}
            >
              <span
                className={`
                  font-['Montserrat']
                  text-[12px]
                  font-normal
                  leading-[150%]
                  tracking-[-0.36px]
                  ${
                    isRemoved
                      ? "text-[#4B3F72]"
                      : "text-[#917DEC]"
                  }
                `}
              >
                {tag}
              </span>

              <button
                type="button"
                onClick={() =>
                  handleToggleTag(index)
                }
                aria-label={
                  isRemoved
                    ? `${tag} 태그 삭제 취소`
                    : `${tag} 태그 삭제`
                }
                className={`
                  ml-[2px]
                  flex h-[16px] w-[16px]
                  shrink-0
                  items-center
                  justify-center
                  text-[16px]
                  leading-none
                  transition-opacity
                  hover:opacity-70
                  ${
                    isRemoved
                      ? "text-[#4B3F72]"
                      : "text-[#917DEC]"
                  }
                `}
              >
                {isRemoved ? "+" : "×"}
              </button>
            </div>
          );
        })}
      </div>
    </header>
  );
};

export default AnalysisHeader;