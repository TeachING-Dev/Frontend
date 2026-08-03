interface TeachingMapTagListProps {
  tags: string[];
}

const TeachingMapTagList = ({ tags }: TeachingMapTagListProps) => {
  return (
    <section className="px-[30px]">
      <div className="flex items-center gap-[5px]">
        <img src="/mdi_tag.svg" alt="" className="h-[20px] w-[20px] shrink-0" />

        <span className="text-[20px] font-medium leading-normal tracking-[-0.4px] text-[#717379]">
          태그
        </span>
      </div>

      <div className="mt-[12px] flex items-center gap-[12px] overflow-x-auto">
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="flex h-[32px] shrink-0 items-center justify-center rounded-[24px] border border-[#917DEC] px-[12px] text-[#917DEC]"
          >
            <span className="text-[16px] font-normal leading-[24px] tracking-[-0.48px]">
              {tag}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
};

export default TeachingMapTagList;