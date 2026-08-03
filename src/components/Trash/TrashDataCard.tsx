import type { TrashDataItem } from "./trashTypes";
import formatDeletedAt from "../../utils/formatDeletedAt";

interface TrashDataCardProps {
  data: TrashDataItem;
  isRestoreMode: boolean;
  isSelected: boolean;
  onSelect: (dataId: number) => void;
}

const TrashDataCard = ({
  data,
  isRestoreMode,
  isSelected,
  onSelect,
}: TrashDataCardProps) => {
  const handleCardClick = () => {
    if (isRestoreMode) {
      onSelect(data.id);
    }
  };

  const handleCardKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
  ) => {
    if (
      !isRestoreMode ||
      (event.key !== "Enter" &&
        event.key !== " ")
    ) {
      return;
    }

    event.preventDefault();
    onSelect(data.id);
  };

  return (
    <div className="relative">
      <article
        role={
          isRestoreMode
            ? "button"
            : undefined
        }
        tabIndex={
          isRestoreMode ? 0 : undefined
        }
        aria-pressed={
          isRestoreMode
            ? isSelected
            : undefined
        }
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
        className={[
          "overflow-hidden rounded-[10px] border bg-[#13151F]",
          "transition-[border-color,box-shadow]",
          isRestoreMode
            ? "cursor-pointer"
            : "",
          isSelected
            ? "border-[#917DEC] shadow-[inset_0_0_20px_0_rgba(145,125,236,0.6)]"
            : "border-[#30313A]",
        ].join(" ")}
      >
        <div className="flex min-h-[68px] items-center justify-between rounded-t-[10px] bg-[#2B2C35] px-5">
          <div className="flex items-center gap-6 text-[16px] font-normal leading-6 text-[#F5F2FF]">
            <span>#{data.tag}</span>
            <span className="[font-family:Montserrat,sans-serif] italic tracking-[-0.4px]">
              {formatDeletedAt(
                data.deletedAt,
              )}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(event) =>
                event.stopPropagation()
              }
              className="flex h-10 items-center justify-center gap-2 rounded-[5px] bg-[#917DEC] px-5 font-suit text-[18px] font-medium text-[#F5F2FF]"
            >
              AI 분석 결과
            </button>

            <button
              type="button"
              onClick={(event) =>
                event.stopPropagation()
              }
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

        </div>
      </article>
    </div>
  );
};

export default TrashDataCard;