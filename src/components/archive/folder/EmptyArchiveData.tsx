import EmptyState from "../../common/EmptyState";

const EmptyArchiveData = () => {
  return (
    <EmptyState
      imageSrc="/character/NotFound.png"
      imageAlt="자료 없음"
      message="자료가 존재하지 않습니다."
      containerClassName="flex flex-col items-center pt-[180px]"
      imageClassName="mb-[10px] h-[91.2px] w-[95.9px] object-contain lg:mb-8 lg:h-[200px] lg:w-[200px]"
      messageClassName="w-full whitespace-nowrap text-center text-[14px] font-normal not-italic leading-[150%] tracking-[-0.35px] text-[#717379] lg:text-[24px] lg:font-semibold lg:tracking-[-0.72px]"
    />
  );
};

export default EmptyArchiveData;
