import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";

type MainLayoutProps = {
  showRightIcons?: boolean;
  insetMenu?: boolean;
  showMenuIcon?: boolean;
  hideHeaderOnMobile?: boolean;
};

const MainLayout = ({
  showRightIcons = true,
  insetMenu = false,
  showMenuIcon = true,
  hideHeaderOnMobile = false,
}: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#090713]">
      {/* PC 상단 고정 헤더 */}
      <div className="fixed inset-x-0 top-0 z-50 hidden lg:block">
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
      />

      {/* 헤더 아래부터 화면에 고정되는 그라데이션 */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-x-0 bottom-0 z-0 bg-[linear-gradient(to_bottom,#090713_0%,#090713_72%,#18152D_88%,#30265F_100%)] ${
          hideHeaderOnMobile ? "top-0 md:top-[64px]" : "top-[64px]"
        }`}
      />

      <main className={`relative z-10 min-h-screen ${hideHeaderOnMobile ? "lg:pt-16" : "pt-16"}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
