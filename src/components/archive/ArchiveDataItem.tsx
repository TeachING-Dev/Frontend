import { Globe, Sparkles } from "lucide-react";

type ArchiveDataItemProps = {
  tag: string;
  date: string;
  title: string;
  description: string;
  onAiAnalysis?: () => void;
  onOpenOriginal?: () => void;
};

const ArchiveDataItem = ({
  tag,
  date,
  title,
  description,
  onAiAnalysis,
  onOpenOriginal,
}: ArchiveDataItemProps) => {
  return (
    <article className="flex h-[335px] w-full flex-col overflow-hidden rounded-[12px] border border-[#3A3946] bg-[#2B2C35]">
      {/* 상단 정보 및 버튼 */}
      <div className="flex h-[75px] shrink-0 items-center justify-between px-[29px]">
        <div className="flex items-center gap-8 font-['ABeeZee'] text-[18px] font-normal italic leading-[150%] tracking-[-0.54px] text-[#F5F2FF]">
          <span>#{tag}</span>
          <span>{date}</span>
        </div>

        <div className="flex items-center gap-[10px]">
          <button
            type="button"
            onClick={onAiAnalysis}
            className="flex h-[40px] w-[180px] items-center justify-center gap-[8px] rounded-[8px] bg-[#917DEC] text-[20px] font-semibold text-white transition-colors hover:bg-[#7D66E8]"
          >
            <Sparkles
              size={22}
              className="shrink-0"
            />

            <span>AI 분석 결과</span>
          </button>

          <button
            type="button"
            onClick={onOpenOriginal}
            className="flex h-[42px] w-[180px] items-center justify-center gap-[8px] rounded-[8px] bg-[#24242E] text-[20px] font-semibold text-white transition-colors hover:bg-[#343444]"
          >
            <Globe
              size={22}
              className="shrink-0"
            />

            <span>원문으로 이동</span>
          </button>
        </div>
      </div>

      {/* 저장된 데이터 내용 */}
      <div className="min-h-0 flex-1 rounded-t-[10px] bg-[#11121A] px-[30px] py-[40px]">
        <div className="mb-[20px] flex items-center gap-[15px]">
          <img
            src="/youtube-app-icon.png"
            alt="YouTube"
            className="h-[36px] w-[36px] shrink-0 object-contain"
          />

          <h2 className="truncate font-['SUIT_Variable'] text-[24px] font-bold leading-[150%] tracking-[-0.24px] text-[#D0D0D2]">
            {title}
          </h2>
        </div>

        <p className="line-clamp-3 whitespace-pre-line font-['ABeeZee'] text-[20px] font-normal leading-[160%] text-[#898A8F]">
          {description}
        </p>
      </div>
    </article>
  );
};

export default ArchiveDataItem;