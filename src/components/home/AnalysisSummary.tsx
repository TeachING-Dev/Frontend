type AnalysisSummaryProps = {
  summary: string;
  onSummaryChange: (
    summary: string,
  ) => void;
};

const AnalysisSummary = ({
  summary,
  onSummaryChange,
}: AnalysisSummaryProps) => {
  return (
    <section className="rounded-[10px] bg-[#13151F] p-[20px]">
      {/* 제목 */}
      <div className="mb-[10px] flex items-center gap-[10px]">
        <img
          src="/icon/AI.png"
          alt=""
          aria-hidden="true"
          className="h-[28px] w-[28px] object-contain"
        />

        <h2 className="text-[24px] font-bold leading-[150%] tracking-[-0.24px] text-[#F5F2FF]">
          AI 요약
        </h2>
      </div>

      {/* 내용 */}
      <textarea
        value={summary}
        onChange={(event) =>
          onSummaryChange(
            event.target.value,
          )
        }
        className="
          min-h-[291px]
          w-full
          resize-none
          rounded-[5px]
          border-none
          bg-[#1F212A]
          px-[20px]
          py-[15px]
          text-[15px]
          font-normal
          leading-[160%]
          tracking-[-0.15px]
          text-[#717379]
          outline-none
          focus:ring-1
          focus:ring-[#917DEC]
        "
      />
    </section>
  );
};

export default AnalysisSummary;