type HeaderProps = {
  showRightIcons?: boolean;
};

const Header = ({ showRightIcons = true }: HeaderProps) => {
  return (
    <header className="relative flex h-16 items-center justify-between bg-[#090713] px-8">
      <button className="text-3xl text-gray-400 hover:text-white">
        ☰
      </button>

      <div className="absolute left-1/2 -translate-x-1/2">
        <img
          src="/Logo.png"
          alt="TeachING Logo"
          className="h-9 w-auto"
        />
      </div>

      {showRightIcons ? (
        <div className="flex items-center gap-5">
          <button className="hover:opacity-80">
            <img
              src="/Alarm.png"
              alt="알림"
              className="h-8 w-8"
            />
          </button>

          <button className="hover:opacity-80">
            <img
              src="/Profile.png"
              alt="프로필"
              className="h-8 w-8"
            />
          </button>
        </div>
      ) : (
        <div className="w-[84px]" aria-hidden="true" />
      )}
    </header>
  );
};

export default Header;
