import { useEffect, useRef, useState } from "react";

import TrashRestoredMenu from "./TrashRestoredMenu";
import type { TrashTeachingMapItem } from "./trashTypes";

interface TrashTeachingMapCardProps {
  teachingMap: TrashTeachingMapItem;
  onRestore: (
    teachingMapId: number,
  ) => void;
}

const TrashTeachingMapCard = ({
  teachingMap,
  onRestore,
}: TrashTeachingMapCardProps) => {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const cardRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent,
    ) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsMenuOpen(false);
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

  const progress =
    teachingMap.totalStep === 0
      ? 0
      : (teachingMap.currentStep /
          teachingMap.totalStep) *
        100;

  const visibleThumbnails =
    teachingMap.thumbnails.slice(0, 3);

  const remainingThumbnailCount =
    teachingMap.thumbnails.length -
    visibleThumbnails.length;

  const handleRestore = () => {
    onRestore(teachingMap.id);
    setIsMenuOpen(false);
  };

  return (
    <div
      ref={cardRef}
      className="relative"
    >
      <article className="relative rounded-[10px] bg-[#13151F] p-5 transition-shadow hover:shadow-[0_0_30px_rgba(145,125,236,0.25)]">
        <div className="flex items-center gap-5 pr-[60px]">
          <div className="flex h-[56px] min-w-[112px] items-center rounded-[10px] bg-[#1F212A] px-3">
            {visibleThumbnails.map(
              (thumbnail, index) => (
                <img
                  key={`${thumbnail}-${index}`}
                  src={thumbnail}
                  alt=""
                  className={[
                    "h-9 w-9 rounded-full border-2 border-white object-cover",
                    index === 0 ? "" : "-ml-3",
                  ].join(" ")}
                />
              ),
            )}

            {remainingThumbnailCount > 0 && (
              <span className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#2B2C35] text-[13px] text-white">
                +{remainingThumbnailCount}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate font-suit text-[24px] font-semibold leading-[36px] tracking-[-0.72px] text-[#F5F2FF]">
              {teachingMap.title}
            </h2>

            <p className="truncate font-suit text-[18px] font-medium leading-[27px] tracking-[-0.54px] text-[#42444C]">
              {teachingMap.description}
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label={`${teachingMap.title} 메뉴 열기`}
          onClick={() =>
            setIsMenuOpen(
              (previous) => !previous,
            )
          }
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center"
        >
          <img
            src="/hambugi.svg"
            alt=""
            aria-hidden="true"
            className="h-9 w-9"
          />
        </button>

        <div className="mt-5 flex items-center gap-8">
          <div className="h-[10px] flex-1 overflow-hidden rounded-full bg-[#4B4D56]">
            <div
              className="h-full rounded-full bg-[#A994FF] shadow-[0_0_12px_rgba(145,125,236,0.9)]"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <span className="shrink-0 font-suit text-[18px] font-medium leading-[27px] tracking-[-0.54px] text-[#917DEC]">
            {teachingMap.currentStep}
            <span className="text-[#717379]">
              {" "}
              / {teachingMap.totalStep}단계
            </span>
          </span>
        </div>
      </article>

      {isMenuOpen && (
        <div className="absolute right-5 top-[76px] z-30">
          <TrashRestoredMenu
            onRestore={handleRestore}
          />
        </div>
      )}
    </div>
  );
};

export default TrashTeachingMapCard;