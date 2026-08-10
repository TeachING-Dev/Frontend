import MarkdownContent from "../../common/MarkdownContent";

interface TeachingMapAnalysisCardProps {
  description: string;
}

const TeachingMapAnalysisCard = ({
  description,
}: TeachingMapAnalysisCardProps) => {
  return (
    <div className="flex min-h-[84px] w-full flex-col justify-center rounded-[5px] bg-[#13151F] p-[10px]">
      <MarkdownContent
        content={description}
        className="text-[15px] font-normal leading-[160%] tracking-[-0.15px] text-[#F5F2FF]"
        imageClassName="mx-auto max-h-[400px] w-auto max-w-full rounded-[8px] object-contain"
      />
    </div>
  );
};

export default TeachingMapAnalysisCard;
