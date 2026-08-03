import { Globe } from "lucide-react";

import formatDeletedAt from "../../utils/formatDeletedAt";
import SourceImage from "../common/SourceImage";

import type { TrashDataItem } from "./trashTypes";

const platformIconMap: Record<string, string> = {
  VELOG: "/icon/velog.png",
  YOUTUBE: "/icon/youtube-app-icon.png",
  CAFE: "/icon/cafe-icon.svg",
};

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
  const normalizedPlatformImageUrl = data.platformImageUrl
    ? data.platformImageUrl.startsWith("http") ||
      data.platformImageUrl.startsWith("/")
      ? data.platformImageUrl
      : `/icon/${data.platformImageUrl}`
    : undefined;

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
      (event.key !== "Enter" && event.key !== " ")
    ) {
      return;
    }

    event.preventDefault();
    onSelect(data.id);
  };

  const handleOpenOriginal = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();

    if (data.originalUrl) {
      window.open(
        data.originalUrl,
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  return (
    <article
      role={isRestoreMode ? "button" : undefined}
      tabIndex={isRestoreMode ? 0 : undefined}
      aria-pressed={isRestoreMode ? isSelected : undefined}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className={`relative flex max-h-[335px] w-full flex-col overflow-hidden rounded-[12px] border bg-[#2B2C35] transition ${
        isRestoreMode ? "cursor-pointer" : "cursor-default"
      } ${
        isSelected
          ? "border-[#917DEC] shadow-[inset_0_0_20px_0_rgba(145,125,236,0.6)]"
          : "border-[#3A3946]"
      }`}
    >
      <div className="flex h-[75px] shrink-0 items-center justify-between px-[29px]">
        <div className="flex items-center gap-8 text-center font-suit text-[18px] font-medium leading-[150%] tracking-[-0.54px] text-[#F5F2FF]">
          <span>#{data.tag}</span>
          <span>{data.createdAt.split("T")[0]}</span>
          <span className="font-['Montserrat'] italic tracking-[-0.4px]">
            {formatDeletedAt(data.deletedAt)}
          </span>
        </div>

        {!isRestoreMode && (
          <div className="flex items-center gap-[10px]">
            <button
              type="button"
              className="flex h-[40px] w-[164px] items-center justify-center gap-[8px] rounded-[8px] bg-[#917DEC] transition-colors hover:bg-[#7D66E8]"
            >
              <img
                src="/icon/AI.png"
                alt=""
                aria-hidden="true"
                className="h-[22px] w-[22px] shrink-0 object-contain"
              />
              <span className="font-['SUIT'] text-[20px] font-medium leading-[150%] tracking-[-0.6px] text-[#FAFAFA]">
                AI 분석 결과
              </span>
            </button>

            <button
              type="button"
              onClick={handleOpenOriginal}
              className="flex h-[42px] w-[164px] items-center justify-center gap-[8px] rounded-[8px] bg-[#24242E] transition-colors hover:bg-[#343444]"
            >
              <Globe
                size={22}
                className="shrink-0 text-[#FAFAFA]"
              />
              <span className="font-['SUIT'] text-[20px] font-medium leading-[150%] tracking-[-0.6px] text-[#FAFAFA]">
                원문으로 이동
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="min-h-0 flex-1 rounded-t-[10px] bg-[#11121A] px-[30px] py-[40px]">
        <div className="mb-[20px] flex items-center gap-[15px]">
          <SourceImage
            src={
              normalizedPlatformImageUrl ??
              platformIconMap[data.platformType.toUpperCase()] ??
              "/icon/최근에 저장한 지식3.png"
            }
            fallbackSrc={
              platformIconMap[data.platformType.toUpperCase()] ??
              "/icon/최근에 저장한 지식3.png"
            }
            alt=""
            className="h-[36px] w-[36px] shrink-0 object-contain"
          />
          <h2 className="truncate font-['SUIT_Variable'] text-[24px] font-bold leading-[150%] tracking-[-0.24px] text-[#D0D0D2]">
            {data.title}
          </h2>
        </div>

        <p className="line-clamp-3 whitespace-pre-line font-['ABeeZee'] text-[20px] font-normal leading-[160%] text-[#898A8F]">
          {data.description}
        </p>
      </div>
    </article>
  );
};

export default TrashDataCard;