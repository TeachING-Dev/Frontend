type HeaderProps = {
  showRightIcons?: boolean;
  insetMenu?: boolean;
};

const Header = ({ showRightIcons = true, insetMenu = false }: HeaderProps) => {
  return (
    <header className="relative flex h-16 items-center justify-between bg-[#090713] px-8 shadow-[0_0_80px_rgba(145,125,236,0.1)]">
      <button
        type="button"
        aria-label="메뉴"
        onClick={() => window.dispatchEvent(new Event("toggle-chatbot-nav"))}
        className={`flex size-10 items-center justify-center overflow-hidden hover:opacity-80 ${
          insetMenu ? "ml-16" : ""
        }`}
      >
        <img src="/MenuDefault.svg" alt="" className="size-6" />
      </button>

      <div className="absolute left-1/2 -translate-x-1/2">
        <img src="/Logo.png" alt="TeachING Logo" className="h-9 w-auto" />
      </div>

      {showRightIcons ? (
        <div className="flex w-28 items-center justify-center gap-0">
          <button type="button" aria-label="알림" className="flex size-10 items-center justify-center overflow-hidden hover:opacity-80">
            <img src="/Alarm.svg" alt="" className="size-6 object-contain" />
          </button>

          <button type="button" aria-label="마이페이지" className="flex size-10 items-center justify-center overflow-hidden hover:opacity-80">
            <img src="/Mypage.svg" alt="" className="size-10 object-contain" />
          </button>
        </div>
      ) : (
        <div className="w-[84px]" aria-hidden="true" />
      )}
    </header>
  );
};

export default Header;


