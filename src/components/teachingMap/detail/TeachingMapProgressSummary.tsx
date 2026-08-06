interface TeachingMapProgressSummaryProps {
  completedCount: number;
  totalCount: number;
}

const TeachingMapProgressSummary = ({
  completedCount,
  totalCount,
}: TeachingMapProgressSummaryProps) => {
  return (
    <p className="absolute right-0 top-[-38px] text-[14px] font-normal leading-[21px] tracking-[-0.35px] text-[#C1AEFF] lg:top-[-44px] lg:text-[20px] lg:font-semibold lg:leading-[28px] lg:tracking-[-0.6px]">
      완료 ({completedCount}/{totalCount})
    </p>
  );
};

export default TeachingMapProgressSummary;
