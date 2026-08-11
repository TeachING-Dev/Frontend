import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface SortOption<T extends string> {
  value: T;
  label: ReactNode;
}

interface SortDropdownProps<T extends string> {
  ariaLabel: string;
  value: T;
  options: SortOption<T>[];
  onChange: (value: T) => void;
  widthClassName?: string;
  triggerClassName?: string;
  iconClassName?: string;
}

const SortDropdown = <T extends string>({
  ariaLabel,
  value,
  options,
  onChange,
  widthClassName = "w-fit",
  triggerClassName = "",
  iconClassName = "",
}: SortDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    const handleOutsideClick = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`relative shrink-0 ${widthClassName}`}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
        className={`flex h-[30px] w-full items-center justify-center gap-[4px] bg-transparent font-['SUIT'] text-[13px] font-normal leading-[135%] tracking-[-0.325px] text-[#D0D0D2] lg:text-[20px] lg:font-medium lg:leading-[30px] lg:tracking-[-0.6px] ${triggerClassName}`}
      >
        <span className="min-w-0 whitespace-nowrap">
          {selectedOption.label}
        </span>

        <img
          src="/dropdown.svg"
          alt=""
          aria-hidden="true"
          className={`h-[16px] w-[16px] shrink-0 lg:h-5 lg:w-5 ${iconClassName} ${isOpen ? "scale-[-1]" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={ariaLabel}
          className="absolute right-0 top-[36px] z-30 min-w-max overflow-hidden rounded-[8px] bg-[#24232D] shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="flex w-full items-center whitespace-nowrap px-4 py-2 text-left font-['SUIT'] text-[13px] font-normal leading-[135%] tracking-[-0.325px] text-[#F5F2FF] hover:bg-[#3A3847] lg:px-5 lg:py-3 lg:text-[18px] lg:font-medium lg:leading-[25px] lg:tracking-[-0.54px]"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
