import EmptyState from "../common/EmptyState";

const TrashEmpty = () => {
  return (
    <EmptyState
      imageSrc="/sad-empty-star.svg"
      imageAlt="휴지통 빈 상태"
      message="휴지통이 비어있습니다."
      containerClassName="flex h-[360px] w-full flex-col items-center justify-center lg:h-[480px]"
      imageClassName="h-[120px] w-[126px] shrink-0 object-contain lg:h-[200px] lg:w-[200px]"
      messageClassName="mt-[10px] w-full text-center font-suit text-[14px] font-medium leading-[21px] tracking-[-0.35px] text-[#42444C] lg:mt-0 lg:text-[24px] lg:font-semibold lg:leading-[36px] lg:tracking-[-0.72px]"
    />
  );
};

export default TrashEmpty;
