import type { KeyboardEvent } from "react";
import ProgressBar from "../../common/ProgressBar";
import SourceImage from "../../common/SourceImage";

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
  thumbnailSrcs?: string[];
  extraThumbnailCount?: number;
  deletedAtLabel?: string;
  createdAt?: string;
}

interface TeachingMapCardProps {
  teachingMap: TeachingMapCardData;
  isDeleteMode?: boolean;
  isSelected?: boolean;
  onClick?: (teachingMapId: number) => void;
  onSelect?: (teachingMapId: number) => void;
}

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
    thumbnailSrcs,
    extraThumbnailCount = 0,
    deletedAtLabel,
  } = teachingMap;

  const isCompleted = status === "completed";

  const typeLabel = type === "shortcut" ? "Short-cut" : "Deep-dive";

  const progress = isCompleted
    ? 100
    : totalStep > 0
      ? (currentStep / totalStep) * 100
      : 0;

  const visibleThumbnails = thumbnailSrcs?.slice(0, 3);

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
        "transition-[border-color,box-shadow,background-color]",
        "focus-visible:ring-2 focus-visible:ring-[#917DEC]",
        isDeleteMode && isSelected
          ? [
              "border-[#917DEC]",
              "shadow-[inset_0_0_20px_0_rgba(145,125,236,0.6)]",
            ].join(" ")
          : "border-transparent",
        !isDeleteMode ? "hover:bg-[#171822]" : "",
      ].join(" ")}
    >
      <div className="flex min-w-0 items-start gap-[10px]">
        <div className="flex h-[60px] w-[98px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-[#1F212A] p-[10px]">
          {visibleThumbnails && visibleThumbnails.length > 0 ? (
            <div className="relative flex items-center">
              {visibleThumbnails.map((source, index) => (
                <SourceImage
                  key={`${source}-${index}`}
                  src={source}
                  alt=""
                  className={[
                    "h-9 w-9 rounded-full bg-white p-[2px] object-contain",
                    index === 0 ? "" : "-ml-3",
                  ].join(" ")}
                />
              ))}
              {extraThumbnailCount > 0 && (
                <span className="-ml-3 flex h-9 min-w-9 items-center justify-center rounded-full bg-[#2B2C35] px-1 text-[14px] font-medium text-white">
                  +{extraThumbnailCount}
                </span>
              )}
            </div>
          ) : (
            <SourceImage
              src={thumbnailSrc}
              alt=""
              className="h-9 w-9 rounded-full bg-white p-[2px] object-contain"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-[10px]">
            <h2 className="truncate font-['SUIT'] text-[24px] font-bold leading-[36px] tracking-[-0.24px] text-[#F5F2FF]">
              {title}
            </h2>

            {deletedAtLabel && (
              <span className="shrink-0 font-['Montserrat'] text-[16px] font-normal italic leading-6 tracking-[-0.4px] text-[#F5F2FF]">
                {deletedAtLabel}
              </span>
            )}
          </div>

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

      <div className="flex w-full items-center gap-5">
        <ProgressBar
          value={progress}
          ariaLabel="티칭맵 학습 진행률"
          ariaValueMax={totalStep}
          ariaValueNow={isCompleted ? totalStep : currentStep}
          className="min-w-0 flex-1"
          trackClassName="!h-[10px] !rounded-[100px]"
          indicatorClassName="!rounded-[100px] !bg-[linear-gradient(90deg,#917DEC_0%,#C1AEFF_100%)] shadow-[0_0_8px_rgba(193,174,255,0.8)] transition-[width] duration-300"
        />

        <div className="flex w-[130px] shrink-0 items-center justify-center font-['SUIT'] text-[16px] font-normal leading-6 tracking-[-0.48px]">
          {isCompleted ? (
            <span className="whitespace-nowrap text-center text-[#917DEC]">
              Success !
            </span>
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
