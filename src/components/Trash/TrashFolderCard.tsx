import type { TrashFolderItem } from "./trashTypes";
import formatDeletedAt from "../../utils/formatDeletedAt";

interface TrashFolderCardProps {
  folder: TrashFolderItem;
  isRestoreMode: boolean;
  isSelected: boolean;
  onSelect: (folderId: number) => void;
}

const TrashFolderCard = ({
  folder,
  isRestoreMode,
  isSelected,
  onSelect,
}: TrashFolderCardProps) => {
  const handleCardClick = () => {
    if (isRestoreMode) {
      onSelect(folder.id);
    }
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!isRestoreMode || (event.key !== "Enter" && event.key !== " ")) {
      return;
    }

    event.preventDefault();
    onSelect(folder.id);
  };

  return (
    <article
      role={isRestoreMode ? "button" : undefined}
      tabIndex={isRestoreMode ? 0 : undefined}
      aria-pressed={isRestoreMode ? isSelected : undefined}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className={[
        "relative h-[128px] w-full overflow-hidden rounded-[8px]",
        "border bg-[linear-gradient(180deg,rgba(145,125,236,0)_0%,rgba(145,125,236,0.3)_100%)]",
        "transition-[border-color,box-shadow]",
        isRestoreMode ? "cursor-pointer" : "",
        isSelected
          ? "border-[#917DEC] shadow-[inset_0_0_20px_0_rgba(145,125,236,0.6)]"
          : "border-[rgba(145,125,236,0)]",
      ].join(" ")}
    >
      <div className="flex h-full flex-col justify-center px-[26px] py-3">
        <h2 className="font-suit text-[24px] font-semibold leading-[36px] tracking-[-0.72px] text-[#F5F2FF]">
          {folder.name}
        </h2>

        <div className="flex items-center gap-3 font-suit text-[16px] font-medium leading-6 tracking-[-0.48px] text-[#F5F2FF]">
          {folder.itemCount !== undefined && (
            <span>{folder.itemCount}개 항목</span>
          )}

          <span>{formatDeletedAt(folder.deletedAt)}</span>
        </div>
      </div>
    </article>
  );
};

export default TrashFolderCard;
