import EmptyState from "../common/EmptyState";

const EmptyArchiveSearch = () => {
  return (
    <EmptyState
      imageSrc="/NotFound.png"
      imageAlt="검색 결과 없음"
      message="검색결과가 존재하지 않습니다."
      containerClassName="flex flex-col items-center pt-[180px]"
      imageClassName="mb-[10px] h-[91.2px] w-[95.9px] object-contain lg:mb-8 lg:h-[200px] lg:w-[200px]"
      messageClassName="w-full whitespace-nowrap text-center font-['SUIT'] text-[14px] font-normal leading-[150%] tracking-[-0.35px] text-[#717379] lg:font-['42dot_Sans'] lg:text-[28px] lg:font-semibold lg:tracking-[-0.84px] lg:text-[#F5F2FF]"
    />
  );
};

export default EmptyArchiveSearch;
