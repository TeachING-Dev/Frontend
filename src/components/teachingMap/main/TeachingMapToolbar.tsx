import { useState } from "react";

export type TeachingMapSortType =
  | "latest"
  | "oldest";

interface TeachingMapToolbarProps {
  sortType: TeachingMapSortType;
  onSortChange: (
    sortType: TeachingMapSortType,
  ) => void;
  onDeleteModeStart: () => void;
}

const TeachingMapToolbar = ({
  sortType,
  onSortChange,
  onDeleteModeStart,
}: TeachingMapToolbarProps) => {
  const [isSortMenuOpen, setIsSortMenuOpen] =
    useState(false);

  const sortLabel =
    sortType === "latest"
      ? "최신순"
      : "오래된순";

  const handleSortButtonClick = () => {
    setIsSortMenuOpen(
      (previousState) => !previousState,
    );
  };

  const handleSortOptionClick = (
    selectedSortType: TeachingMapSortType,
  ) => {
    onSortChange(selectedSortType);
    setIsSortMenuOpen(false);
  };

  return (
    <div className="flex h-[30px] items-center gap-[86px]">
      <div className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isSortMenuOpen}
          onClick={handleSortButtonClick}
          className="flex h-[30px] items-center gap-[2px] font-['SUIT'] text-[20px] font-medium leading-[30px] tracking-[-0.6px] text-[#D0D0D2]"
        >
          <span>{sortLabel}</span>

          <img
            src="/dropdown.svg"
            alt=""
            aria-hidden="true"
            className={[
              "h-[14px] w-5",
              "transition-transform duration-150",
              isSortMenuOpen
                ? "rotate-180"
                : "",
            ].join(" ")}
          />
        </button>

        {isSortMenuOpen && (
          <ul
            role="listbox"
            aria-label="티칭맵 정렬"
            className="absolute right-0 top-[38px] z-20 w-[120px] overflow-hidden rounded-[5px] bg-[#1A1B25] py-1 shadow-lg"
          >
            <li>
              <button
                type="button"
                role="option"
                aria-selected={
                  sortType === "latest"
                }
                onClick={() =>
                  handleSortOptionClick(
                    "latest",
                  )
                }
                className={[
                  "flex h-10 w-full items-center px-4",
                  "text-left font-['SUIT'] text-[16px] font-medium",
                  sortType === "latest"
                    ? "bg-[#2B2C35] text-[#D9CDFF]"
                    : "text-[#8D8E94] hover:bg-[#24252E]",
                ].join(" ")}
              >
                최신순
              </button>
            </li>

            <li>
              <button
                type="button"
                role="option"
                aria-selected={
                  sortType === "oldest"
                }
                onClick={() =>
                  handleSortOptionClick(
                    "oldest",
                  )
                }
                className={[
                  "flex h-10 w-full items-center px-4",
                  "text-left font-['SUIT'] text-[16px] font-medium",
                  sortType === "oldest"
                    ? "bg-[#2B2C35] text-[#D9CDFF]"
                    : "text-[#8D8E94] hover:bg-[#24252E]",
                ].join(" ")}
              >
                오래된순
              </button>
            </li>
          </ul>
        )}
      </div>

      <button
        type="button"
        onClick={onDeleteModeStart}
        className="flex h-[30px] items-center gap-[3px] font-['SUIT'] text-[20px] font-medium leading-[30px] tracking-[-0.6px] text-[#D0D0D2]"
      >
        <img
          src="/Trashcan.svg"
          alt=""
          aria-hidden="true"
          className="h-[22px] w-[22px]"
        />

        <span>휴지통으로 이동</span>
      </button>
    </div>
  );
};

export default TeachingMapToolbar;