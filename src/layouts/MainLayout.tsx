import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#090713]">
      <Header />

      <main className="min-h-[calc(100vh-64px)] bg-[linear-gradient(to_bottom,#090713_0%,#090713_72%,#18152D_88%,#30265F_100%)]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;