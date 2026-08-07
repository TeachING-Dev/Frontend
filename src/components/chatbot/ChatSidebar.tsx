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
  const navWidthClass = isOpen
    ? "w-[240px] max-md:w-[330px]"
    : "w-20 max-md:w-0";
  const mobileVisibilityClass = isOpen
    ? "max-md:block"
    : "max-md:hidden";

  return (
    <aside
      className={`absolute left-0 top-0 z-10 h-full overflow-hidden bg-[#090713] shadow-[0_0_50px_rgba(145,125,236,0.5)] transition-[width] duration-200 max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-[120] max-md:h-screen ${mobileVisibilityClass} ${navWidthClass}`}
    >
      <div className="flex h-full flex-col px-5 pb-5 pt-[25px] max-md:px-0 max-md:pt-[70px]">
        <div className={`flex items-center gap-3 max-md:px-0 ${isOpen ? "justify-between" : "justify-center"}`}>
          <button
            type="button"
            aria-label="筌?ロ겦 ?????뺤뺍 ??용┛"
            onClick={(event) => {
              event.stopPropagation();
              onOpen();
            }}
            className="flex size-8 shrink-0 items-center justify-center hover:opacity-80 max-md:absolute max-md:left-[30px] max-md:top-[70px]"
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
              className="flex size-5 items-center justify-center hover:opacity-80 max-md:absolute max-md:right-5 max-md:top-[70px] max-md:size-6"
            >
              <img src="/layout-right.svg" alt="" className="size-8 max-md:size-6" />
            </button>
          ) : null}
        </div>

        {isOpen ? (
          <nav className="mt-[50px] flex w-[200px] min-w-[200px] flex-col items-start overflow-hidden max-md:mt-[72px] max-md:w-full max-md:min-w-0 max-md:pl-[30px]">
            <button
              type="button"
              aria-label="새 채팅 만들기"
              onClick={onCreateRoomClick}
              className="flex h-9 items-center justify-start gap-[6px] hover:opacity-80 max-md:h-[30px] max-md:gap-2.5"
            >
              <img src="/NewFileDesign.svg" alt="" className="h-8 w-7 object-contain max-md:size-[30px]" />
              <span className="whitespace-nowrap font-['SUIT'] text-[18px] font-semibold leading-[150%] tracking-[-0.72px] text-[#917DEC] max-md:text-[20px] max-md:font-normal">
                새 채팅
              </span>
            </button>
            <span className="mt-[16.7px] font-['SUIT'] text-[12px] font-medium leading-[150%] tracking-[-0.48px] text-[#717379] max-md:mt-[25px] max-md:text-[16px] max-md:font-normal">
              최근
            </span>
            <div className="mt-[15px] flex w-full flex-col gap-[16.7px] max-md:mt-2.5 max-md:gap-[15px]">
              {files.map((fileName, index) => (
                <button
                  type="button"
                  key={`${fileName}-${index}`}
                  onClick={() => onFileClick?.(index)}
                  className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-left font-['SUIT'] text-[18px] font-medium leading-5 text-violet-50 hover:text-[#917DEC] max-md:text-[16px] max-md:font-normal"
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
