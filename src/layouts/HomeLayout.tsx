import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";

type HomeLayoutProps = {
  showRightIcons?: boolean;
  insetMenu?: boolean;
};

const HomeLayout = ({
  showRightIcons = true,
  insetMenu = false,
}: HomeLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#090713]">
      <Header
        showRightIcons={showRightIcons}
        insetMenu={insetMenu}
        onMenuClick={handleOpenSidebar}
      />

      <Sidebar
        open={isSidebarOpen}
        onClose={handleCloseSidebar}
      />

      <main className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-[linear-gradient(to_bottom,#090713_0%,#090713_72%,#18152D_88%,#30265F_100%)]">
        {/* 홈 전용 배경 Ellipse */}
        <img
          src="/ellipse.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[162px] z-0 w-[1300px] max-w-none -translate-x-1/2"
        />

        {/* 홈 페이지 콘텐츠 */}
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default HomeLayout;