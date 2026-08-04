import EmptyState from "../../common/EmptyState";

const TeachingMapEmpty = () => {
  return (
    <section className="flex min-h-[650px] w-full items-center justify-center">
      <EmptyState
        imageSrc="/EmptyStar.svg"
        message="나만의 과외 노트를 만들어보세요!"
        containerClassName="flex -translate-y-[35px] flex-col items-center"
        imageClassName="h-[195px] w-[195px] object-contain"
        messageClassName="mt-[18px] whitespace-nowrap text-center font-['SUIT'] text-[28px] font-bold leading-[42px] tracking-[-0.84px] text-[#D9CDFF]"
      />
    </section>
  );
};

export default TeachingMapEmpty;
