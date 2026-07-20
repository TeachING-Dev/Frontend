import HomeContent from "../components/home/HomeContent";
import HomeHeader from "../components/home/HomeHeader";

const HomePage = () => {
  return (
    <main className="mx-auto flex w-[1120px] flex-col gap-[15px] pt-[60px] py-[75px]">
      <HomeHeader />
      <HomeContent />
    </main>
  );
};

export default HomePage;