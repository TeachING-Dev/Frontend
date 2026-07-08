type FolderItemProps = {
  name: string;
  count: number;
  date: string;
};

const FolderListItem = ({ name, count, date }: FolderItemProps) => {
  return (
    <div className="flex h-[90px] w-full items-center border-b border-[#252131]">
      <img src="/Folder.png" alt="폴더" className="h-[54px] w-[62px]" />

      <p className="ml-6 w-[360px] text-[22px] font-semibold text-[#BCA7FF]">
        {name}
      </p>

      <p className="w-[240px] text-[16px] text-white">
        {String(count).padStart(2, "0")}개 항목
      </p>

      <p className="w-[220px] text-[16px] text-white">{date}</p>

      <button className="ml-auto text-[28px] leading-none text-white">
        ⋮
      </button>
    </div>
  );
};

export default FolderListItem;