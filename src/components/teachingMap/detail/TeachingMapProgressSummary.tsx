interface TeachingMapProgressSummaryProps {
  completedCount: number;
  totalCount: number;
}

const TeachingMapProgressSummary = ({
  completedCount,
  totalCount,
}: TeachingMapProgressSummaryProps) => {
  return (
    <p className="absolute right-0 top-[-44px] text-[20px] font-semibold leading-[28px] tracking-[-0.6px] text-[#C1AEFF]">
      완료 ({completedCount}/{totalCount})
    </p>
  );
};

export default TeachingMapProgressSummary;