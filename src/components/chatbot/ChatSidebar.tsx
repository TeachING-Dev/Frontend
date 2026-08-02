type ChatSidebarProps = {
  isOpen: boolean;
  files: string[];
  onOpen: () => void;
  onClose: () => void;
  onCreateRoomClick: () => void;
  onFileClick?: (index: number) => void;
};

const ChatSidebar = ({
  isOpen,
  files,
  onOpen,
  onClose,
  onCreateRoomClick,
  onFileClick,
}: ChatSidebarProps) => {
  const navWidthClass = isOpen ? "w-[240px]" : "w-20";

  return (
    <aside
      className={`absolute left-0 top-0 z-10 h-full overflow-hidden bg-[#090713] shadow-[0_0_50px_rgba(145,125,236,0.5)] transition-[width] duration-200 ${navWidthClass}`}
    >
      <div className="flex h-full flex-col px-5 pb-5 pt-[25px]">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            aria-label="筌?ロ겦 ?????뺤뺍 ??용┛"
            onClick={(event) => {
              event.stopPropagation();
              onOpen();
            }}
            className="flex size-8 shrink-0 items-center justify-center hover:opacity-80"
          >
            <img
              src="/character/Star17.svg"
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
          <nav className="mt-[50px] flex w-[200px] min-w-[200px] flex-col items-start overflow-hidden">
            <button
              type="button"
              aria-label="새 채팅 만들기"
              onClick={onCreateRoomClick}
              className="flex h-9 items-center justify-start gap-[6px] hover:opacity-80"
            >
              <img src="/NewFileDesign.svg" alt="" className="h-8 w-7 object-contain" />
              <span className="whitespace-nowrap font-['SUIT'] text-[18px] font-semibold leading-[150%] tracking-[-0.72px] text-[#917DEC]">
                새 채팅
              </span>
            </button>
            <span className="mt-[16.7px] font-['SUIT'] text-[12px] font-medium leading-[150%] tracking-[-0.48px] text-[#717379]">
              최근
            </span>
            <div className="mt-[15px] flex w-full flex-col gap-[16.7px]">
              {files.map((fileName, index) => (
                <button
                  type="button"
                  key={`${fileName}-${index}`}
                  onClick={() => onFileClick?.(index)}
                  className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-left font-['SUIT'] text-[18px] font-medium leading-5 text-violet-50 hover:text-[#917DEC]"
                >
                  {fileName}
                </button>
              ))}
            </div>
          </nav>
        ) : null}
      </div>
    </aside>
  );
};

export default ChatSidebar;
