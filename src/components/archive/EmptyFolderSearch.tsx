import EmptyState from "../common/EmptyState";

const EmptyArchiveSearch = () => {
  return (
    <EmptyState
      imageSrc="/character/NotFound.png"
      imageAlt="검색 결과 없음"
      message="검색결과가 존재하지 않습니다."
      containerClassName="flex flex-col items-center pt-[180px]"
      imageClassName="mb-8 h-[200px] w-[200px]"
      messageClassName="font-['42dot_Sans'] text-center text-[28px] font-semibold leading-[150%] tracking-[-0.84px] text-[#F5F2FF]"
    />
  );
};

export default EmptyArchiveSearch;
