import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const LEFT_ARROW_ICON =
  "/myPage/leftpoint.svg";

const RIGHT_ARROW_ICON =
  "/myPage/rightpoint.svg";

const WEEK_DAYS = [
  "일",
  "월",
  "화",
  "수",
  "목",
  "금",
  "토",
];

const MONTHS = Array.from(
  { length: 12 },
  (_, index) => index + 1,
);

const MIN_YEAR = 1900;
const YEAR_OPTION_HEIGHT = 36;

interface CalendarDate {
  year: number;
  month: number;
  day: number;
}

interface BirthDateCalendarProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

const formatBirthDate = ({
  year,
  month,
  day,
}: CalendarDate) => {
  const formattedMonth = String(
    month,
  ).padStart(2, "0");

  const formattedDay = String(
    day,
  ).padStart(2, "0");

  return `${year}년${formattedMonth}월${formattedDay}일`;
};

const parseBirthDate = (
  value: string,
): CalendarDate | null => {
  const matchedDate = value.match(
    /^(\d{4})년(\d{2})월(\d{2})일$/,
  );

  if (!matchedDate) {
    return null;
  }

  const year = Number(matchedDate[1]);
  const month = Number(matchedDate[2]);
  const day = Number(matchedDate[3]);

  const parsedDate = new Date(
    year,
    month - 1,
    day,
  );

  const isValidDate =
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day;

  if (!isValidDate) {
    return null;
  }

  return {
    year,
    month,
    day,
  };
};

const isSameDate = (
  firstDate: CalendarDate | null,
  secondDate: CalendarDate,
) => {
  if (!firstDate) {
    return false;
  }

  return (
    firstDate.year === secondDate.year &&
    firstDate.month === secondDate.month &&
    firstDate.day === secondDate.day
  );
};

