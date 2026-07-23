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
      <Header
        showRightIcons={showRightIcons}
        insetMenu={insetMenu}
        onMenuClick={handleOpenSidebar}
      />

      <Sidebar
        open={isSidebarOpen}
        onClose={handleCloseSidebar}
      />

      <main className="relative min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default NotificationLayout;