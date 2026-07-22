import { useEffect, useRef, useState } from "react";

import TrashRestoredMenu from "./TrashRestoredMenu";
import type { TrashDataItem } from "./trashTypes";

interface TrashDataCardProps {
  data: TrashDataItem;
  onRestore: (dataId: number) => void;
}

const TrashDataCard = ({
  data,
  onRestore,
}: TrashDataCardProps) => {
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

  const handleRestore = () => {
    onRestore(data.id);
    setIsMenuOpen(false);
  };

  return (
    <div
      ref={cardRef}
      className="relative"
    >
      <article className="overflow-visible rounded-[10px] border border-[#30313A] bg-[#13151F]">
        <div className="flex min-h-[68px] items-center justify-between bg-[#2B2C35] px-5">
          <div className="flex items-center gap-6 font-suit text-[18px] font-medium leading-[27px] tracking-[-0.54px] text-[#F5F2FF]">
            <span>#{data.tag}</span>
            <span>{data.deletedAt}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-[5px] bg-[#917DEC] px-5 font-suit text-[18px] font-medium text-[#F5F2FF]"
            >
              AI 분석 결과
            </button>

            <button
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-[5px] bg-[#13151F] px-5 font-suit text-[18px] font-medium text-[#F5F2FF]"
            >
              원문으로 이동
            </button>
          </div>
        </div>

        <div className="relative px-[30px] py-5">
          <div className="flex items-center gap-4 pr-12">
            <img
              src={data.thumbnail}
              alt=""
              className="h-9 w-9 shrink-0 rounded-full object-cover"
            />

            <h2 className="truncate font-suit text-[20px] font-semibold leading-[28px] tracking-[-0.6px] text-[#F5F2FF]">
              {data.title}
            </h2>
          </div>

          <p className="mt-5 line-clamp-4 font-suit text-[18px] font-medium leading-[27px] tracking-[-0.54px] text-[#717379]">
            {data.description}
          </p>

          <button
            type="button"
            aria-label={`${data.title} 메뉴 열기`}
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
        </div>
      </article>

      {isMenuOpen && (
        <div className="absolute right-5 top-[112px] z-30">
          <TrashRestoredMenu
            onRestore={handleRestore}
          />
        </div>
      )}
    </div>
  );
};

export default TrashDataCard;