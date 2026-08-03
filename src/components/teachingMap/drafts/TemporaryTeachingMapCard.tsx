import type {
  KeyboardEvent,
} from "react";

import type {
  TemporaryTeachingMapData,
} from "../../../constants/temporaryTeachingMaps";

interface TemporaryTeachingMapCardProps {
  teachingMap: TemporaryTeachingMapData;
  isDeleteMode: boolean;
  isSelected: boolean;
  onClick: (teachingMapId: number) => void;
  onSelect: (teachingMapId: number) => void;
}

const TemporaryTeachingMapCard = ({
  teachingMap,
  isDeleteMode,
  isSelected,
  onClick,
  onSelect,
}: TemporaryTeachingMapCardProps) => {
  const typeLabel =
    teachingMap.type === "shortcut"
      ? "Short-cut"
      : "Deep-dive";

  const handleCardClick = () => {
    if (isDeleteMode) {
      onSelect(teachingMap.id);
      return;
    }

    onClick(teachingMap.id);
  };

  const handleCardKeyDown = (
    event: KeyboardEvent<HTMLElement>,
  ) => {
    if (
      event.key !== "Enter" &&
      event.key !== " "
    ) {
      return;
    }

    event.preventDefault();
    handleCardClick();
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`${teachingMap.title} 임시 티칭맵`}
      aria-pressed={
        isDeleteMode
          ? isSelected
          : undefined
      }
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className={[
        "flex h-[100px] w-[1120px] cursor-pointer items-center rounded-[10px]",
        "border bg-[#13151F] p-5 outline-none",
        "transition-[border-color,box-shadow,background-color]",
        "focus-visible:ring-2 focus-visible:ring-[#917DEC]",
        isDeleteMode && isSelected
          ? "border-[#917DEC] shadow-[inset_0_0_20px_0_rgba(145,125,236,0.6)]"
          : "border-transparent",
        !isDeleteMode
          ? "hover:bg-[#171822]"
          : "",
      ].join(" ")}
    >
      <div className="flex min-w-0 flex-1 items-center gap-[10px]">
        <div className="flex h-[60px] w-[98px] shrink-0 items-center justify-center rounded-[10px] bg-[#1F212A] p-[10px]">
          <div className="relative flex items-center">
            {(teachingMap.thumbnailSrcs ?? [teachingMap.thumbnailSrc])
              .slice(0, 3)
              .map((source, index) => (
                <img
                  key={`${source}-${index}`}
                  src={source}
                  alt=""
                  aria-hidden="true"
                  className={[
                    "h-9 w-9 rounded-full border-2 border-[#F5F2FF] object-cover",
                    index === 0 ? "" : "-ml-3",
                  ].join(" ")}
                />
              ))}
            {teachingMap.extraThumbnailCount > 0 && (
              <span className="-ml-3 flex h-9 min-w-9 items-center justify-center rounded-full border-2 border-[#F5F2FF] bg-[#2B2C35] px-1 text-[14px] font-medium text-white">
                +{teachingMap.extraThumbnailCount}
              </span>
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate font-['SUIT'] text-[24px] font-bold leading-[36px] tracking-[-0.24px] text-[#F5F2FF]">
            {teachingMap.title}
          </h2>

          <p className="truncate font-['SUIT'] text-[16px] font-medium leading-6 tracking-[-0.48px] text-[#717379]">
            {teachingMap.description}
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
};

export default TemporaryTeachingMapCard;
