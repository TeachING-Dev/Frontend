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

  const markdownLinkMatch = imageUrl.match(/\((https?:\/\/[^)]+)\)/);
  const normalizedUrl = markdownLinkMatch?.[1] ?? imageUrl;

  if (normalizedUrl.startsWith("http") || normalizedUrl.startsWith("/")) {
    return normalizedUrl;
  }

  return `/icon/${normalizedUrl}`;
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
        isArchiveVariant ? "max-h-[335px] rounded-[12px]" : "rounded-[5px] lg:rounded-[10px]"
      } ${selectable ? "cursor-pointer" : "cursor-default"} ${
        selected
          ? `border-[#917DEC] ${isArchiveVariant ? "shadow-[inset_0_0_20px_0_rgba(145,125,236,0.6)]" : "shadow-[inset_0_0_20px_rgba(145,125,236,0.6)]"}`
          : "border-[#3A3946]"
      }`}
    >
      <div
        className={`flex h-[35px] shrink-0 items-center justify-between px-[10px] lg:h-[75px] lg:px-[29px] ${isArchiveVariant ? "" : "py-[5px] lg:py-[10px]"}`}
      >
        <div
          className={`flex min-w-0 items-center gap-[10px] text-center font-['Montserrat'] text-[10px] font-medium italic leading-[14px] tracking-[-0.2px] text-[#F5F2FF] lg:gap-[32px] lg:text-[16px] lg:leading-[150%] lg:tracking-[-0.48px] ${isArchiveVariant ? "" : "min-w-0"}`}
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
                disabled={!onAiAnalysis}
                onClick={(event) => handleAction(event, onAiAnalysis)}
                className="flex h-[25px] w-[96px] items-center justify-center gap-[4px] rounded-[4px] bg-[#917DEC] transition-colors hover:bg-[#806BDB] disabled:cursor-not-allowed disabled:opacity-40 lg:h-[40px] lg:w-[164px] lg:gap-[8px] lg:rounded-[8px]"
              >
                <img
                  src="/icon/AI.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-[10px] w-[10px] shrink-0 object-contain lg:h-[18px] lg:w-[18px]"
                />
                <span className="font-['SUIT'] text-[10px] font-normal leading-[14px] tracking-[-0.2px] text-[#FAFAFA] lg:text-[20px] lg:font-medium lg:leading-[150%] lg:tracking-[-0.6px]">
                  AI 분석 결과
                </span>
              </button>
            )}
            {showOriginalButton && (
              <button
                type="button"
                disabled={!onOpenOriginal && !isArchiveVariant}
                onClick={(event) => handleAction(event, onOpenOriginal)}
                className={`flex h-[25px] w-[96px] items-center justify-center gap-[4px] rounded-[4px] bg-[#24242E] transition-colors hover:bg-[#343444] disabled:cursor-not-allowed disabled:opacity-40 lg:h-[40px] lg:w-[164px] lg:gap-[8px] lg:rounded-[8px] ${isArchiveVariant ? "lg:h-[42px]" : ""}`}
              >
                <Globe className="h-4 w-4 shrink-0 text-[#FAFAFA] lg:h-[22px] lg:w-[22px]" />
                <span
                  className={`font-['SUIT'] text-[10px] font-normal leading-[14px] tracking-[-0.2px] text-[#FAFAFA] lg:text-[20px] lg:font-medium lg:leading-[150%] lg:tracking-[-0.6px]`}
                >
                  원문으로 이동
                </span>
              </button>
            )}
          </div>
        )}
      </div>

      <div
        className={`rounded-t-[5px] px-[10px] lg:rounded-t-[10px] lg:px-[30px] ${isArchiveVariant ? "min-h-0 flex-1 bg-[#11121A] py-[40px]" : "bg-[#13151F] py-[10px] lg:py-[20px]"}`}
      >
        <div
          className={`mb-[6px] flex items-center gap-[6px] lg:mb-[20px] lg:gap-[15px] ${isArchiveVariant ? "" : "min-w-0"}`}
        >
          <SourceImage
            src={sourceImage}
            fallbackSrc={fallbackImage}
            alt={sourceImageAlt}
            className={
              sourceImageClassName ??
              "h-[17px] w-[17px] shrink-0 rounded-full object-contain lg:h-[36px] lg:w-[36px]"
            }
          />
          <h2 className="truncate font-['SUIT'] text-[14px] font-normal leading-[21px] tracking-[-0.35px] text-[#D0D0D2] lg:text-[24px] lg:font-bold lg:leading-[150%] lg:tracking-[-0.24px]">
            {title}
          </h2>
        </div>

        <p
          className={`${isArchiveVariant ? "line-clamp-3" : "line-clamp-4"} whitespace-pre-line font-['SUIT'] text-[10px] font-normal leading-[14px] tracking-[-0.2px] text-[#898A8F] lg:text-[20px] lg:font-medium lg:leading-[160%] lg:tracking-[-0.6px]`}
        >
          {description}
        </p>
      </div>
    </article>
  );
};

export default MaterialCard;
