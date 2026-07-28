import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { logout } from "../../apis/auth";
import { clearTokens } from "../../utils/authToken";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  onLogout?: () => void;
};

const desktopMenuItems = [
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

const mobileMenuItems = [
  {
    label: "홈",
    path: "/",
    icon: "/icon_홈2.svg",
    activeIcon: "/icon_홈2_active.svg",
  },
  {
    label: "보관함",
    path: "/archive",
    icon: "/icon_보관함2.svg",
    activeIcon: "/icon_보관함2_active.svg",
  },
  {
    label: "티칭맵",
    path: "/teaching-map",
    icon: "/icon_티칭맵2.svg",
    activeIcon: "/icon_티칭맵2_active.svg",
  },
  {
    label: "타카",
    path: "/chatbot",
    icon: "/icon_AI챗봇.svg",
    activeIcon: "/icon_AI챗봇.svg",
  },
  {
    label: "마이",
    path: "/mypage",
    icon: "/icon_마이.svg",
    activeIcon: "/icon_마이_active.svg",
  },
];

const Sidebar = ({
  open,
  onClose,
  onLogout,
}: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      onLogout?.();
    } catch (error) {
      console.error(error);
    } finally {
      clearTokens();
      onClose();
      navigate("/login", {
        replace: true,
      });
    }
  };

  return (
    <>
      {/* 모바일 하단 내비게이션 */}
      <nav
        aria-label="모바일 주요 메뉴"
        className="
          fixed
          bottom-[30px]
          left-1/2
          z-50
          flex
          w-[calc(100%-20px)]
          max-w-[430px]
          h-[60px]
          -translate-x-1/2
          items-center
          justify-around
          rounded-[32px]
          border
          border-[#917DEC]/30
          bg-[#20202A]/95
          px-[10px]
          pb-[calc(10px+env(safe-area-inset-bottom))]
          pt-[10px]
          shadow-[0_0_30px_rgba(145,125,236,0.2)]
          backdrop-blur-md
          lg:hidden
        "
      >
        {mobileMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              [
                "flex min-w-[48px] flex-col items-center justify-center gap-[3px] transition",
                isActive
                  ? "text-[#A996FF]"
                  : "text-[#F5F2FF]",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? item.activeIcon : item.icon}
                  alt={item.label}
                  aria-hidden="true"
                  className="h-[24px] w-[24px] object-contain transition"
                />

                <span
                  className={[
                  "transition",
                  isActive
                    ? "text-[12px] font-medium leading-[150%] tracking-[-0.42px] text-[#C1AEFF]"
                    : "text-[12px] font-medium leading-[135%] tracking-[-0.3px] text-[#F5F2FF]",
                  ].join(" ")}
                >
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* PC 사이드바 */}
      {open && (
        <div className="fixed inset-0 z-50 hidden lg:block">
          <button
            type="button"
            aria-label="사이드바 닫기"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/80"
          />

          <aside
            className="
              relative
              z-10
              flex
              h-screen
              w-[330px]
              flex-col
              bg-[#090713]
              px-[20px]
              py-[30px]
              shadow-[12px_0_40px_-10px_rgba(145,125,236,0.45)]
              after:absolute
              after:right-0
              after:top-0
              after:h-full
              after:w-px
              after:bg-[#917DEC]/30
            "
          >
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
                  aria-hidden="true"
                  className="h-[40px] w-[40px]"
                />
              </button>
            </div>

            <nav className="mt-[60px] flex flex-col gap-[4px]">
              {desktopMenuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
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
                    aria-hidden="true"
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
                    aria-hidden="true"
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
                    aria-hidden="true"
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
      )}
    </>
  );
};

export default Sidebar;