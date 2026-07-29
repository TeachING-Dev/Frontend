type AddFolderItemProps = {
  onClick?: () => void;
};

const AddFolderList = ({ onClick }: AddFolderItemProps) => {
  return (
    <button
      onClick={onClick}
      className="flex h-[88px] w-full items-center border-b border-[#2A2737] hover:bg-white/5"
    >
      <img
        src="/folder/folder-add.png"
        alt="새 폴더"
        className="h-[64px] w-[64px]"
      />

      <span className="ml-[22px] text-[24px] font-semibold text-[#B79CFF]">
        새 폴더 추가
      </span>
    </button>
  );
};

export default AddFolderList;