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
    <section className="w-full overflow-hidden rounded-[12px] border border-[#3A3946] bg-[#2B2C35]">
      {/* 상단 제목 영역 */}
      <div className="flex h-[75px] items-center px-[29px]">
        <h2 className="font-['42dot_Sans'] text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#FAFAFA]">
          AI 상세 분석
        </h2>
      </div>

      {/* 상세 분석 내용 */}
      <div className="rounded-t-[10px] bg-[#11121A] px-[30px] py-[40px]">
        <div className="flex flex-col gap-[32px]">
          {analysis.map((item) => (
            <article key={item.id}>
              <h3 className="mb-[12px] font-['ABeeZee'] text-[20px] font-normal italic leading-[160%] tracking-[-0.4px] text-[#D0D0D2]">
                {item.id}. {item.title}
              </h3>

              <p className="whitespace-pre-line font-['ABeeZee'] text-[20px] font-normal leading-[160%] tracking-[-0.4px] text-[#898A8F]">
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