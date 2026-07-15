type AddFolderGridProps = {
  onClick?: () => void;
};

const AddFolderGrid = ({ onClick }: AddFolderGridProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[128px] w-[352px] cursor-pointer flex-col items-center justify-center rounded-md border border-[#5F4A9B] bg-gradient-to-b from-[#111021] to-[#30275A] transition hover:border-[#8B6DFF]"
    >
      <img
        src="/folder-add.png"
        alt=""
        aria-hidden="true"
        className="mb-2 h-[64px] w-[64px]"
      />

      <span className="text-[16px] font-medium text-white">
        새 폴더 추가
      </span>
    </button>
  );
};

export default AddFolderGrid;