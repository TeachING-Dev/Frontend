type AnalysisSummaryProps = {
  summary: string;
};

const AnalysisSummary = ({
  summary,
}: AnalysisSummaryProps) => {
  return (
    <section className="rounded-[10px] bg-[#13151F] px-[20px] py-[10px]">
      {/* 제목 */}
      <div className="mb-[10px] flex items-center gap-[5px] lg:mb-[15px] lg:gap-[10px]">
        <img
          src="/icon/AI.svg"
          alt=""
          aria-hidden="true"
          className="h-[20px] w-[20px] object-contain lg:h-[28px] lg:w-[28px]"
        />

        <h2 className="text-[20px] font-medium leading-[150%] tracking-[-0.4px] text-[#F5F2FF] lg:text-[24px] lg:font-bold lg:tracking-[-0.24px]">
          AI 요약
        </h2>
      </div>

      {/* 내용 */}
      <p className="whitespace-pre-wrap break-words text-[14px] font-normal leading-[150%] tracking-[-0.35px] text-[#F5F2FF] lg:mb-[15px] lg:text-[18px] lg:leading-[160%] lg:tracking-[-0.15px] lg:text-[#D9CDFF]">
        {summary}
      </p>
    </section>
  );
};

export default AnalysisSummary;
