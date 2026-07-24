import HomeContent from "../components/home/HomeContent";
import HomeHeader from "../components/home/HomeHeader";

const HomePage = () => {
  return (
    <main
      className="
        mx-auto
        flex
        w-full
        max-w-[1120px]
        flex-col
        gap-[15px]
        px-[20px]
        pb-[100px]
        pt-[30px]
        md:px-[40px]
        md:pt-[45px]
        lg:px-0
        lg:pb-[75px]
        lg:pt-[60px]
      "
    >
      <HomeHeader />
      <HomeContent />
    </main>
  );
};

export default HomePage;