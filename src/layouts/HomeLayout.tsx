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
    <div className="min-h-screen overflow-x-hidden bg-[#090713]">
      {/* PC 상단 고정 헤더 */}
      <div className="fixed inset-x-0 top-0 z-50 hidden lg:block">
        <Header
          showRightIcons={showRightIcons}
          insetMenu={insetMenu}
          onMenuClick={handleOpenSidebar}
        />
      </div>

      <Sidebar
        open={isSidebarOpen}
        onClose={handleCloseSidebar}
      />

      {/* 헤더 아래부터 고정되는 배경 그라데이션 */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          inset-x-0
          bottom-0
          top-[56px]
          z-0
          bg-[linear-gradient(to_bottom,#090713_0%,#090713_72%,#18152D_88%,#30265F_100%)]
          lg:top-[64px]
        "
      />

      <main
        className="
          relative
          z-10
          min-h-[calc(100vh-56px)]
          overflow-hidden
          lg:min-h-screen
          lg:pt-16
        "
      >
        {/* 홈 전용 배경 이미지 */}
        <img
          src="/logo/logo3.png"
          alt=""
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[40px]
            z-0
            w-[700px]
            max-w-none
            -translate-x-1/2
            opacity-70
            md:top-[60px]
            md:w-[1100px]
            lg:top-[145px]
            lg:w-[1440px]
            lg:opacity-100
          "
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