type AnalysisSummaryProps = {
  summary: string;
};

const AnalysisSummary = ({
  summary,
}: AnalysisSummaryProps) => {
  return (
    <section className="rounded-[10px] bg-[#13151F] p-[20px]">
      {/* 제목 */}
      <div className="mb-[10px] flex items-center gap-[10px]">
        <img
          src="/AI.png"
          alt=""
          aria-hidden="true"
          className="h-[28px] w-[28px] object-contain"
        />

        <h2 className="text-[24px] font-bold leading-[150%] tracking-[-0.24px] text-[#F5F2FF]">
          AI 요약
        </h2>
      </div>

      {/* 내용 */}
      <div className="min-h-[291px] rounded-[5px] bg-[#1F212A] px-[20px] py-[15px]">
        <p className="text-[15px] font-normal leading-[160%] tracking-[-0.15px] text-[#717379]">
          {summary}
        </p>
      </div>
    </section>
  );
};

export default AnalysisSummary;