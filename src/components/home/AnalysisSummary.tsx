type AnalysisSummaryProps = {
  summary: string;
};

const AnalysisSummary = ({
  summary,
}: AnalysisSummaryProps) => {
  return (
    <section className="rounded-[10px] bg-[#13151F] px-[20px] py-[10px]">
      {/* 제목 */}
      <div className="mb-[15px] flex items-center gap-[10px]">
        <img
          src="/icon/AI.svg"
          alt=""
          aria-hidden="true"
          className="h-[28px] w-[28px] object-contain"
        />

        <h2 className="text-[24px] font-bold leading-[150%] tracking-[-0.24px] text-[#F5F2FF]">
          AI 요약
        </h2>
      </div>

      {/* 내용 */}
      <p className="mb-[15px] whitespace-pre-wrap break-words text-[18px] font-normal leading-[160%] tracking-[-0.15px] text-[#D9CDFF]">
        {summary}
      </p>
    </section>
  );
};

export default AnalysisSummary;