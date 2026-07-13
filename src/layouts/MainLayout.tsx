import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";

type MainLayoutProps = {
  showRightIcons?: boolean;
};

const MainLayout = ({ showRightIcons = true }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#090713]">
      <Header showRightIcons={showRightIcons} />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
