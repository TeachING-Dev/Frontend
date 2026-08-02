import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ArchiveDataAnalysisProps = {
  fullAnalysis: string;
};

const ArchiveDataAnalysis = ({
  fullAnalysis,
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
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="mb-[16px] mt-[24px] font-['SUIT_Variable'] text-[24px] font-bold leading-[160%] text-[#D0D0D2] first:mt-0">
                {children}
              </h1>
            ),

            h2: ({ children }) => (
              <h2 className="mb-[12px] mt-[24px] font-['SUIT_Variable'] text-[22px] font-bold leading-[160%] text-[#D0D0D2] first:mt-0">
                {children}
              </h2>
            ),

            h3: ({ children }) => (
              <h3 className="mb-[10px] mt-[20px] font-['SUIT_Variable'] text-[20px] font-semibold leading-[160%] text-[#D0D0D2] first:mt-0">
                {children}
              </h3>
            ),

            p: ({ children }) => (
              <p className="mb-[12px] text-[20px] font-medium leading-[160%] text-[#A1A1A5] last:mb-0">
                {children}
              </p>
            ),

            strong: ({ children }) => (
              <strong className="font-bold text-[#D0D0D2]">
                {children}
              </strong>
            ),

            ul: ({ children }) => (
              <ul className="mb-[16px] list-disc space-y-[8px] pl-[28px] text-[#A1A1A5]">
                {children}
              </ul>
            ),

            ol: ({ children }) => (
              <ol className="mb-[16px] list-decimal space-y-[8px] pl-[28px] text-[#A1A1A5]">
                {children}
              </ol>
            ),

            li: ({ children }) => (
              <li className="text-[20px] font-medium leading-[160%]">
                {children}
              </li>
            ),

            blockquote: ({ children }) => (
              <blockquote className="my-[16px] border-l-[3px] border-[#917DEC] pl-[16px] text-[#A1A1A5]">
                {children}
              </blockquote>
            ),

            code: ({ children }) => (
              <code className="rounded-[4px] bg-[#2B2C35] px-[6px] py-[2px] text-[18px] text-[#D9CDFF]">
                {children}
              </code>
            ),
          }}
        >
          {fullAnalysis}
        </ReactMarkdown>
      </div>
    </section>
  );
};

export default ArchiveDataAnalysis;