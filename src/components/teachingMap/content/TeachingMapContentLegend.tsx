const TeachingMapContentLegend = () => {
  return (
    <div className="flex items-center gap-[12px] max-lg:px-[16px]">
      <div className="flex items-center gap-[2px]">
        <span className="h-[20px] w-[20px] rounded-full bg-[#83E2FF] shadow-[inset_2px_4px_4px_0_#4BA8C5] max-lg:h-[14px] max-lg:w-[14px]" />

        <span className="text-[16px] font-medium leading-[24px] tracking-[-0.48px] text-[#E8E8E8] max-lg:text-[12px] max-lg:leading-[16px]">
          핵심
        </span>
      </div>

      <div className="flex items-center gap-[2px]">
        <span className="h-[20px] w-[20px] rounded-full bg-[#FAC3A5] shadow-[inset_2px_4px_4px_0_#EBA783] max-lg:h-[14px] max-lg:w-[14px]" />

        <span className="text-[16px] font-medium leading-[24px] tracking-[-0.48px] text-[#E8E8E8] max-lg:text-[12px] max-lg:leading-[16px]">
          주의
        </span>
      </div>
    </div>
  );
};

export default TeachingMapContentLegend;
