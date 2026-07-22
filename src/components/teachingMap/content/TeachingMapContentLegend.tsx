const TeachingMapContentLegend = () => {
  return (
    <div className="flex items-center gap-[12px]">
      <div className="flex items-center gap-[2px]">
        <span className="h-[20px] w-[20px] rounded-full bg-[#83E2FF] shadow-[inset_2px_4px_4px_0_#4BA8C5]" />

        <span className="text-[16px] font-medium leading-[24px] tracking-[-0.48px] text-[#E8E8E8]">
          핵심
        </span>
      </div>

      <div className="flex items-center gap-[2px]">
        <span className="h-[20px] w-[20px] rounded-full bg-[#FAC3A5] shadow-[inset_2px_4px_4px_0_#EBA783]" />

        <span className="text-[16px] font-medium leading-[24px] tracking-[-0.48px] text-[#E8E8E8]">
          주의
        </span>
      </div>
    </div>
  );
};

export default TeachingMapContentLegend;