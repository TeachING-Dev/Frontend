import { useEffect, useRef, useState } from "react";

import TrashRestoredMenu from "./TrashRestoredMenu";
import type { TrashFolderItem } from "./trashTypes";

interface TrashFolderCardProps {
  folder: TrashFolderItem;
  onRestore: (folderId: number) => void;
}

const TrashFolderCard = ({
  folder,
  onRestore,
}: TrashFolderCardProps) => {
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
    onRestore(folder.id);
    setIsMenuOpen(false);
  };

  return (
    <div
      ref={cardRef}
      className="relative"
    >
      <article
        className={[
          "relative h-[150px] w-full overflow-visible rounded-[10px]",
          "border border-[#3A315E]",
          "bg-[linear-gradient(135deg,#13151F_0%,#171526_48%,#31284E_100%)]",
          "transition-shadow hover:shadow-[0_0_30px_rgba(145,125,236,0.35)]",
        ].join(" ")}
      >
        <div className="flex h-full flex-col justify-end px-[26px] pb-3 pt-[56px]">
          <div className="flex items-center justify-between">
            <h2 className="font-suit text-[24px] font-semibold leading-[36px] tracking-[-0.72px] text-[#F5F2FF]">
              {folder.name}
            </h2>

            <button
              type="button"
              aria-label={`${folder.name} 메뉴 열기`}
              onClick={() =>
                setIsMenuOpen(
                  (previous) => !previous,
                )
              }
              className="flex h-9 w-9 shrink-0 items-center justify-center"
            >
              <img
                src="/hambugi.svg"
                alt=""
                aria-hidden="true"
                className="h-9 w-9"
              />
            </button>
          </div>

          <div className="flex items-center gap-4 font-suit text-[18px] font-medium leading-[27px] tracking-[-0.54px] text-[#F5F2FF]">
            <span>
              {folder.itemCount}개 항목
            </span>

            <span>{folder.deletedAt}</span>
          </div>
        </div>
      </article>

      {isMenuOpen && (
        <div className="absolute right-0 top-[110px] z-30">
          <TrashRestoredMenu
            onRestore={handleRestore}
          />
        </div>
      )}
    </div>
  );
};

export default TrashFolderCard;