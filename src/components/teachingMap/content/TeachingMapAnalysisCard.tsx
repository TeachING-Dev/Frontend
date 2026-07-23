interface TeachingMapAnalysisCardProps {
  description: string;
}

const TeachingMapAnalysisCard = ({
  description,
}: TeachingMapAnalysisCardProps) => {
  return (
    <div className="flex min-h-[84px] w-full flex-col justify-center rounded-[5px] bg-[#13151F] p-[10px]">
      <p className="text-[15px] font-normal leading-[160%] tracking-[-0.15px] text-[#F5F2FF]">
        {description}
      </p>
    </div>
  );
};

export default TeachingMapAnalysisCard;