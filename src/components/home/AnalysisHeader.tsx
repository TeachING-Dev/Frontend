import { type ReactNode, useState } from "react";

import type { MaterialTag } from "../../apis/material";

type AnalysisHeaderProps = {
  date: string;
  title: string;
  originUrl: string;
  tags: MaterialTag[];
  onSelectedTagsChange?: (
    tags: MaterialTag[],
  ) => void;
  mobileFolderSelect?: ReactNode;
};

const AnalysisHeader = ({
  date,
  title,
  originUrl,
  tags,
  onSelectedTagsChange,
  mobileFolderSelect,
}: AnalysisHeaderProps) => {
  const [removedTagIds, setRemovedTagIds] =
    useState<number[]>([]);

  const handleToggleTag = (tagId: number) => {
    setRemovedTagIds((prev) => {
      const nextRemovedTagIds =
        prev.includes(tagId)
          ? prev.filter(
              (id) => id !== tagId,
            )
          : [...prev, tagId];

      const selectedTags = tags.filter(
        (tag) =>
          !nextRemovedTagIds.includes(
            tag.tagId,
          ),
      );

      onSelectedTagsChange?.(
        selectedTags,
      );

      return nextRemovedTagIds;
    });
  };

  return (
    <header className="mb-[20px] min-w-0 lg:mb-[46px]">
      {/* 날짜 */}
      <p className="mb-[6px] text-[16px] font-medium italic leading-[150%] tracking-[-0.48px] text-[#B8B9BC] lg:text-[18px] lg:tracking-[-0.54px]">
        {date}
      </p>

      {/* 제목 */}
      <h1 className="mb-[20px] break-words text-[24px] font-bold leading-[150%] tracking-[-0.24px] text-[#FAFAFA]">
        {title}
      </h1>

      {/* 태그 제목 */}
      <div className="mb-[8px] flex items-center gap-[5px] lg:mb-[12px]">
        <img
          src="/icon/tag.png"
          alt=""
          aria-hidden="true"
          className="h-[24px] w-[24px] object-contain lg:h-[20px] lg:w-[20px]"
        />

        <span className="font-['Pretendard'] text-[20px] font-medium leading-normal tracking-[-0.4px] text-[#717379]">
          태그
        </span>
      </div>

      {/* 태그 목록 */}
      <div className="-mx-[16px] mb-[22px] flex items-center gap-[8px] overflow-x-auto px-[16px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:mb-[20px] lg:flex-wrap lg:gap-[12px] lg:overflow-visible lg:px-0">
        {tags.map((tag) => {
          const isRemoved =
            removedTagIds.includes(
              tag.tagId,
            );

          return (
            <div
              key={tag.tagId}
              className={`
                flex h-[24px] shrink-0 items-center lg:h-[32px]
                rounded-full
                px-[5px] lg:pl-[12px] lg:pr-[8px]
                ${
                  isRemoved
                    ? "border-[0.5px] border-dashed border-[#4B3F72] lg:border"
                    : "border-[0.5px] border-solid border-[#917DEC] lg:border"
                }
              `}
            >
              <span
                className={`
                  font-['Montserrat']
                  text-[12px] lg:text-[15px]
                  font-semibold
                  italic
                  leading-[150%]
                  tracking-[-0.36px]
                  ${
                    isRemoved
                      ? "text-[#4B3F72]"
                      : "text-[#917DEC]"
                  }
                `}
              >
                #{tag.tagName}
              </span>

              <button
                type="button"
                onClick={() =>
                  handleToggleTag(
                    tag.tagId,
                  )
                }
                aria-label={
                  isRemoved
                    ? `${tag.tagName} 태그 삭제 취소`
                    : `${tag.tagName} 태그 삭제`
                }
                className={`
                  ml-[2px]
                  flex h-[10px] w-[10px] lg:h-[16px] lg:w-[16px]
                  shrink-0
                  items-center
                  justify-center
                  text-[14px] lg:text-[20px]
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

      {mobileFolderSelect}

      {/* URL */}
      {originUrl && (
        <a
          href={originUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[20px] flex min-w-0 items-center gap-[5px] text-[#717379] transition-opacity hover:opacity-80 lg:mt-0 lg:gap-[8px]"
        >
          <img
            src="/icon/링크.svg"
            alt=""
            aria-hidden="true"
            className="h-[16px] w-[16px] shrink-0 object-contain lg:h-[24px] lg:w-[24px]"
          />

          <span className="truncate font-['SUIT_Variable'] text-[10px] font-normal leading-[140%] tracking-[-0.2px] text-[#42444C] lg:font-['Montserrat'] lg:text-[14px] lg:font-medium lg:italic lg:leading-[150%] lg:tracking-[-0.42px]">
            {originUrl}
          </span>
        </a>
      )}
    </header>
  );
};

export default AnalysisHeader;
