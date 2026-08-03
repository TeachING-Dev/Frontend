import type { KeyboardEvent, MouseEvent } from "react";
import { Globe } from "lucide-react";

import SourceImage from "./SourceImage";

export interface MaterialCardProps {
  tag: string;
  date: string;
  title: string;
  description: string;
  platformType: string;
  platformImageUrl?: string;
  extraMeta?: string;
  selectable?: boolean;
  selected?: boolean;
  showAiButton?: boolean;
  showOriginalButton?: boolean;
  onSelect?: () => void;
  onAiAnalysis?: () => void;
  onOpenOriginal?: () => void;
}

const platformIconMap: Record<string, string> = {
  VELOG: "/icon/velog.png",
  YOUTUBE: "/icon/youtube-app-icon.png",
  CAFE: "/icon/cafe-icon.svg",
};

const normalizeImageUrl = (imageUrl?: string) => {
  if (!imageUrl) return undefined;
  if (imageUrl.startsWith("http") || imageUrl.startsWith("/")) return imageUrl;
  return `/icon/${imageUrl}`;
};

const MaterialCard = ({
  tag,
  date,
  title,
  description,
  platformType,
  platformImageUrl,
  extraMeta,
  selectable = false,
  selected = false,
  showAiButton = false,
  showOriginalButton = true,
  onSelect,
  onAiAnalysis,
  onOpenOriginal,
}: MaterialCardProps) => {
  const fallbackImage =
    platformIconMap[platformType.toUpperCase()] ??
    "/icon/최근에 저장한 지식3.png";
  const sourceImage = normalizeImageUrl(platformImageUrl) ?? fallbackImage;

  const handleCardClick = () => {
    if (selectable) onSelect?.();
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!selectable || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    onSelect?.();
  };

  const handleAction = (
    event: MouseEvent<HTMLButtonElement>,
    action?: () => void,
  ) => {
    event.stopPropagation();
    action?.();
  };

  return (
    <article
      role={selectable ? "button" : undefined}
      tabIndex={selectable ? 0 : undefined}
      aria-pressed={selectable ? selected : undefined}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className={`relative flex w-full flex-col overflow-hidden rounded-[10px] border bg-[#2B2C35] transition ${
        selectable ? "cursor-pointer" : "cursor-default"
      } ${
        selected
          ? "border-[#917DEC] shadow-[inset_0_0_20px_rgba(145,125,236,0.6)]"
          : "border-[#3A3946]"
      }`}
    >
      <div className="flex h-[75px] shrink-0 items-center justify-between px-[29px] py-[10px]">
        <div className="flex min-w-0 items-center gap-[32px] font-['SUIT'] text-[18px] font-medium leading-[150%] tracking-[-0.54px] text-[#F5F2FF]">
          <span className="shrink-0">#{tag}</span>
          <span className="shrink-0">{date}</span>
          {extraMeta && (
            <span className="truncate font-['Montserrat'] italic tracking-[-0.4px]">
              {extraMeta}
            </span>
          )}
        </div>

        {!selectable && (showAiButton || showOriginalButton) && (
          <div className="ml-[20px] flex shrink-0 items-center gap-[10px]">
            {showAiButton && (
              <button
                type="button"
                onClick={(event) => handleAction(event, onAiAnalysis)}
                className="flex h-[40px] w-[164px] items-center justify-center gap-[8px] rounded-[8px] bg-[#917DEC] transition-colors hover:bg-[#7D66E8]"
              >
                <img src="/icon/AI.png" alt="" className="h-[22px] w-[22px] object-contain" />
                <span className="font-['SUIT'] text-[20px] font-medium text-[#FAFAFA]">
                  AI 분석 결과
                </span>
              </button>
            )}

            {showOriginalButton && (
              <button
                type="button"
                disabled={!onOpenOriginal}
                onClick={(event) => handleAction(event, onOpenOriginal)}
                className="flex h-[40px] w-[164px] items-center justify-center gap-[8px] rounded-[8px] bg-[#24242E] transition-colors hover:bg-[#343444] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Globe size={22} className="shrink-0 text-[#FAFAFA]" />
                <span className="font-['SUIT'] text-[20px] font-medium text-[#FAFAFA]">
                  원문으로 이동
                </span>
              </button>
            )}
          </div>
        )}
      </div>

      <div className="rounded-t-[10px] bg-[#13151F] px-[30px] py-[20px]">
        <div className="mb-[20px] flex min-w-0 items-center gap-[15px]">
          <SourceImage
            src={sourceImage}
            fallbackSrc={fallbackImage}
            alt=""
            className="h-[36px] w-[36px] shrink-0 rounded-full object-contain"
          />
          <h2 className="truncate font-['SUIT_Variable'] text-[24px] font-bold leading-[150%] tracking-[-0.24px] text-[#D0D0D2]">
            {title}
          </h2>
        </div>

        <p className="line-clamp-4 whitespace-pre-line font-['ABeeZee'] text-[20px] font-normal leading-[160%] text-[#898A8F]">
          {description}
        </p>
      </div>
    </article>
  );
};

export default MaterialCard;
