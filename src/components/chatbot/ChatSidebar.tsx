type ChatSidebarProps = {
  isOpen: boolean;
  files: string[];
  onOpen: () => void;
  onClose: () => void;
  onCreateRoomClick: () => void;
};

const ChatSidebar = ({ isOpen, files, onOpen, onClose, onCreateRoomClick }: ChatSidebarProps) => {
  const navWidthClass = isOpen ? "w-[204px]" : "w-20";

  return (
    <aside
      className={`absolute left-0 top-0 z-10 h-full bg-[#090713] shadow-[0_0_50px_rgba(145,125,236,0.5)] transition-[width] duration-200 ${navWidthClass}`}
    >
      <div className="flex h-full flex-col px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            aria-label="챗봇 사이드바 열기"
            onClick={onOpen}
            className="flex size-8 shrink-0 items-center justify-center hover:opacity-80"
          >
            <img
              src="/Star17.svg"
              alt=""
              className="size-8 object-contain"
            />
          </button>
          {isOpen ? (
             <button
    type="button"
    onClick={onClose}
    className="flex size-5 items-center justify-center hover:opacity-80"
  >
              <img src="/layout-right.svg" alt="" className="size-8" />
            </button>
          ) : null}
        </div>

        {isOpen ? (
          <nav className="mt-8 flex flex-col items-start gap-3">
            <button
              type="button"
              aria-label="무료 문제 제한 안내 열기"
              onClick={onCreateRoomClick}
              className="flex h-9 items-center justify-start gap-2.5 hover:opacity-80"
            >
              <img src="/NewFileDesign.svg" alt="" className="h-9 w-8 object-contain" />
              <span className="whitespace-nowrap font-['SUIT'] text-18px font-normal leading-[150%] tracking-[-0.72px] text-[#917DEC]">
  새 폴더
</span>
            </button>
            {files.map((fileName, index) => (
              <button
                type="button"
                key={`${fileName}-${index}`}
                className="text-left font-['SUIT'] text-sm font-normal leading-5 text-violet-50 hover:text-[#917DEC]"
              >
                {fileName}
              </button>
            ))}
          </nav>
        ) : null}
      </div>
    </aside>
  );
};

export default ChatSidebar;
