type AnalysisItem = {
  id: number;
  title: string;
  content: string;
};

type ArchiveDataAnalysisProps = {
  analysis: AnalysisItem[];
};

const ArchiveDataAnalysis = ({
  analysis,
}: ArchiveDataAnalysisProps) => {
  return (
    <section className="w-full overflow-hidden rounded-[12px] border border-[#3A3946] bg-[#1F212A]">
      {/* 상단 제목 영역 */}
      <div className="flex h-[60px] items-center px-[20px]">
        <h2 className="font-['SUIT_Variable'] text-[24px] font-bold leading-[150%] tracking-[-0.24px] text-[#D9CDFF]">
          AI 상세 분석
        </h2>
      </div>

      {/* 상세 분석 내용 */}
      <div className="rounded-t-[10px] bg-[#13151F] px-[30px] py-[20px]">
        <div className="flex flex-col gap-[30px]">
          {analysis.map((item) => (
            <article key={item.id}>
              <h3 className="whitespace-pre-line font-['ABeeZee'] text-[20px] font-normal leading-[160%] text-[#A1A1A5]">
                {item.id}. {item.title}
              </h3>

              <p className="whitespace-pre-line font-['ABeeZee'] text-[20px] font-normal leading-[160%] text-[#A1A1A5]">
                {item.content}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchiveDataAnalysis;