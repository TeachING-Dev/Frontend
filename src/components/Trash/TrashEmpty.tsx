import EmptyState from "../common/EmptyState";

const TrashEmpty = () => {
  return (
    <EmptyState
      imageSrc="/sad-empty-star.svg"
      imageAlt="휴지통 빈 상태"
      message="휴지통이 비어있습니다."
      containerClassName="flex flex-col items-center"
      imageClassName="h-[200px] w-[200px] shrink-0 object-contain"
      messageClassName="mt-10 w-full text-center font-suit text-[24px] font-semibold leading-[36px] tracking-[-0.72px] text-[#42444C]"
    />
  );
};

export default TrashEmpty;
