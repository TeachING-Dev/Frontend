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
    <header className="mb-[20px] lg:mb-[58px]">
      {/* 자료 목록으로 이동 */}
      <button
        type="button"
        onClick={onBack}
        className="group mb-[10px] flex items-center gap-1 rounded transition hover:bg-white/10 lg:mb-1 lg:gap-2 lg:px-1 lg:py-1"
      >
        <span
          aria-hidden="true"
          className="text-[14px] font-light leading-none text-[#9B9AA0] transition-colors duration-200 group-hover:text-white lg:text-[20px]"
        >
          &lt;
        </span>

        <span className="text-[10px] font-normal leading-[14px] text-[#9B9AA0] transition-colors duration-200 group-hover:text-white lg:text-[16px] lg:leading-normal">
          자료 목록으로 이동
        </span>
      </button>

      {/* 날짜 */}
      <p className="mb-[5px] font-['Montserrat'] text-[15px] font-medium italic leading-[18px] text-[#B8B9BC] lg:mb-[10px] lg:font-['ABeeZee'] lg:text-[18px] lg:font-normal lg:leading-[150%] lg:tracking-[-0.54px]">
        {date.split("T")[0]}
      </p>

      {/* 제목과 원문 버튼 */}
      <div className="flex w-full flex-col lg:mb-[24px] lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 w-full items-start gap-[5px] lg:w-auto lg:gap-[15px]">
          {/* 플랫폼 아이콘 */}
          <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full lg:mt-2 lg:h-[40px] lg:w-[40px]">
            <img
              src={platformIconSrc}
              alt={platformType}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = fallbackPlatformIcon;
              }}
              className="h-[20px] w-[20px] rounded-full object-contain lg:h-[40px] lg:w-[40px]"
            />
          </div>

          <h1 className="min-w-0 text-[20px] font-semibold leading-[30px] text-[#FAFAFA] lg:text-[36px] lg:font-bold lg:leading-[150%] lg:tracking-[-1.08px]">
            {title}
          </h1>
        </div>

        <button
          type="button"
          onClick={handleOpenOriginal}
          className="mt-[5px] flex shrink-0 self-end items-center justify-center gap-[5px] rounded-[5px] bg-[#24232D] p-[5px] font-['42dot_Sans'] text-[14px] font-normal leading-[21px] text-[#F5F2FF] transition-colors hover:bg-[#3A3847] lg:mt-0 lg:h-[40px] lg:self-auto lg:px-[14px] lg:text-[20px] lg:font-semibold lg:leading-[150%] lg:tracking-[-0.6px]"
        >
          <Globe className="h-4 w-4 lg:h-6 lg:w-6" strokeWidth={2} />
          원문으로 이동
        </button>
      </div>

      {/* 태그 제목 */}
      <div className="mb-[5px] mt-[5px] flex items-center gap-0 lg:mb-[12px] lg:mt-0 lg:gap-[11px]">
        <img
          src="/icon/tag.png"
          alt=""
          aria-hidden="true"
          className="h-4 w-4 object-contain lg:h-[20px] lg:w-[20px]"
        />

        <span className="font-['Pretendard'] text-[14px] font-medium leading-[21px] text-[#717379] lg:text-[20px] lg:leading-normal lg:tracking-[-0.4px]">
          태그
        </span>
      </div>

      {/* 태그 목록 */}
      <div className="flex flex-wrap items-center gap-[5px] lg:gap-[10px]">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex h-[24px] items-center justify-center rounded-[24px] border-[0.5px] border-[#917DEC] px-[8px] text-center font-['Montserrat'] text-[8px] font-normal italic leading-none text-[#917DEC] lg:h-[36px] lg:px-[12px] lg:text-[15px] lg:font-semibold lg:leading-[150%] lg:tracking-[-0.36px]"
          >
            <span>#{tag}</span>
          </span>
        ))}
      </div>
    </header>
  );
};

export default ArchiveDataHeader;
