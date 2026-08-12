import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const MIN_YEAR = 1950;

interface BirthDateFieldProps {
  value: string;
  onChange: (value: string) => void;
  onCompletenessChange?: (isCompleteOrEmpty: boolean) => void;
}

interface DateParts {
  year: number | null;
  month: number | null;
  day: number | null;
}

interface BirthDateDropdownProps {
  label: string;
  placeholder: string;
  value: number | null;
  options: number[];
  widthClassName: string;
  onChange: (value: number) => void;
}

const parseBirthDate = (
  value: string | null | undefined,
): DateParts => {
  if (!value) {
    return { year: null, month: null, day: null };
  }

  const matchedDate = value.match(
    /^(\d{4})(?:-|년)(\d{1,2})(?:-|월)(\d{1,2})(?:일)?$/,
  );

  if (!matchedDate) {
    return { year: null, month: null, day: null };
  }

  return {
    year: Number(matchedDate[1]),
    month: Number(matchedDate[2]),
    day: Number(matchedDate[3]),
  };
};

const formatBirthDate = ({
  year,
  month,
  day,
}: DateParts) => {
  if (!year || !month || !day) {
    return "";
  }

  return [
    year,
    String(month).padStart(2, "0"),
    String(day).padStart(2, "0"),
  ].join("-");
};

const BirthDateDropdown = ({
  label,
  placeholder,
  value,
  options,
  widthClassName,
  onChange,
}: BirthDateDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOutsideClick = (event: PointerEvent) => {
      if (
        !dropdownRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={`relative ${widthClassName}`}>
      <button
        type="button"
        aria-label={`${label} 선택`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
        className={[
          "flex h-[50px] w-full items-center gap-[5px] rounded-[5px] border bg-[#1F212A] px-[10px] py-[5px] text-left lg:h-[60px] lg:gap-[10px] lg:px-5 lg:py-[14px]",
          isOpen ? "border-[#F5F2FF]" : "border-transparent",
        ].join(" ")}
      >
        <span
          className={[
            "min-w-0 flex-1 font-['SUIT'] text-[13px] font-medium leading-[150%] tracking-[-0.325px] lg:text-[20px] lg:font-semibold lg:leading-[42px] lg:tracking-[-0.84px]",
            value ? "text-[#D0D0D2]" : "text-[#42444C]",
          ].join(" ")}
        >
          {value ?? placeholder}
        </span>
        <img
          src="/icon/purple_dropdown.svg"
          alt=""
          aria-hidden="true"
          className={`h-[28px] w-[28px] shrink-0 ${isOpen ? "scale-[-1]" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={`${label} 목록`}
          className="absolute left-0 top-[54px] z-50 max-h-[220px] w-full overflow-y-auto rounded-[5px] bg-[#1F212A] py-2 shadow-[0_0_30px_rgba(145,125,236,0.35)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:top-[68px]"
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={value === option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={[
                "flex h-10 w-full items-center px-[10px] text-left text-[13px] font-medium transition-colors lg:h-11 lg:px-5 lg:text-[20px] lg:font-semibold",
                value === option
                  ? "bg-[#917DEC] text-white"
                  : "text-[#D0D0D2] hover:bg-[#2B2C35]",
              ].join(" ")}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const BirthDateField = ({
  value,
  onChange,
  onCompletenessChange,
}: BirthDateFieldProps) => {
  const currentYear = new Date().getFullYear();
  const parsedDate = useMemo(() => parseBirthDate(value), [value]);
  const [dateParts, setDateParts] =
    useState<DateParts>(parsedDate);

  const yearOptions = useMemo(
    () =>
      Array.from(
        { length: currentYear - MIN_YEAR + 1 },
        (_, index) => currentYear - index,
      ),
    [currentYear],
  );
  const monthOptions = useMemo(
    () => Array.from({ length: 12 }, (_, index) => index + 1),
    [],
  );
  const dayCount =
    dateParts.year && dateParts.month
      ? new Date(dateParts.year, dateParts.month, 0).getDate()
      : 31;
  const dayOptions = useMemo(
    () => Array.from({ length: dayCount }, (_, index) => index + 1),
    [dayCount],
  );

  const updateDatePart = (
    key: keyof DateParts,
    nextValue: number,
  ) => {
    const nextDate = { ...dateParts, [key]: nextValue };

    if (
      key !== "day" &&
      nextDate.day &&
      nextDate.year &&
      nextDate.month
    ) {
      const nextDayCount = new Date(
        nextDate.year,
        nextDate.month,
        0,
      ).getDate();
      nextDate.day = Math.min(nextDate.day, nextDayCount);
    }

    setDateParts(nextDate);
    const formattedDate = formatBirthDate(nextDate);
    const hasAnyDatePart = Boolean(
      nextDate.year || nextDate.month || nextDate.day,
    );

    onCompletenessChange?.(
      !hasAnyDatePart || Boolean(formattedDate),
    );

    if (formattedDate) {
      onChange(formattedDate);
    }
  };

  return (
    <div className="flex w-full flex-col lg:w-[736px]">
      <h2 className="mb-[10px] text-[16px] font-semibold leading-[24px] tracking-[-0.4px] text-[#717379] lg:text-[28px] lg:font-bold lg:leading-[42px] lg:tracking-[-0.84px]">
        생년월일
      </h2>

      <div className="flex items-start gap-[10px] lg:gap-5">
        <BirthDateDropdown
          label="연도"
          placeholder="YYYY"
          value={dateParts.year}
          options={yearOptions}
          widthClassName="min-w-0 flex-1 min-[394px]:basis-0 min-[394px]:grow-[5] lg:w-[332px] lg:flex-none"
          onChange={(year) => updateDatePart("year", year)}
        />
        <BirthDateDropdown
          label="월"
          placeholder="MM"
          value={dateParts.month}
          options={monthOptions}
          widthClassName="w-[87px] shrink-0 min-[394px]:w-auto min-[394px]:min-w-0 min-[394px]:basis-0 min-[394px]:grow-[3] lg:w-[182px] lg:flex-none"
          onChange={(month) => updateDatePart("month", month)}
        />
        <BirthDateDropdown
          label="일"
          placeholder="DD"
          value={dateParts.day}
          options={dayOptions}
          widthClassName="w-[87px] shrink-0 min-[394px]:w-auto min-[394px]:min-w-0 min-[394px]:basis-0 min-[394px]:grow-[3] lg:w-[182px] lg:flex-none"
          onChange={(day) => updateDatePart("day", day)}
        />
      </div>
    </div>
  );
};

export default BirthDateField;
