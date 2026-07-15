import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";

type MainLayoutProps = {
  showRightIcons?: boolean;
  insetMenu?: boolean;
};

const MainLayout = ({ showRightIcons = true, insetMenu = false }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#090713]">
      <Header showRightIcons={showRightIcons} insetMenu={insetMenu} />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
