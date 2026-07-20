import type { KeyboardEvent } from "react";

export type TeachingMapType = "shortcut" | "deepDive";
export type TeachingMapStatus = "inProgress" | "completed";

export interface TeachingMapCardData {
  id: number;
  title: string;
  description: string;
  type: TeachingMapType;
  status: TeachingMapStatus;
  currentStep: number;
  totalStep: number;
  thumbnailSrc: string;
  createdAt?: string;
}

interface TeachingMapCardProps {
  teachingMap: TeachingMapCardData;
  isDeleteMode?: boolean;
  isSelected?: boolean;
  onClick?: (teachingMapId: number) => void;
  onSelect?: (teachingMapId: number) => void;
}

interface ProgressBarProps {
  currentStep: number;
  totalStep: number;
  isCompleted: boolean;
}

const ProgressBar = ({
  currentStep,
  totalStep,
  isCompleted,
}: ProgressBarProps) => {
  const progressPercentage =
    totalStep > 0
      ? Math.min(Math.max((currentStep / totalStep) * 100, 0), 100)
      : 0;

  const progressWidth = isCompleted ? 100 : progressPercentage;

  return (
    <div
      className="h-[10px] min-w-0 flex-1 overflow-hidden rounded-[100px] bg-[#42444C]"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={totalStep}
      aria-valuenow={isCompleted ? totalStep : currentStep}
      aria-label="티칭맵 학습 진행률"
    >
      <div
        className={[
          "h-full rounded-[100px]",
          "bg-[linear-gradient(90deg,#917DEC_0%,#C1AEFF_100%)]",
          "shadow-[0_0_8px_rgba(193,174,255,0.8)]",
          "transition-[width] duration-300",
        ].join(" ")}
        style={{
          width: `${progressWidth}%`,
        }}
      />
    </div>
  );
};

const TeachingMapCard = ({
  teachingMap,
  isDeleteMode = false,
  isSelected = false,
  onClick,
  onSelect,
}: TeachingMapCardProps) => {
  const {
    id,
    title,
    description,
    type,
    status,
    currentStep,
    totalStep,
    thumbnailSrc,
  } = teachingMap;

  const isCompleted = status === "completed";
  const typeLabel = type === "shortcut" ? "Short-cut" : "Deep-dive";

  const handleCardClick = () => {
    if (isDeleteMode) {
      onSelect?.(id);
      return;
    }

    onClick?.(id);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    handleCardClick();
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`${title} 티칭맵`}
      aria-pressed={isDeleteMode ? isSelected : undefined}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className={[
        "flex w-full cursor-pointer flex-col gap-[10px]",
        "rounded-[10px] border bg-[#13151F] p-5 outline-none",
        "transition-[border-color,box-shadow,background-color,transform]",
        "focus-visible:ring-2 focus-visible:ring-[#917DEC]",
        isDeleteMode && isSelected
          ? [
              "border-[#917DEC]",
              "shadow-[inset_0_0_20px_0_rgba(145,125,236,0.6)]",
            ].join(" ")
          : "border-transparent",
        !isDeleteMode
          ? "hover:-translate-y-[1px] hover:bg-[#171822]"
          : "",
      ].join(" ")}
    >
      <div className="flex min-w-0 items-start gap-[10px]">
        <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[10px] bg-[#1D1E28]">
          <img
            src={thumbnailSrc}
            alt=""
            aria-hidden="true"
            className="h-9 w-9 object-contain"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate font-['SUIT'] text-[24px] font-bold leading-[36px] tracking-[-0.24px] text-[#F5F2FF]">
            {title}
          </h2>

          <p className="truncate font-['SUIT'] text-[16px] font-medium leading-6 tracking-[-0.48px] text-[#717379]">
            {description}
          </p>
        </div>

        <div className="flex h-[60px] w-[130px] shrink-0 items-center justify-center p-[10px]">
          <span className="flex h-10 items-center justify-center whitespace-nowrap rounded-[10px] border border-[#917DEC] px-[10px] font-['SUIT'] text-[16px] font-normal leading-6 tracking-[-0.48px] text-[#917DEC]">
            {typeLabel}
          </span>
        </div>
      </div>

      <div className="flex w-full items-center gap-10">
        <ProgressBar
          currentStep={currentStep}
          totalStep={totalStep}
          isCompleted={isCompleted}
        />

        <div className="flex min-w-[90px] shrink-0 justify-end font-['SUIT'] text-[16px] font-normal leading-6 tracking-[-0.48px]">
          {isCompleted ? (
            <span className="text-[#917DEC]">Success !</span>
          ) : (
            <>
              <span className="text-[#917DEC]">{currentStep}</span>
              <span className="mx-2 text-[#717379]">/</span>
              <span className="text-[#717379]">{totalStep}단계</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default TeachingMapCard;