type AddFolderGridProps = {
  onClick?: () => void;
};

const AddFolderGrid = ({ onClick }: AddFolderGridProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[110px] w-full flex-col items-center justify-center rounded-md border border-[#5F4A9B] bg-gradient-to-b from-[#111021] to-[#30275A]"
    >
      <img
        src="/folder-add.png"
        alt="새 폴더 추가"
        className="mb-2 h-[45px] w-[53px]"
      />

      <span className="text-[14px] font-medium text-white">
        새 폴더 추가
      </span>
    </button>
  );
};

export default AddFolderGrid;