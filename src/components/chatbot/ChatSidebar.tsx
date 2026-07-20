type ChatSidebarProps = {
  isOpen: boolean;
  files: string[];
  onClose: () => void;
  onCreateRoomClick: () => void;
};

const ChatSidebar = ({ isOpen, files, onClose, onCreateRoomClick }: ChatSidebarProps) => {
  const navWidthClass = isOpen ? "w-[204px]" : "w-20";

  return (
    <aside
      className={`absolute left-0 top-0 z-10 h-full bg-[#090713] shadow-[0_0_50px_rgba(145,125,236,0.5)] transition-[width] duration-200 ${navWidthClass}`}
    >
      <div className="flex h-full flex-col px-5 py-5">
        <div className="flex items-start justify-between gap-3">
          <img
            src="/Star17.svg"
            alt=""
            className="h-9 w-8 shrink-0 object-contain drop-shadow-[0_0_10px_rgba(145,125,236,0.9)]"
          />
          {isOpen ? (
            <button
              type="button"
              aria-label="챗봇 목록 닫기"
              onClick={onClose}
              className="mt-[-2px] flex size-8 items-center justify-center font-['SUIT_Variable'] text-2xl font-semibold leading-none text-[#917DEC] hover:opacity-80"
            >
              »
            </button>
          ) : null}
        </div>

        {isOpen ? (
          <nav className="mt-8 flex flex-col items-start gap-3">
            <button
              type="button"
              aria-label="무료 문제 제한 안내 열기"
              onClick={onCreateRoomClick}
              className="flex h-9 w-8 items-center justify-start hover:opacity-80"
            >
              <img src="/NewFileDesign.svg" alt="" className="h-9 w-8 object-contain" />
            </button>
            {files.map((fileName, index) => (
              <button
                type="button"
                key={`${fileName}-${index}`}
                className="text-left font-['SUIT_Variable'] text-sm font-semibold leading-5 text-violet-50 hover:text-[#917DEC]"
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
