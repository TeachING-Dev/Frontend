import { Globe, Tag } from "lucide-react";

type ArchiveDataHeaderProps = {
  date: string;
  title: string;
  tags: string[];
  originalUrl: string;
};

const ArchiveDataHeader = ({
  date,
  title,
  tags,
  originalUrl,
}: ArchiveDataHeaderProps) => {
  const handleOpenOriginal = () => {
    window.open(
      originalUrl,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <header className="mb-[58px]">
      {/* 날짜 */}
      <p className="mb-[12px] font-['ABeeZee'] text-[16px] italic leading-[150%] tracking-[-0.48px] text-[#A1A1A5]">
        {date}
      </p>

      {/* 제목과 원문 버튼 */}
      <div className="mb-[18px] flex items-center justify-between gap-8">
        <div className="flex min-w-0 items-center gap-[12px]">
          <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#FAFAFA]">
            <img
              src="/youtube-app-icon.png"
              alt="YouTube"
              className="h-[25px] w-[25px] object-contain"
            />
          </div>

          <h1 className="min-w-0 font-['42dot_Sans'] text-[30px] font-semibold leading-[150%] tracking-[-0.9px] text-[#FAFAFA]">
            {title}
          </h1>
        </div>

        <button
          type="button"
          onClick={handleOpenOriginal}
          className="flex h-[40px] shrink-0 items-center justify-center gap-[7px] rounded-[4px] bg-[#24232D] px-[14px] font-['42dot_Sans'] text-[16px] font-semibold leading-[150%] text-[#FAFAFA] transition-colors hover:bg-[#3A3847]"
        >
          <Globe size={19} strokeWidth={2} />
          원문으로 이동
        </button>
      </div>

      {/* 태그 제목 */}
      <div className="mb-[11px] flex items-center gap-[8px]">
        <Tag
          size={18}
          fill="#917DEC"
          strokeWidth={0}
          className="-rotate-[5deg]"
        />

        <span className="font-['42dot_Sans'] text-[17px] font-medium leading-[150%] text-[#898A8F]">
          태그
        </span>
      </div>

      {/* 태그 목록 */}
      <div className="flex flex-wrap items-center gap-[10px]">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex h-[30px] items-center justify-center rounded-full border border-[#917DEC] px-[12px] font-['ABeeZee'] text-[12px] italic leading-none text-[#B7A4FF]"
          >
            #{tag}
          </span>
        ))}
      </div>
    </header>
  );
};

export default ArchiveDataHeader;