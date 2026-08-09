import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type AnalysisDetailProps = {
  content: string;
};

const AnalysisDetail = ({
  content,
}: AnalysisDetailProps) => {
  return (
    <section className="w-full rounded-[10px] bg-[#13151F] px-[20px] py-[10px]">
      {/* 제목 */}
      <h2 className="mb-[10px] text-[24px] font-bold leading-[150%] tracking-[-0.24px] text-[#F5F2FF]">
        AI 상세 분석
      </h2>

      {/* 상세 분석 내용 */}
      <div className="rounded-[5px] bg-[#1F212A] px-[20px] py-[15px]">
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
          {content}
        </ReactMarkdown>
      </div>
    </section>
  );
};

export default AnalysisDetail;