import { Pencil, Sparkles } from "lucide-react";

type ArchiveDataSummaryProps = {
  summary: string;
};

const ArchiveDataSummary = ({
  summary,
}: ArchiveDataSummaryProps) => {
  const handleEdit = () => {
    console.log("AI 요약 편집");
  };

  return (
    <section className="mb-[64px]">
      {/* 제목 */}
      <div className="mb-[20px] flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <Sparkles
            size={20}
            fill="#FAFAFA"
            strokeWidth={1.5}
            className="text-[#FAFAFA]"
          />

          <h2 className="font-['42dot_Sans'] text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#FAFAFA]">
            AI 요약
          </h2>
        </div>

        <button
          type="button"
          onClick={handleEdit}
          className="flex h-[36px] items-center gap-[6px] rounded-[4px] bg-[#24232D] px-[12px] font-['42dot_Sans'] text-[16px] font-medium text-[#898A8F] transition-colors hover:bg-[#3A3847] hover:text-white"
        >
          <Pencil size={16} />

          <span>편집하기</span>
        </button>
      </div>

      {/* 요약 */}
      <div className="border-l-[3px] border-[#917DEC] pl-[20px]">
        <p className="font-['ABeeZee'] text-[20px] italic leading-[180%] tracking-[-0.4px] text-[#D0D0D2]">
          {summary}
        </p>
      </div>
    </section>
  );
};

export default ArchiveDataSummary;