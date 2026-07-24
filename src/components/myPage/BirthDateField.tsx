import {
  useEffect,
  useRef,
  useState,
} from "react";

import BirthDateCalendar from "./BirthDateCalendar";

const calendarIcon =
  "/myPage/calender.svg";

interface BirthDateFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const BirthDateField = ({
  value,
  onChange,
}: BirthDateFieldProps) => {
  const [
    isCalendarOpen,
    setIsCalendarOpen,
  ] = useState(false);

  const birthDateFieldRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCalendarOpen) {
      return;
    }

    const handleOutsideClick = (
      event: PointerEvent,
    ) => {
      const clickedNode =
        event.target as Node;

      if (
        birthDateFieldRef.current?.contains(
          clickedNode,
        )
      ) {
        return;
      }

      setIsCalendarOpen(false);
    };

    const handleEscapeKey = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener(
      "pointerdown",
      handleOutsideClick,
    );

    document.addEventListener(
      "keydown",
      handleEscapeKey,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsideClick,
      );

      document.removeEventListener(
        "keydown",
        handleEscapeKey,
      );
    };
  }, [isCalendarOpen]);

  const toggleCalendar = () => {
    setIsCalendarOpen(
      (previousState) =>
        !previousState,
    );
  };

  return (
    <div
      ref={birthDateFieldRef}
      className="relative flex w-[736px] flex-col"
    >
      <label
        htmlFor="birthDate"
        className="mb-[25px] text-[28px] font-bold leading-[150%] tracking-[-0.84px] text-[#717379]"
      >
        생년월일
      </label>

      <div className="flex h-[60px] w-full items-center rounded-[5px] bg-[#1F212A] px-[20px]">
        <input
          id="birthDate"
          type="text"
          value={value}
          placeholder="0000년00월00일"
          readOnly
          className="min-w-0 flex-1 bg-transparent text-[20px] font-semibold leading-[150%] tracking-[-0.6px] text-[#D0D0D2] outline-none placeholder:text-[#42444C]"
        />

        <button
          type="button"
          aria-label="생년월일 선택"
          aria-expanded={
            isCalendarOpen
          }
          onClick={toggleCalendar}
          className="flex h-[40px] w-[40px] items-center justify-center rounded-[4px] p-[4px]"
        >
          <img
            src={calendarIcon}
            alt=""
            className="h-[32px] w-[32px]"
          />
        </button>
      </div>

      {isCalendarOpen ? (
        <BirthDateCalendar
          value={value}
          onChange={onChange}
          onClose={() =>
            setIsCalendarOpen(false)
          }
        />
      ) : null}
    </div>
  );
};

export default BirthDateField;