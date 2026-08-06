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
  variant?: "progress" | "temporary";
  ariaLabel?: string;
  isDeleteMode?: boolean;
  isSelected?: boolean;
  onClick?: (teachingMapId: number) => void;
  onSelect?: (teachingMapId: number) => void;
}

const TeachingMapCard = ({
  teachingMap,
  variant = "progress",
  ariaLabel,
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

  if (variant === "temporary") {
    const temporaryThumbnails = thumbnailSrcs ?? [thumbnailSrc];

    return (
      <article
        role="button"
        tabIndex={0}
        aria-label={ariaLabel ?? `${title} 임시 티칭맵`}
        aria-pressed={isDeleteMode ? isSelected : undefined}
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
        className={[
          "flex h-[100px] w-full cursor-pointer items-center rounded-[10px]",
          "border bg-[#13151F] p-5 outline-none",
          "transition-[border-color,box-shadow,background-color]",
          "focus-visible:ring-2 focus-visible:ring-[#917DEC]",
          isDeleteMode && isSelected
            ? "border-[#917DEC] shadow-[inset_0_0_20px_0_rgba(145,125,236,0.6)]"
            : "border-transparent",
          !isDeleteMode ? "hover:bg-[#171822]" : "",
        ].join(" ")}
      >
        <div className="flex min-w-0 flex-1 items-center gap-[10px]">
          <div className="flex h-[60px] w-[98px] shrink-0 items-center justify-center rounded-[10px] bg-[#1F212A] p-[10px]">
            <div className="relative flex items-center">
              {temporaryThumbnails.slice(0, 3).map((source, index) => (
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
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate font-['SUIT'] text-[24px] font-bold leading-[36px] tracking-[-0.24px] text-[#F5F2FF]">
              {title}
            </h2>
            <p className="truncate font-['SUIT'] text-[16px] font-medium leading-6 tracking-[-0.48px] text-[#717379]">
              {description}
            </p>
          </div>
        </div>

        <div className="ml-[10px] flex h-[60px] w-[130px] shrink-0 items-center justify-center p-[10px]">
          <span className="flex h-10 items-center justify-center whitespace-nowrap rounded-[10px] border border-[#917DEC] px-[10px] font-['SUIT'] text-[16px] font-normal leading-6 tracking-[-0.48px] text-[#917DEC]">
            {typeLabel}
          </span>
        </div>
      </article>
    );
  }

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={ariaLabel ?? `${title} 티칭맵`}
      aria-pressed={isDeleteMode ? isSelected : undefined}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className={[
        "flex w-full cursor-pointer flex-col gap-[10px]",
        "rounded-[10px] bg-[#13151F] p-[5px] outline-none lg:border lg:p-5",
        "transition-[border-color,box-shadow,background-color]",
        "focus-visible:ring-2 focus-visible:ring-[#917DEC]",
        isDeleteMode && isSelected
          ? [
              "border-[#917DEC]",
              "shadow-[inset_0_0_20px_0_rgba(145,125,236,0.6)]",
            ].join(" ")
          : "lg:border-transparent",
        !isDeleteMode ? "hover:bg-[#171822]" : "",
      ].join(" ")}
    >
      <div className="flex min-w-0 items-start gap-[5px] lg:gap-[10px]">
        <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center overflow-hidden rounded-[5px] bg-[#1F212A] p-[4.5px] lg:h-[60px] lg:w-[98px] lg:rounded-[10px] lg:p-[10px]">
          {visibleThumbnails && visibleThumbnails.length > 0 ? (
            <div className="relative flex items-center">
              {visibleThumbnails.map((source, index) => (
                <SourceImage
                  key={`${source}-${index}`}
                  src={source}
                  alt=""
                  className={[
                    "h-[16.25px] w-[16.25px] rounded-full bg-white object-contain lg:h-9 lg:w-9 lg:p-[2px]",
                    index === 0 ? "" : "-ml-[5px] lg:-ml-3",
                  ].join(" ")}
                />
              ))}
              {extraThumbnailCount > 0 && (
                <span className="-ml-[5px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#2B2C35] px-0.5 text-[6px] font-medium text-white lg:-ml-3 lg:h-9 lg:min-w-9 lg:px-1 lg:text-[14px]">
                  +{extraThumbnailCount}
                </span>
              )}
            </div>
          ) : (
            <SourceImage
              src={thumbnailSrc}
              alt=""
              className="h-[16.25px] w-[16.25px] rounded-full bg-white object-contain lg:h-9 lg:w-9 lg:p-[2px]"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-[10px]">
            <h2 className="truncate font-['SUIT'] text-[13px] font-medium leading-[135%] tracking-[-0.325px] text-[#F5F2FF] lg:text-[24px] lg:font-bold lg:leading-[36px] lg:tracking-[-0.24px]">
              {title}
            </h2>

            {deletedAtLabel && (
              <span className="shrink-0 font-['Montserrat'] text-[16px] font-normal italic leading-6 tracking-[-0.4px] text-[#F5F2FF]">
                {deletedAtLabel}
              </span>
            )}
          </div>

          <p className="w-full truncate font-['SUIT'] text-[10px] font-normal leading-[140%] tracking-[-0.2px] text-[#717379] lg:text-[16px] lg:font-medium lg:leading-6 lg:tracking-[-0.48px]">
            {description}
          </p>
        </div>

        <div className="flex shrink-0 items-start justify-end lg:h-[60px] lg:w-[130px] lg:items-center lg:justify-center lg:p-[10px]">
          <span className="flex h-[22px] items-center justify-center whitespace-nowrap rounded-[5px] border-[0.5px] border-[#917DEC] px-[5px] py-0.5 font-['SUIT'] text-[10px] font-normal leading-[140%] tracking-[-0.2px] text-[#917DEC] lg:h-10 lg:rounded-[10px] lg:border lg:px-[10px] lg:text-[16px] lg:leading-6 lg:tracking-[-0.48px]">
            {typeLabel}
          </span>
        </div>
      </div>

      <div className="flex w-full items-center gap-[5px] lg:gap-5">
        <ProgressBar
          value={progress}
          ariaLabel="티칭맵 학습 진행률"
          ariaValueMax={totalStep}
          ariaValueNow={isCompleted ? totalStep : currentStep}
          className="min-w-0 flex-1"
          trackClassName="!h-[5px] !rounded-[100px] lg:!h-[10px]"
          indicatorClassName="!rounded-[100px] !bg-[linear-gradient(90deg,#917DEC_0%,#C1AEFF_100%)] shadow-[0_0_8px_rgba(193,174,255,0.8)] transition-[width] duration-300"
        />

        <div className="flex w-[47px] shrink-0 items-center justify-center font-['SUIT'] text-[10px] font-normal leading-[140%] tracking-[-0.2px] lg:w-[130px] lg:text-[16px] lg:leading-6 lg:tracking-[-0.48px]">
          {isCompleted ? (
            <span className="whitespace-nowrap text-center text-[#917DEC]">
              Success !
            </span>
          ) : (
            <>
              <span className="text-[#917DEC]">{currentStep}</span>

              <span className="mx-1 text-[#717379] lg:mx-2">/</span>

              <span className="text-[#717379]">{totalStep}단계</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default TeachingMapCard;