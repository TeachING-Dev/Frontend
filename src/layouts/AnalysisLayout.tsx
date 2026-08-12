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
    <div className="min-h-screen bg-[#0B0A18]">
      {/* 모바일은 56px 투명 헤더, PC는 64px 고정 헤더 */}
      <div className="relative z-50 h-[56px] bg-transparent lg:fixed lg:inset-x-0 lg:top-0 lg:h-16">
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
        className="pointer-events-none fixed inset-x-0 bottom-0 top-0 z-0 bg-[linear-gradient(to_bottom,#0B0A18_0%,#0B0A18_72%,#18152D_88%,#30265F_100%)] lg:top-[64px]"
      />

      {/* 화면 왼쪽 하단에 고정되는 별 */}
      <img
        src="/character/Star4.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed bottom-[60px] left-[60px] z-[1] hidden w-[240px] lg:block"
      />

      {/* 실제 페이지 내용 */}
      <main className="relative z-10 min-h-screen lg:pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default AnalysisLayout;
