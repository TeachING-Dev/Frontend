import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";

type NotificationLayoutProps = {
  showRightIcons?: boolean;
  insetMenu?: boolean;
};

const NotificationLayout = ({
  showRightIcons = true,
  insetMenu = false,
}: NotificationLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-[100dvh] bg-[#0B0A18] lg:min-h-screen">
      {/* 모바일은 56px 투명 헤더, PC는 64px 고정 헤더 */}
      <div className="hidden lg:fixed lg:inset-x-0 lg:top-0 lg:z-50 lg:block lg:h-16">
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

      <main className="relative min-h-[100dvh] lg:min-h-screen lg:pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default NotificationLayout;
