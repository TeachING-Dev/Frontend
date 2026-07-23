import {
  NavLink,
  useNavigate,
} from "react-router-dom";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  onLogout?: () => void;
};

const Sidebar = ({
  open,
  onClose,
  onLogout,
}: SidebarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "홈",
      path: "/",
      icon: "/icon_홈.png",
    },
    {
      label: "보관함",
      path: "/archive",
      icon: "/icon_보관함.png",
    },
    {
      label: "티칭맵",
      path: "/teaching-map",
      icon: "/icon_티칭맵.png",
    },
    {
      label: "AI 챗봇",
      path: "/chatbot",
      icon: "/icon_AI챗봇.png",
    },
    {
      label: "휴지통",
      path: "/trash",
      icon: "/icon_휴지통.png",
    },
  ];

  const handleLogout = () => {
    onLogout?.();
    onClose();
    navigate("/");
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="사이드바 닫기"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/80"
      />

      <aside className="relative z-10 flex h-screen w-[330px] flex-col bg-[#090713] px-[20px] py-[30px] shadow-[12px_0_40px_-10px_rgba(145,125,236,0.45)] after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-[#917DEC]/30">
        <div className="flex items-center justify-between px-[10px]">
          <NavLink
            to="/"
            onClick={onClose}
            className="flex items-center"
          >
            <img
              src="/home-logo2.png"
              alt="TeachING"
              className="h-[44px] w-[40px]"
            />
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            aria-label="사이드바 닫기"
            className="flex h-[36px] w-[36px] items-center justify-center transition hover:opacity-80"
          >
            <img
              src="/icon_닫기.png"
              alt=""
              className="h-[40px] w-[40px]"
            />
          </button>
        </div>

        <nav className="mt-[60px] flex flex-col gap-[4px]">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({
                isActive,
              }) =>
                [
                  "flex h-[56px] items-center gap-[20px] rounded-[6px] px-[10px] transition",
                  isActive
                    ? "bg-[#2B2C35]"
                    : "hover:bg-white/5",
                ].join(" ")
              }
            >
              <img
                src={item.icon}
                alt=""
                className="h-[36px] w-[36px] object-contain"
              />

              <span className="text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#FAFAFA]">
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-[10px]">
          <NavLink
            to="/mypage"
            onClick={onClose}
            className="flex h-[60px] items-center rounded-[5px] border-2 border-[#917DEC] bg-[#0B0A18] px-[20px] transition hover:bg-[#141225]"
          >
            <div className="flex items-center gap-[10px]">
              <img
                src="/icon_마이페이지.png"
                alt=""
                className="h-[40px] w-[40px] object-contain"
              />

              <span className="text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#917DEC]">
                마이페이지
              </span>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={handleLogout}
            className="flex h-[60px] items-center rounded-[5px] bg-[#917DEC] px-[20px] transition hover:bg-[#806BDB]"
          >
            <div className="flex items-center gap-[10px]">
              <img
                src="/icon_로그아웃.png"
                alt=""
                className="h-[40px] w-[40px] object-contain"
              />

              <span className="text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-white">
                로그아웃
              </span>
            </div>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;