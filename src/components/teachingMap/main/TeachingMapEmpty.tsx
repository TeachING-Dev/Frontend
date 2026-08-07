import EmptyState from "../../common/EmptyState";

interface TeachingMapEmptyProps {
  message?: string;
  imageAlt?: string;
  imageSrc?: string;
}

const TeachingMapEmpty = ({
  message = "나만의 과외 노트를 만들어보세요!",
  imageAlt = "티칭맵 빈 상태",
  imageSrc = "/EmptyStar.svg",
}: TeachingMapEmptyProps) => {
  return (
    <section className="flex min-h-[390px] w-full items-center justify-center lg:min-h-[650px]">
      <EmptyState
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        message={message}
        containerClassName="flex -translate-y-5 flex-col items-center lg:-translate-y-[35px]"
        imageClassName="h-[100px] w-[100px] object-contain lg:h-[195px] lg:w-[195px]"
        messageClassName="mt-[10px] w-full whitespace-nowrap text-center font-['SUIT'] text-[14px] font-normal leading-[150%] tracking-[-0.35px] text-[#42444C] lg:mt-[18px] lg:text-[28px] lg:font-bold lg:leading-[42px] lg:tracking-[-0.84px]"
      />
    </section>
  );
};

export default TeachingMapEmpty;
