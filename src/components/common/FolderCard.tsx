import type { KeyboardEvent, ReactNode } from "react";

interface FolderCardProps {
  name: string;
  itemCount?: number;
  meta: string;
  variant: "archive-grid" | "trash";
  selected?: boolean;
  selectable?: boolean;
  menu?: ReactNode;
  onClick: () => void;
}

const FolderCard = ({
  name,
  itemCount,
  meta,
  variant,
  selected = false,
  selectable = false,
  menu,
  onClick,
}: FolderCardProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onClick();
  };

  if (variant === "archive-grid") {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className="flex h-[128px] w-[352px] cursor-pointer rounded-md border border-[#5F4A9B] bg-gradient-to-b from-[#111021] to-[#30275A] px-[26px] pt-[56px] pb-[12px] transition hover:border-[#8B6DFF]"
      >
        <div className="flex w-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="truncate text-[24px] font-semibold leading-[140%] text-white">
              {name}
            </h3>
            {menu}
          </div>
          <div className="flex items-center gap-4 text-[16px] text-[#FAFAFA]">
            {itemCount !== undefined && <span>{itemCount}개 항목</span>}
            <span>{meta}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article
      role="button"
      tabIndex={0}
      aria-pressed={selectable ? selected : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={[
        "relative h-[128px] w-full overflow-hidden rounded-[8px]",
        "border bg-[linear-gradient(180deg,rgba(145,125,236,0)_0%,rgba(145,125,236,0.3)_100%)]",
        "transition-[border-color,box-shadow] cursor-pointer",
        selected
          ? "border-[#917DEC] shadow-[inset_0_0_20px_0_rgba(145,125,236,0.6)]"
          : "border-[rgba(145,125,236,0)]",
      ].join(" ")}
    >
      <div className="flex h-full flex-col justify-center px-[26px] py-3">
        <h2 className="font-suit text-[24px] font-semibold leading-[36px] tracking-[-0.72px] text-[#F5F2FF]">
          {name}
        </h2>
        <div className="flex items-center gap-3 font-suit text-[16px] font-medium leading-6 tracking-[-0.48px] text-[#F5F2FF]">
          {itemCount !== undefined && <span>{itemCount}개 항목</span>}
          <span>{meta}</span>
        </div>
      </div>
    </article>
  );
};

export default FolderCard;
