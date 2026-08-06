import EmptyState from "../common/EmptyState";

const EmptyArchiveData = () => {
  return (
    <EmptyState
      imageSrc="/character/NotFound.png"
      imageAlt="자료 없음"
      message="검색결과가 존재하지 않습니다."
      containerClassName="flex flex-col items-center pt-[180px]"
      imageClassName="mb-8 h-[200px] w-[200px]"
      messageClassName="text-center text-[24px] font-semibold not-italic leading-[150%] tracking-[-0.72px] text-[#717379]"
    />
  );
};

export default EmptyArchiveData;
