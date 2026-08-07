import { Globe } from "lucide-react";

type ArchiveDataHeaderProps = {
  date: string;
  title: string;
  tags: string[];
  originalUrl: string;
  platformType: string;
  platformImageUrl: string;
  onBack: () => void;
};

const ArchiveDataHeader = ({
  date,
  title,
  tags,
  originalUrl,
  platformType,
  platformImageUrl,
  onBack,
}: ArchiveDataHeaderProps) => {
  const fallbackPlatformIcon =
    platformType.toUpperCase() === "YOUTUBE"
      ? "/icon/youtube-app-icon.png"
      : "/icons.svg";
  const normalizePlatformImageUrl = (
    url: string,
  ) => {
    const markdownLinkMatch =
      url.match(/\((https?:\/\/[^)]+)\)/);

    return markdownLinkMatch
      ? markdownLinkMatch[1]
      : url;
  };

  const platformIconSrc =
    normalizePlatformImageUrl(
      platformImageUrl,
    ) || fallbackPlatformIcon;
  const handleOpenOriginal = () => {
    window.open(originalUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <header className="mb-[58px]">
      {/* 자료 목록으로 이동 */}
      <button
        type="button"
        onClick={onBack}
        className="group mb-1 flex items-center gap-2 rounded px-1 py-1 transition hover:bg-white/10"
      >
        <span
          aria-hidden="true"
          className="text-[20px] font-light leading-none text-[#9B9AA0] transition-colors duration-200 group-hover:text-white"
        >
          &lt;
        </span>

        <span className="text-[16px] text-[#9B9AA0] transition-colors duration-200 group-hover:text-white">
          자료 목록으로 이동
        </span>
      </button>

      {/* 날짜 */}
      <p className="mb-[10px] font-['ABeeZee'] text-[18px] font-normal italic leading-[150%] tracking-[-0.54px] text-[#B8B9BC]">
        {date.split("T")[0]}
      </p>

      {/* 제목과 원문 버튼 */}
      <div className="mb-[24px] flex items-start justify-between">
        <div className="flex min-w-0 items-start gap-[15px]">
          {/* 플랫폼 아이콘 */}
          <div className="mt-2 flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full">
            <img
              src={platformIconSrc}
              alt={platformType}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = fallbackPlatformIcon;
              }}
              className="h-[32px] w-[32px] rounded-full object-contain"
            />
          </div>

          <h1 className="min-w-0 text-[36px] font-bold leading-[150%] tracking-[-1.08px] text-[#FAFAFA]">
            {title}
          </h1>
        </div>

        <button
          type="button"
          onClick={handleOpenOriginal}
          className="flex h-[40px] shrink-0 items-center justify-center gap-[5px] rounded-[5px] bg-[#24232D] px-[14px] font-['42dot_Sans'] text-[20px] font-semibold leading-[150%] tracking-[-0.6px] text-[#F5F2FF] transition-colors hover:bg-[#3A3847]"
        >
          <Globe size={24} strokeWidth={2} />
          원문으로 이동
        </button>
      </div>

      {/* 태그 제목 */}
      <div className="mb-[12px] flex items-center gap-[11px]">
        <img
          src="/icon/tag.png"
          alt=""
          aria-hidden="true"
          className="h-[20px] w-[20px] object-contain"
        />

        <span className="font-['Pretendard'] text-[20px] font-medium leading-normal tracking-[-0.4px] text-[#717379]">
          태그
        </span>
      </div>

      {/* 태그 목록 */}
      <div className="flex flex-wrap items-center gap-[10px]">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex h-[36px] items-center justify-center rounded-full border border-[#917DEC] px-[12px] text-center font-['Montserrat'] text-[12px] font-normal italic leading-[150%] tracking-[-0.36px] text-[#917DEC]"
          >
            #{tag}
          </span>
        ))}
      </div>
    </header>
  );
};

export default ArchiveDataHeader;
