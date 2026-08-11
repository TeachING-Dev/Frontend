import { useEffect, useState } from "react";

import {
  getHome,
  type ActiveTeachingMap,
  type RecentMaterial,
} from "../apis/home";

import HomeContent from "../components/home/HomeContent";
import HomeHeader from "../components/home/HomeHeader";

const HomePage = () => {
  const [recentMaterials, setRecentMaterials] =
    useState<RecentMaterial[]>([]);

  const [activeTeachingMaps, setActiveTeachingMaps] =
    useState<ActiveTeachingMap[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const homeData = await getHome();

        setRecentMaterials(
          homeData.recentMaterials,
        );

        setActiveTeachingMaps(
          homeData.activeTeachingMaps,
        );
      } catch (error) {
        console.error(
          "홈 데이터 조회 실패:",
          error,
        );
      } finally {
        setIsLoading(false);
      }
    };

    void fetchHome();
  }, []);

  return (
    <main
      className="
        mx-auto
        flex
        w-full
        max-w-[1120px]
        flex-col
        gap-[40px]
        px-[10px]
        pb-[100px]
        pt-[40px]
        md:gap-[15px]
        md:px-[40px]
        md:pt-[45px]
        lg:gap-[30px]
        lg:px-0
        lg:pb-[75px]
        lg:pt-[60px]
      "
    >
      <HomeHeader />

      <HomeContent
        recentMaterials={recentMaterials}
        activeTeachingMaps={activeTeachingMaps}
        isLoading={isLoading}
      />
    </main>
  );
};

export default HomePage;
