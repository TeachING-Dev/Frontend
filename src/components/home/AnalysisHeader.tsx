import { useState } from "react";

import type { MaterialTag } from "../../apis/material";

type AnalysisHeaderProps = {
  date: string;
  title: string;
  originUrl: string;
  tags: MaterialTag[];
  onSelectedTagsChange?: (
    tags: MaterialTag[],
  ) => void;
};

const AnalysisHeader = ({
  date,
  title,
  originUrl,
  tags,
  onSelectedTagsChange,
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
    <header className="mb-[46px] min-w-0">
      {/* 날짜 */}
      <p className="mb-[6px] text-[18px] font-medium italic leading-[150%] tracking-[-0.54px] text-[#B8B9BC]">
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
      <div className="mb-[20px] flex flex-wrap items-center gap-[12px]">
        {tags.map((tag) => {
          const isRemoved =
            removedTagIds.includes(
              tag.tagId,
            );

          return (
            <div
              key={tag.tagId}
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
                  text-[15px]
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

      {/* URL */}
      {originUrl && (
        <a
          href={originUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-0 items-center gap-[8px] text-[#717379] transition-opacity hover:opacity-80"
        >
          <img
            src="/icon/링크.svg"
            alt=""
            aria-hidden="true"
            className="h-[24px] w-[24px] shrink-0 object-contain"
          />

          <span className="truncate font-['Montserrat'] text-[14px] font-medium italic leading-[150%] tracking-[-0.42px] text-[#42444C]">
            {originUrl}
          </span>
        </a>
      )}
    </header>
  );
};

export default AnalysisHeader;
