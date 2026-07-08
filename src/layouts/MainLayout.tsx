import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#090713]">
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;