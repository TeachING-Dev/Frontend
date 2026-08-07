interface TeachingMapTagListProps {
  tags: string[];
}

const TeachingMapTagList = ({ tags }: TeachingMapTagListProps) => {
  return (
    <section className="px-[30px] max-lg:px-[16px]">
      <div className="flex items-center gap-[5px]">
        <img src="/mdi_tag.svg" alt="" className="h-[16px] w-[16px] md:h-[20px] md:w-[20px] shrink-0" />

        <span className="text-[14px] md:text-[20px] font-medium leading-normal tracking-[-0.4px] text-[#717379]">
          태그
        </span>
      </div>

      <div className="mt-[12px] flex flex-wrap items-center gap-[8px] lg:gap-[12px]">
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="flex h-[32px] max-w-full shrink-0 items-center justify-center rounded-[24px] border border-[#917DEC] px-[12px] text-[#917DEC] max-lg:h-[24px] max-lg:px-[8px]"
          >
            <span className="break-all text-[16px] font-normal leading-[24px] tracking-[-0.48px] max-lg:text-[12px] max-lg:leading-[16px]">
              {tag}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
};

export default TeachingMapTagList;
