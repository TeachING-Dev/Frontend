import EmptyState from "../../common/EmptyState";

const TeachingMapEmpty = () => {
  return (
    <section className="flex w-full items-start justify-center pt-[254.5px] lg:min-h-[650px] lg:items-center lg:pt-0">
      <EmptyState
        imageSrc="/EmptyStar.svg"
        message="나만의 과외 노트를 만들어보세요!"
        containerClassName="flex flex-col items-center lg:-translate-y-[35px]"
        imageClassName="h-[100px] w-[100px] object-contain lg:h-[195px] lg:w-[195px]"
        messageClassName="mt-[10px] w-full whitespace-nowrap text-center font-['SUIT'] text-[14px] font-normal leading-[150%] tracking-[-0.35px] text-[#717379] lg:mt-[18px] lg:text-[28px] lg:font-bold lg:leading-[42px] lg:tracking-[-0.84px] lg:text-[#D9CDFF]"
      />
    </section>
  );
};

export default TeachingMapEmpty;