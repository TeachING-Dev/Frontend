type AnalysisDetailProps = {
  content: string;
};

const AnalysisDetail = ({
  content,
}: AnalysisDetailProps) => {
  return (
    <section className="w-full rounded-[10px] border border-[#3A3946] bg-[#13151F] px-[20px] py-[10px]">
      {/* 제목 */}
      <h2 className="mb-[10px] text-[24px] font-bold leading-[150%] tracking-[-0.24px] text-[#F5F2FF]">
        AI 상세 분석
      </h2>

      {/* 상세 분석 내용 */}
      <div className="rounded-[5px] bg-[#1F212A] px-[20px] py-[15px]">
        <p className="whitespace-pre-wrap break-words text-[15px] font-normal leading-[160%] tracking-[-0.15px] text-[#717379]">
          {content}
        </p>
      </div>
    </section>
  );
};

export default AnalysisDetail;