import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";

type MainLayoutProps = {
  showRightIcons?: boolean;
  insetMenu?: boolean;
  showMenuIcon?: boolean;
  hideHeaderOnMobile?: boolean;
  hideMobileNav?: boolean;
};

const MainLayout = ({
  showRightIcons = true,
  insetMenu = false,
  showMenuIcon = true,
  hideHeaderOnMobile = false,
  hideMobileNav = false,
}: MainLayoutProps) => {
  const location = useLocation();
  const usesBranchScreenLayout =
    location.pathname.startsWith("/chatbot") ||
    location.pathname.startsWith("/subscription") ||
    location.pathname.startsWith("/subscribe");
  const usesPageOwnedMobileHeader =
    !usesBranchScreenLayout &&
    (location.pathname.startsWith("/mypage") || hideHeaderOnMobile);
  const usesMyPageMobileFrame =
    location.pathname.startsWith("/mypage/") &&
    location.pathname !== "/mypage/withdrawal-complete";

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div
      className={`min-h-[100dvh] lg:min-h-screen ${
        usesBranchScreenLayout ? "bg-[#090713]" : "bg-[#0B0A18]"
      }`}
    >
      {/* 모바일은 56px 투명 헤더, PC는 64px 고정 헤더 */}
      <div
        className={
          usesBranchScreenLayout
            ? "fixed inset-x-0 top-0 z-50 hidden lg:block"
            : `relative z-50 h-[56px] bg-transparent lg:fixed lg:inset-x-0 lg:top-0 lg:block lg:h-16 ${
                usesPageOwnedMobileHeader ? "hidden" : ""
              }`
        }
      >
        <Header
          showRightIcons={showRightIcons}
          insetMenu={insetMenu}
          showMenuIcon={showMenuIcon}
          onMenuClick={handleOpenSidebar}
        />
      </div>

      <Sidebar
        open={isSidebarOpen}
        onClose={handleCloseSidebar}
        hideMobileNav={hideMobileNav}
      />

      {/* 헤더 아래부터 화면에 고정되는 그라데이션 */}
      <div
        aria-hidden="true"
        className={
          usesBranchScreenLayout
            ? `pointer-events-none fixed inset-x-0 bottom-0 z-0 bg-[linear-gradient(to_bottom,#090713_0%,#090713_72%,#18152D_88%,#30265F_100%)] ${
                hideHeaderOnMobile ? "top-0 md:top-[64px]" : "top-[64px]"
              }`
            : "pointer-events-none fixed inset-x-0 bottom-0 top-0 z-0 bg-[linear-gradient(to_bottom,#0B0A18_0%,#0B0A18_72%,#18152D_88%,#30265F_100%)] lg:top-[64px]"
        }
      />

      <main
        className={
          usesBranchScreenLayout
            ? `relative z-10 min-h-[100dvh] lg:min-h-screen ${
                hideHeaderOnMobile ? "lg:pt-16" : "pt-16"
              }`
            : `relative z-10 ${
                usesMyPageMobileFrame
                  ? "h-[100dvh] min-h-0 overflow-x-hidden overflow-y-auto lg:h-auto lg:min-h-screen lg:overflow-visible"
                  : "min-h-[100dvh] lg:min-h-screen"
              } lg:pt-16`
        }
      >
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
