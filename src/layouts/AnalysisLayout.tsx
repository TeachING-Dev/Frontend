import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";

type AnalysisLayoutProps = {
  showRightIcons?: boolean;
  insetMenu?: boolean;
};

const AnalysisLayout = ({
  showRightIcons = true,
  insetMenu = false,
}: AnalysisLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#090713]">
      {/* PC 상단 고정 헤더 */}
      <div className="fixed inset-x-0 top-0 z-50 hidden lg:block">
        <Header
          showRightIcons={showRightIcons}
          insetMenu={insetMenu}
          onMenuClick={() =>
            setIsSidebarOpen(true)
          }
        />
      </div>

      <Sidebar
        open={isSidebarOpen}
        onClose={() =>
          setIsSidebarOpen(false)
        }
      />

      {/* 화면에 고정되는 그라데이션 배경 */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-screen bg-[linear-gradient(to_bottom,transparent_0%,transparent_65%,#18152D_85%,#30265F_100%)]"
      />

      {/* 화면 왼쪽 하단에 고정되는 별 */}
      <img
        src="/character/Star4.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed bottom-[60px] left-[60px] z-[1] w-[240px]"
      />

      {/* 실제 페이지 내용 */}
      <main className="relative z-10 min-h-screen lg:pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default AnalysisLayout;
