type AddFolderItemProps = {
  onClick?: () => void;
};

const AddFolderList = ({ onClick }: AddFolderItemProps) => {
  return (
    <button
      onClick={onClick}
      className="flex h-[72px] w-full items-center border-b border-[#2A2737]"
    >
      <img
        src="/folder-add.png"
        alt="새 폴더"
        className="h-12 w-12"
      />

      <span className="ml-5 text-[18px] font-semibold text-[#B79CFF]">
        새 폴더 추가
      </span>
    </button>
  );
};

export default AddFolderList;