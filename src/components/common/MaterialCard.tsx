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
  variant?: "default" | "archive";
  sourceImageClassName?: string;
  sourceImageAlt?: string;
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
  variant = "default",
  sourceImageClassName,
  sourceImageAlt = "",
  selectable = false,
  selected = false,
  showAiButton = false,
  showOriginalButton = true,
  onSelect,
  onAiAnalysis,
  onOpenOriginal,
}: MaterialCardProps) => {
  const isArchiveVariant = variant === "archive";
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
      className={`relative flex w-full flex-col overflow-hidden border bg-[#2B2C35] transition ${
        isArchiveVariant ? "max-h-[335px] rounded-[12px]" : "rounded-[10px]"
      } ${selectable ? "cursor-pointer" : "cursor-default"} ${
        selected
          ? `border-[#917DEC] ${isArchiveVariant ? "shadow-[inset_0_0_20px_0_rgba(145,125,236,0.6)]" : "shadow-[inset_0_0_20px_rgba(145,125,236,0.6)]"}`
          : "border-[#3A3946]"
      }`}
    >
      <div
        className={`flex h-[75px] shrink-0 items-center justify-between px-[29px] ${isArchiveVariant ? "" : "py-[10px]"}`}
      >
        <div
          className={`flex items-center gap-[32px] text-center font-['Montserrat'] text-[20px] font-medium italic leading-[150%] tracking-[-0.48px] text-[#F5F2FF] ${isArchiveVariant ? "" : "min-w-0"}`}
        >
          <span className={isArchiveVariant ? undefined : "shrink-0"}>
            #{tag}
          </span>
          <span className={isArchiveVariant ? undefined : "shrink-0"}>
            {date}
          </span>
          {extraMeta && (
            <span
              className={isArchiveVariant ? undefined : "truncate"}
            >
              {extraMeta}
            </span>
          )}
        </div>

        {!selectable && (showAiButton || showOriginalButton) && (
          <div
            className={`${isArchiveVariant ? "" : "ml-[20px]"} flex shrink-0 items-center gap-[10px]`}
          >
            {showAiButton && (
              <button
                type="button"
                onClick={(event) => handleAction(event, onAiAnalysis)}
                className="flex h-[40px] w-[164px] items-center justify-center gap-[8px] rounded-[8px] bg-[#917DEC] transition-colors hover:bg-[#7D66E8]"
              >
                <img
                  src="/icon/AI.svg"
                  alt=""
                  className={`h-[22px] w-[22px] object-contain ${isArchiveVariant ? "shrink-0" : ""}`}
                />
                <span
                  className={`font-['SUIT'] text-[20px] font-medium text-[#FAFAFA] ${isArchiveVariant ? "leading-[150%] tracking-[-0.6px]" : ""}`}
                >
                  AI 분석 결과
                </span>
              </button>
            )}

            {showOriginalButton && (
              <button
                type="button"
                disabled={!onOpenOriginal && !isArchiveVariant}
                onClick={(event) => handleAction(event, onOpenOriginal)}
                className={`flex w-[164px] items-center justify-center gap-[8px] rounded-[8px] bg-[#24242E] transition-colors hover:bg-[#343444] disabled:cursor-not-allowed disabled:opacity-40 ${isArchiveVariant ? "h-[42px]" : "h-[40px]"}`}
              >
                <Globe size={22} className="shrink-0 text-[#FAFAFA]" />
                <span
                  className={`font-['SUIT'] text-[20px] font-medium text-[#FAFAFA] ${isArchiveVariant ? "leading-[150%] tracking-[-0.6px]" : ""}`}
                >
                  원문으로 이동
                </span>
              </button>
            )}
          </div>
        )}
      </div>

      <div
        className={`rounded-t-[10px] px-[30px] ${isArchiveVariant ? "min-h-0 flex-1 bg-[#11121A] py-[40px]" : "bg-[#13151F] py-[20px]"}`}
      >
        <div
          className={`mb-[20px] flex items-center gap-[15px] ${isArchiveVariant ? "" : "min-w-0"}`}
        >
          <SourceImage
            src={sourceImage}
            fallbackSrc={fallbackImage}
            alt={sourceImageAlt}
            className={
              sourceImageClassName ??
              "h-[36px] w-[36px] shrink-0 rounded-full object-contain"
            }
          />
          <h2 className="truncate font-['SUIT'] text-[24px] font-bold leading-[150%] tracking-[-0.24px] text-[#D0D0D2]">
            {title}
          </h2>
        </div>

        <p
          className={`${isArchiveVariant ? "line-clamp-3" : "line-clamp-4"} whitespace-pre-line font-['SUIT'] text-[20px] font-medium leading-[160%] tracking-[-0.6px] text-[#898A8F]`}
        >
          {description}
        </p>
      </div>
    </article>
  );
};

export default MaterialCard;
