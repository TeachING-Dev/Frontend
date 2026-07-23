import { useEffect, useRef, useState } from "react";

import type { TrashSortType } from "./trashTypes";

interface TrashSortDropdownProps {
  sortType: TrashSortType;
  onSortChange: (
    sortType: TrashSortType,
  ) => void;
}

const TrashSortDropdown = ({
  sortType,
  onSortChange,
}: TrashSortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent,
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  const selectedLabel =
    sortType === "latest"
      ? "최근 삭제순"
      : "오래된 삭제순";

  const handleSortChange = (
    selectedSortType: TrashSortType,
  ) => {
    onSortChange(selectedSortType);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      <button
        type="button"
        onClick={() =>
          setIsOpen((previous) => !previous)
        }
        className={[
          "flex h-[40px] w-[147px] shrink-0 items-center justify-center gap-2",
          "rounded-[4px] bg-[#1F212A] px-2 py-1",
          "font-suit text-[20px] font-semibold leading-[28px] tracking-[-0.6px]",
          "text-[#F5F2FF]",
        ].join(" ")}
      >
        <span>{selectedLabel}</span>

        <img
          src={
            isOpen
              ? "/rollup.svg"
              : "/dropdowndown.svg"
          }
          alt=""
          aria-hidden="true"
          className="h-6 w-6 shrink-0"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[48px] z-30 w-[170px] overflow-hidden rounded-[5px] bg-[#13151F] shadow-[0_0_30px_rgba(145,125,236,0.35)]">
          <button
            type="button"
            onClick={() =>
              handleSortChange("latest")
            }
            className={[
              "flex h-[44px] w-full items-center px-4",
              "font-suit text-[16px] font-medium",
              sortType === "latest"
                ? "bg-[#252334] text-[#D9CDFF]"
                : "text-[#A1A1A5] hover:bg-[#1F212A]",
            ].join(" ")}
          >
            최근 삭제순
          </button>

          <button
            type="button"
            onClick={() =>
              handleSortChange("oldest")
            }
            className={[
              "flex h-[44px] w-full items-center px-4",
              "font-suit text-[16px] font-medium",
              sortType === "oldest"
                ? "bg-[#252334] text-[#D9CDFF]"
                : "text-[#A1A1A5] hover:bg-[#1F212A]",
            ].join(" ")}
          >
            오래된 삭제순
          </button>
        </div>
      )}
    </div>
  );
};

export default TrashSortDropdown;