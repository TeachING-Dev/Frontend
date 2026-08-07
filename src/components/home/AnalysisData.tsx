import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => (
              <p className="whitespace-pre-wrap break-words text-[15px] font-normal leading-[160%] tracking-[-0.15px] text-[#717379]">
                {children}
              </p>
            ),

            h1: ({ children }) => (
              <h1 className="whitespace-pre-wrap break-words text-[15px] font-normal leading-[160%] tracking-[-0.15px] text-[#717379]">
                {children}
              </h1>
            ),

            h2: ({ children }) => (
              <h2 className="whitespace-pre-wrap break-words text-[15px] font-normal leading-[160%] tracking-[-0.15px] text-[#717379]">
                {children}
              </h2>
            ),

            h3: ({ children }) => (
              <h3 className="whitespace-pre-wrap break-words text-[15px] font-normal leading-[160%] tracking-[-0.15px] text-[#717379]">
                {children}
              </h3>
            ),

            ul: ({ children }) => (
              <ul className="list-disc pl-[20px] text-[15px] font-normal leading-[160%] tracking-[-0.15px] text-[#717379]">
                {children}
              </ul>
            ),

            ol: ({ children }) => (
              <ol className="list-decimal pl-[20px] text-[15px] font-normal leading-[160%] tracking-[-0.15px] text-[#717379]">
                {children}
              </ol>
            ),

            li: ({ children }) => (
              <li className="text-[15px] font-normal leading-[160%] tracking-[-0.15px] text-[#717379]">
                {children}
              </li>
            ),

            strong: ({ children }) => (
              <strong className="font-semibold">
                {children}
              </strong>
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