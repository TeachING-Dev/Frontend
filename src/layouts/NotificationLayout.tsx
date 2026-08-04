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
    <div className="min-h-screen bg-[#090713]">
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

      <main className="relative min-h-screen pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default NotificationLayout;