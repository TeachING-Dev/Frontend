const Header = () => {
  return (
    <header className="relative flex h-16 items-center justify-between bg-[#090713] px-8">
      {/* 왼쪽 햄버거 */}
      <button className="text-3xl text-gray-400 hover:text-white">
        ☰
      </button>

      {/* 가운데 로고 */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <img
          src="/Logo.png"
          alt="TeachING Logo"
          className="h-9 w-auto"
        />
      </div>

      {/* 오른쪽 아이콘 */}
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
    </header>
  );
};

export default Header;