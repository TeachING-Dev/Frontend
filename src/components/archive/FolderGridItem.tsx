type FolderGridItemProps = {
  name: string;
  count: number;
  date: string;
};

const FolderGridItem = ({
  name,
  count,
  date,
}: FolderGridItemProps) => {
  return (
    <button
      type="button"
      className="flex h-[110px] w-full items-center justify-between rounded-md border border-[#5F4A9B] bg-gradient-to-b from-[#111021] to-[#30275A] px-6 text-left transition hover:border-[#8B6DFF]"
    >
      <div>
        <h3 className="mb-2 text-[18px] font-semibold text-white">
          {name}
        </h3>

        <div className="flex items-center gap-3 text-[14px] text-[#E6E6E6]">
          <span>{String(count).padStart(2, "0")}개 항목</span>
          <span>{date}</span>
        </div>
      </div>

      <button
        type="button"
        className="text-white transition hover:text-[#B79CFF]"
      >
        ⋮
      </button>
    </button>
  );
};

export default FolderGridItem;