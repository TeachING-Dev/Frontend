import { useEffect, useRef, useState } from "react";

interface SortOption<T extends string> {
  value: T;
  label: string;
}

interface SortDropdownProps<T extends string> {
  ariaLabel: string;
  value: T;
  options: SortOption<T>[];
  onChange: (value: T) => void;
  widthClassName?: string;
}

const SortDropdown = <T extends string>({
  ariaLabel,
  value,
  options,
  onChange,
  widthClassName = "w-[147px]",
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
      document.removeEventListener(
        "pointerdown",
        handleOutsideClick,
      );
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative shrink-0 ${widthClassName}`}
    >
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
        className="flex h-10 w-full items-center justify-center gap-2 rounded-[8px] bg-[#24232D] px-3 font-['SUIT'] text-[20px] font-semibold leading-[28px] tracking-[-0.6px] text-[#F5F2FF]"
      >
        <span className="min-w-0 whitespace-nowrap">
          {selectedOption.label}
        </span>

        <span
          aria-hidden="true"
          className={[
            "h-0 w-0 shrink-0 border-x-[7px] border-t-[9px]",
            "border-x-transparent border-t-[#F5F2FF]",
            "transition-transform duration-200",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={ariaLabel}
          className="absolute right-0 top-[46px] z-30 w-full overflow-hidden rounded-[8px] bg-[#24232D] shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
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
              className="flex w-full items-center whitespace-nowrap px-5 py-3 text-left font-['SUIT'] text-[18px] font-medium leading-[25px] tracking-[-0.54px] text-[#F5F2FF] hover:bg-[#3A3847]"
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