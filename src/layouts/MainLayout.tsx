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

      <main className="min-h-[calc(100vh-64px)] bg-[linear-gradient(to_bottom,#090713_0%,#090713_72%,#18152D_88%,#30265F_100%)]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
