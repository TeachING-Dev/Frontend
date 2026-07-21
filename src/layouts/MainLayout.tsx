import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";

type MainLayoutProps = {
  showRightIcons?: boolean;
  insetMenu?: boolean;
};

const MainLayout = ({
  showRightIcons = true,
  insetMenu = false,
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
      <Header
        showRightIcons={showRightIcons}
        insetMenu={insetMenu}
        onMenuClick={handleOpenSidebar}
      />

      <Sidebar
        open={isSidebarOpen}
        onClose={handleCloseSidebar}
      />

      {/* 헤더 아래부터 화면에 고정되는 그라데이션 */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 top-[64px] z-0 bg-[linear-gradient(to_bottom,#090713_0%,#090713_72%,#18152D_88%,#30265F_100%)]"
      />

      <main className="relative z-10 min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;