const BirthDateCalendar = ({
  value,
  onChange,
  onClose,
}: BirthDateCalendarProps) => {
  const today = useMemo(
    () => new Date(),
    [],
  );

  const selectedDate = useMemo(
    () => parseBirthDate(value),
    [value],
  );

  const initialYear =
    selectedDate?.year ??
    today.getFullYear();

  const initialMonth =
    selectedDate?.month ??
    today.getMonth() + 1;

  const [
    displayYear,
    setDisplayYear,
  ] = useState(initialYear);

  const [
    displayMonth,
    setDisplayMonth,
  ] = useState(initialMonth);

  const [
    isMonthYearPickerOpen,
    setIsMonthYearPickerOpen,
  ] = useState(false);

  const [
    pickerYear,
    setPickerYear,
  ] = useState(initialYear);

  const yearListRef =
    useRef<HTMLDivElement>(null);

  const monthListRef =
    useRef<HTMLDivElement>(null);

  const currentYear =
    today.getFullYear();

  const currentMonth =
    today.getMonth() + 1;

  const yearOptions = useMemo(() => {
    return Array.from(
      {
        length:
          currentYear -
          MIN_YEAR +
          1,
      },
      (_, index) =>
        currentYear - index,
    );
  }, [currentYear]);

  useEffect(() => {
    if (!isMonthYearPickerOpen) {
      return;
    }

    if (yearListRef.current) {
      const selectedYearIndex =
        currentYear - pickerYear;

      yearListRef.current.scrollTop =
        selectedYearIndex *
          YEAR_OPTION_HEIGHT -
        YEAR_OPTION_HEIGHT * 2;
    }

    if (monthListRef.current) {
      monthListRef.current.scrollTop =
        (displayMonth - 1) *
          YEAR_OPTION_HEIGHT -
        YEAR_OPTION_HEIGHT * 2;
    }
  }, [
    currentYear,
    displayMonth,
    isMonthYearPickerOpen,
    pickerYear,
  ]);

  const daysInMonth = new Date(
    displayYear,
    displayMonth,
    0,
  ).getDate();

  const firstDayOfMonth = new Date(
    displayYear,
    displayMonth - 1,
    1,
  ).getDay();

  const calendarCells = [
    ...Array.from(
      {
        length:
          firstDayOfMonth,
      },
      () => null,
    ),

    ...Array.from(
      {
        length: daysInMonth,
      },
      (_, index) => index + 1,
    ),
  ];

  const isCurrentMonth =
    displayYear === currentYear &&
    displayMonth === currentMonth;

  const isFirstAvailableMonth =
    displayYear === MIN_YEAR &&
    displayMonth === 1;

  const handlePreviousMonth = () => {
    if (isFirstAvailableMonth) {
      return;
    }

    if (displayMonth === 1) {
      setDisplayYear(
        (previousYear) =>
          previousYear - 1,
      );

      setDisplayMonth(12);
      return;
    }

    setDisplayMonth(
      (previousMonth) =>
        previousMonth - 1,
    );
  };

  const handleNextMonth = () => {
    if (isCurrentMonth) {
      return;
    }

    if (displayMonth === 12) {
      setDisplayYear(
        (previousYear) =>
          previousYear + 1,
      );

      setDisplayMonth(1);
      return;
    }

    setDisplayMonth(
      (previousMonth) =>
        previousMonth + 1,
    );
  };

  const handleDateSelect = (
    day: number,
  ) => {
    const nextDate = {
      year: displayYear,
      month: displayMonth,
      day,
    };

    const nextDateObject = new Date(
      displayYear,
      displayMonth - 1,
      day,
    );

    if (nextDateObject > today) {
      return;
    }

    onChange(
      formatBirthDate(nextDate),
    );
  };

  const handleMonthSelect = (
    month: number,
  ) => {
    const nextMonth =
      pickerYear === currentYear
        ? Math.min(
            month,
            currentMonth,
          )
        : month;

    setDisplayYear(pickerYear);
    setDisplayMonth(nextMonth);

    setIsMonthYearPickerOpen(
      false,
    );
  };

  const toggleMonthYearPicker =
    () => {
      setPickerYear(displayYear);

      setIsMonthYearPickerOpen(
        (previousState) =>
          !previousState,
      );
    };

  return (
    <div
      role="dialog"
      aria-label="생년월일 선택 달력"
      className="absolute bottom-[79px] left-[436px] z-30 w-[359px] rounded-[8px] bg-[#13151F] p-[20px] shadow-[0_0_20px_rgba(11,10,24,0.35)]"
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-expanded={
            isMonthYearPickerOpen
          }
          onClick={
            toggleMonthYearPicker
          }
          className="h-[24px] text-left text-[16px] font-medium leading-[24px] text-[#A1A1A5]"
        >
          {displayYear}년{" "}
          {displayMonth}월
        </button>

        <div className="flex items-center gap-[16px]">
          <button
            type="button"
            aria-label="이전 달"
            disabled={
              isFirstAvailableMonth
            }
            onClick={
              handlePreviousMonth
            }
            className="flex h-[24px] w-[24px] items-center justify-center disabled:cursor-not-allowed disabled:opacity-30"
          >
            <img
              src={LEFT_ARROW_ICON}
              alt=""
              className="h-[24px] w-[24px]"
            />
          </button>

          <button
            type="button"
            aria-label="다음 달"
            disabled={isCurrentMonth}
            onClick={handleNextMonth}
            className="flex h-[24px] w-[24px] items-center justify-center disabled:cursor-not-allowed disabled:opacity-30"
          >
            <img
              src={RIGHT_ARROW_ICON}
              alt=""
              className="h-[24px] w-[24px]"
            />
          </button>
        </div>
      </div>

      {isMonthYearPickerOpen ? (
        <div className="mt-[10px] grid grid-cols-2 gap-[10px]">
          <div
            ref={yearListRef}
            aria-label="연도 선택"
            className="h-[180px] overflow-y-auto rounded-[5px] bg-[#1F212A] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {yearOptions.map(
              (year) => {
                const isSelectedYear =
                  year === pickerYear;

                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() =>
                      setPickerYear(
                        year,
                      )
                    }
                    style={{
                      height:
                        YEAR_OPTION_HEIGHT,
                    }}
                    className={[
                      "flex w-full items-center justify-center text-[16px] leading-[24px]",
                      isSelectedYear
                        ? "bg-[#2B2C35] font-medium text-[#C1AEFF]"
                        : "font-normal text-[#A1A1A5] hover:bg-[#2B2C35]",
                    ].join(" ")}
                  >
                    {year}년
                  </button>
                );
              },
            )}
          </div>

          <div
            ref={monthListRef}
            aria-label="월 선택"
            className="h-[180px] overflow-y-auto rounded-[5px] bg-[#1F212A] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {MONTHS.map(
              (month) => {
                const isFutureMonth =
                  pickerYear ===
                    currentYear &&
                  month >
                    currentMonth;

                const isSelectedMonth =
                  pickerYear ===
                    displayYear &&
                  month ===
                    displayMonth;

                return (
                  <button
                    key={month}
                    type="button"
                    disabled={
                      isFutureMonth
                    }
                    onClick={() =>
                      handleMonthSelect(
                        month,
                      )
                    }
                    style={{
                      height:
                        YEAR_OPTION_HEIGHT,
                    }}
                    className={[
                      "flex w-full items-center justify-center text-[16px] leading-[24px]",
                      isSelectedMonth
                        ? "bg-[#2B2C35] font-medium text-[#C1AEFF]"
                        : "font-normal text-[#A1A1A5] hover:bg-[#2B2C35]",
                      isFutureMonth
                        ? "cursor-not-allowed opacity-30"
                        : "",
                    ].join(" ")}
                  >
                    {month}월
                  </button>
                );
              },
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="mt-[10px] grid grid-cols-7 gap-x-[6.33px]">
            {WEEK_DAYS.map(
              (
                weekDay,
                index,
              ) => (
                <div
                  key={weekDay}
                  className={[
                    "flex h-[16px] w-[40px] items-center justify-center text-[12px] font-normal leading-[16px]",
                    index === 0
                      ? "text-[#FF3B3B]"
                      : "",
                    index === 6
                      ? "text-[#3B6CFF]"
                      : "",
                    index !== 0 &&
                    index !== 6
                      ? "text-[#B8B9BC]"
                      : "",
                  ].join(" ")}
                >
                  {weekDay}
                </div>
              ),
            )}
          </div>

          <div className="mt-[20px] grid grid-cols-7 gap-x-[6.33px] gap-y-[4px]">
            {calendarCells.map(
              (day, index) => {
                if (day === null) {
                  return (
                    <div
                      key={`empty-${index}`}
                      aria-hidden="true"
                      className="h-[40px] w-[40px]"
                    />
                  );
                }

                const cellDate = {
                  year:
                    displayYear,
                  month:
                    displayMonth,
                  day,
                };

                const dateObject =
                  new Date(
                    displayYear,
                    displayMonth -
                      1,
                    day,
                  );

                const isFutureDate =
                  dateObject > today;

                const isSelected =
                  isSameDate(
                    selectedDate,
                    cellDate,
                  );

                return (
                  <button
                    key={day}
                    type="button"
                    disabled={
                      isFutureDate
                    }
                    aria-pressed={
                      isSelected
                    }
                    onClick={() =>
                      handleDateSelect(
                        day,
                      )
                    }
                    className={[
                      "flex h-[40px] w-[40px] items-center justify-center rounded-full",
                      "text-[16px] font-normal leading-[24px]",
                      isSelected
                        ? "bg-[#E8E8E8] text-[#A1A1A5]"
                        : "text-[#A1A1A5] hover:bg-[#1F212A]",
                      isFutureDate
                        ? "cursor-not-allowed opacity-30 hover:bg-transparent"
                        : "",
                    ].join(" ")}
                  >
                    {day}
                  </button>
                );
              },
            )}
          </div>
        </>
      )}

      <button
        type="button"
        aria-label="달력 닫기"
        onClick={onClose}
        className="sr-only"
      />
    </div>
  );
};

export default BirthDateCalendar;