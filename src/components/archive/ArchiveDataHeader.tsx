import { Globe } from "lucide-react";

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
      <p className="mb-[10px] font-['ABeeZee'] text-[18px] italic font-normal leading-[150%] tracking-[-0.54px] text-[#B8B9BC]">
        {date}
      </p>

      {/* 제목과 원문 버튼 */}
      <div className="mb-[24px] flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-[12px]">
          <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#FAFAFA]">
            <img
              src="/youtube-app-icon.png"
              alt="YouTube"
              className="h-[32px] w-[32px] object-contain rounded-full"
            />
          </div>

          <h1 className="min-w-0 font-['SUIT_Variable'] text-[36px] font-bold leading-[150%] tracking-[-1.08px] text-[#FAFAFA]">
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
          src="/tag.png"
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
            className="flex h-[36px] items-center justify-center rounded-full border border-[#917DEC] px-[12px] font-['ABeeZee'] text-[12px] italic leading-none text-[#B7A4FF]"
          >
            #{tag}
          </span>
        ))}
      </div>
    </header>
  );
};

export default ArchiveDataHeader;