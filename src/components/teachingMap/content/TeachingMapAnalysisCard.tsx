import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface TeachingMapAnalysisCardProps {
  description: string;
}

const TeachingMapAnalysisCard = ({
  description,
}: TeachingMapAnalysisCardProps) => {
  return (
    <div className="flex min-h-[84px] w-full flex-col justify-center rounded-[5px] bg-[#13151F] p-[10px]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="mb-[8px] text-[15px] font-normal leading-[160%] tracking-[-0.15px] text-[#F5F2FF] last:mb-0">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-[#F5F2FF]">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="mb-[8px] list-disc space-y-[4px] pl-[20px] text-[#F5F2FF] last:mb-0">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-[8px] list-decimal space-y-[4px] pl-[20px] text-[#F5F2FF] last:mb-0">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-[15px] font-normal leading-[160%] tracking-[-0.15px]">
              {children}
            </li>
          ),
        }}
      >
        {description}
      </ReactMarkdown>
    </div>
  );
};

export default TeachingMapAnalysisCard;